import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { UserModule } from '../user/user.module';
import { UserService } from '..//user/user.service';
import { UserEntity } from 'src/user/entities/user.entity';

@Module({
  imports: [UserModule, PassportModule, UserEntity],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
