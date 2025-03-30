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
  CreatePostSchema,
  UpdatePostDto,
  UpdatePostSchema,
} from './posts.dto';
import { User } from 'src/users/users.decorator';
import { ZodValidationPipe } from 'src/zod.pipe';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(CreatePostSchema)) createPostDto: CreatePostDto,
    @User() user: { id: string },
  ) {
    return this.postsService.create(createPostDto, user.id);
  }

  @Get()
  findAll(@User() user: { id: string }) {
    return this.postsService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @User() user: { id: string }) {
    return this.postsService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdatePostSchema)) updatePostDto: UpdatePostDto,
    @User() user: { id: string },
  ) {
    return this.postsService.update(id, updatePostDto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @User() user: { id: string }) {
    return this.postsService.remove(id, user.id);
  }
}
