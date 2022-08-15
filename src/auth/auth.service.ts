import { CreateUserDto } from "./../user/dto/create-user.dto";
import { ForbiddenException, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UserEntity } from "src/user/entities/user.entity";
import { Response } from "express";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByCond({ email, password });

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  generateJwtToken(data: { id: number; email: string }) {
    const payload = { email: data.email, sub: data.id };

    return this.jwtService.sign(payload);
  }

  setAccessToken(user: UserEntity, res: Response) {
    res.cookie("accessToken", this.generateJwtToken(user), {
      expires: new Date(new Date().getTime() + 30 * 24 * 60 * 60),
      sameSite: "strict",
      httpOnly: true
    });
  }

  async login(user: UserEntity, res: Response) {
    try {
      const { password, ...userData } = user;

      this.setAccessToken(userData, res);

      return res.send(user);
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }

  async register(dto: CreateUserDto, res: Response) {
    try {
      const { password, ...user } = await this.userService.create(dto);

      this.setAccessToken(user, res);

      return res.send(user);
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }
}
