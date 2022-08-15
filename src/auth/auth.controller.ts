import { CreateUserDto } from "./../user/dto/create-user.dto";
import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  Res
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { Response } from "express";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req, @Res() res: Response) {
    return this.authService.login(req.user, res);
  }

  @Post("register")
  register(@Body() dto: CreateUserDto, @Res() res: Response) {
    return this.authService.register(dto, res);
  }
}
