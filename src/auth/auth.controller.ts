import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto} from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  create(@Body() userOjest: RegisterDto) {
    return this.authService.register(userOjest);
  }

  @Post("login")
  login(@Body() userOjestLogin: LoginAuthDto) {
    return this.authService.login(userOjestLogin);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

}
