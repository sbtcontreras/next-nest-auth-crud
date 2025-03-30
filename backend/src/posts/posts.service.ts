import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './posts.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto, userId: string) {
    return this.prisma.post.create({
      data: { ...createPostDto, userId },
    });
  }

  async findAll(userId: string) {
    return this.prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id, userId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto, userId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id, userId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.prisma.post.update({
      where: { id, userId },
      data: updatePostDto,
    });
  }

  async remove(id: string, userId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id, userId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return this.prisma.post.delete({
      where: { id, userId },
    });
  }
}
