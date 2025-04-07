import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { RegisterDTO } from 'src/auth/auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: RegisterDTO) {
    const userExists = await this.prisma.user.findUnique({
      where: { username: data.username },
    });

    if (userExists) throw new ConflictException('El usuario ya existe');

    return this.prisma.user.create({
      data: data,
    });
  }

  async findByUsername(username: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
    });

    if (!user) throw new NotFoundException('Usuario no encontrado');

    return user;
  }
}
