import { IsEmail, Length } from "class-validator";

export class CreateUserDto {
  @Length(3, undefined, { message: "Минимум 3 символа" })
  fullName: string;

  @IsEmail(undefined, { message: "Неверная почта" })
  email: string;

  @Length(5, 15, {
    message: "Длина пароля должна быть от 5 до 15 символов"
  })
  password?: string;
}
