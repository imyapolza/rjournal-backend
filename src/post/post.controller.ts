import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards
} from "@nestjs/common";
import { PostService } from "./post.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { UpdatePostDto } from "./dto/update-post.dto";
import { SearchPostDto } from "./dto/search-post.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { User } from "src/decorators/user.decorator";

@Controller("posts")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@User() userId: number, @Body() dto: CreatePostDto) {
    return this.postService.create(dto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get("popular")
  getPopularPosts() {
    return this.postService.popular();
  }

  @UseGuards(JwtAuthGuard)
  @Get("search")
  searchPosts(@Query() dto: SearchPostDto) {
    return this.postService.search(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.postService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(":id")
  update(@Param("id") id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.postService.remove(+id);
  }
}
