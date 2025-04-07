import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDTO, UpdatePostDTO } from './posts.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  private defaultSelect: Prisma.PostSelect = {
    id: true,
    title: true,
    content: true,
    createdAt: true,
    updatedAt: true,
  };

  async create(data: CreatePostDTO, userId: string) {
    return this.prisma.post.create({
      data: { ...data, userId },
      select: this.defaultSelect,
    });
  }

  async findAll(userId: string) {
    return this.prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      select: this.defaultSelect,
    });
  }

  async findOne(id: string, userId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id, userId },
      select: this.defaultSelect,
    });

    if (!post) throw new NotFoundException('Post no encontrado');

    return post;
  }

  async update(id: string, data: UpdatePostDTO, userId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id, userId },
    });

    if (!post) throw new NotFoundException('Post no encontrado');

    return this.prisma.post.update({
      where: { id, userId },
      data: data,
      select: this.defaultSelect,
    });
  }

  async remove(id: string, userId: string) {
    const post = await this.prisma.post.findUnique({
      where: { id, userId },
    });

    if (!post) throw new NotFoundException('Post no encontrado');

    return this.prisma.post.delete({
      where: { id, userId },
      select: this.defaultSelect,
    });
  }
}
