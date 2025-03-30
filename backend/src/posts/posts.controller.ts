import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import {
  CreatePostDto,
  createPostSchema,
  UpdatePostDto,
  updatePostSchema,
} from './posts.dto';
import { User } from 'src/users/users.decorator';
import { ZodValidationPipe } from 'src/zod.pipe';
import { JWTPayload } from 'src/auth/auth.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createPostSchema)) createPostDto: CreatePostDto,
    @User() user: JWTPayload,
  ) {
    return this.postsService.create(createPostDto, user.id);
  }

  @Get()
  findAll(@User() user: JWTPayload) {
    return this.postsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: JWTPayload) {
    return this.postsService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updatePostSchema)) updatePostDto: UpdatePostDto,
    @User() user: JWTPayload,
  ) {
    return this.postsService.update(id, updatePostDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: JWTPayload) {
    return this.postsService.remove(id, user.id);
  }
}
