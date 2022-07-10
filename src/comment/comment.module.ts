import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';

@Module({
  controllers: [CommentController],
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  providers: [CommentService],
})
export class CommentModule {}
