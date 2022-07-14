import { IsEmail, Length } from 'class-validator';

export class LoginUserDto {
  @IsEmail(undefined, { message: 'Неверная почта' })
  email: string;

  @Length(5, 15, {
    message: 'Длина пароля должна быть от 5 до 15 символов',
  })
  password?: string;
}
