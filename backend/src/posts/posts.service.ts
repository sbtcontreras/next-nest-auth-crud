import { Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './posts.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPostDto: CreatePostDto, userId: string) {
    return this.prisma.post.create({
      data: { ...createPostDto, userId },
    });
  }

  findAll(userId: string) {
    return this.prisma.post.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  findOne(id: string, userId: string) {
    return this.prisma.post.findUnique({
      where: { id, userId },
    });
  }

  update(id: string, updatePostDto: UpdatePostDto, userId: string) {
    return this.prisma.post.update({
      where: { id, userId },
      data: { ...updatePostDto },
    });
  }

  remove(id: string, userId: string) {
    return this.prisma.post.delete({
      where: { id, userId },
    });
  }
}
