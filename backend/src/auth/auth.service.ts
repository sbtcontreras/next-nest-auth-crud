import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    const user = await this.usersService.findByEmail(email);

    if (user?.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      user: payload,
      token,
    };
  }

  async register(data: RegisterDto) {
    const user = await this.usersService.create(data);

    const payload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      user: payload,
      token,
    };
  }
}
