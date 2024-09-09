import { BadRequestException, Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register-auth.dto';
import { hash, compare } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Auth, "postgresConnection") 
    private userEntity: Repository<Auth>,
    private jwtService: JwtService
  ) {}

  async register(userObject: RegisterDto) {
    const { password, email } = userObject;
    try {
      // Verificar si el correo ya existe
      const emailExists = await this.userEntity.findOne({ where: { email } });
      if (emailExists) {
        throw new BadRequestException('El correo ya existe');
      }

      // Verificar si el campo 'password' no está vacío
      if (!password || password.length < 8) {
        throw new BadRequestException('La contraseña debe tener al menos 8 caracteres');
      }

      // Hashear la contraseña
      const hashedPassword = await hash(password, 10);

      // Crear el nuevo usuario con la contraseña hasheada
      const userWithHashedPassword = { ...userObject, password: hashedPassword };

      // Crear y guardar el nuevo usuario
      const newUser = this.userEntity.create(userWithHashedPassword);
      const savedUser = await this.userEntity.save(newUser);

      // Crear el token JWT después de guardar el usuario
      const payload = { id: savedUser.id, name: savedUser.name };
      const token = this.jwtService.sign(payload);

      // Retornar el usuario y el token
      const data = {
        user: savedUser,
        token
      };

      return data;
    } catch (error) {
      if (error.code === '23505') { // Código de error de Postgres para duplicados
        throw new Error('Registro duplicado');
      }
      throw error;
    }
  }

  async login(userObjectLogin: LoginAuthDto) {
    const { password, email } = userObjectLogin;
    try {
      const findUser = await this.userEntity.findOne({ where: { email } });
      if (!findUser) {
        throw new BadRequestException('El usuario no existe');
      }

      const checkPassword = await compare(password, findUser.password);
      if (!checkPassword) {
        throw new BadRequestException('Contraseña incorrecta');
      }

      const payload = { id: findUser.id, name: findUser.name };
      const token = this.jwtService.sign(payload);

      const data = {
        user: findUser,
        token
      };

      return data;
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    return await this.userEntity.find();
  }
}
