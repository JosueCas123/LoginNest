import { IsEmail, IsNotEmpty, IsString, MaxLength, Min, MinLength } from "class-validator";

export class LoginAuthDto {
    @IsString()
  @IsNotEmpty()
  name?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;
}
