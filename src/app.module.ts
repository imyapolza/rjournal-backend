import { CommentEntity } from './comment/entities/comment.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserEntity } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { PostEntity } from './post/entities/post.entity';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { LocalAuthGuard } from './auth/guards/local-auth.guard';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'tjournal',
      entities: [PostEntity, CommentEntity, UserEntity],
      synchronize: true,
    }),
    UserModule,
    PostModule,
    CommentModule,
    AuthModule,
    LocalAuthGuard,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
