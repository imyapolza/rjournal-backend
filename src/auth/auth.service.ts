import { CreateUserDto } from './../user/dto/create-user.dto';
import { Body, ForbiddenException, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
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

  async register(dto: CreateUserDto) {
    try {
      const { password, ...user } = await this.userService.create(dto);
      return {
        ...user,
        access_token: this.generateJwtToken(user),
      };
    } catch (err) {
      throw new ForbiddenException(err);
    }
  }

  async login(user: UserEntity) {
    const { password, ...userData } = user;
    const payload = { username: user.fullName, sub: user.id };
    return {
      ...userData,
      access_token: this.generateJwtToken(userData),
    };
  }
}
