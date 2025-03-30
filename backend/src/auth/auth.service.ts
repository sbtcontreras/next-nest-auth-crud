import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { JWTPayload, LoginDto, RegisterDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.usersService.findByEmail(email);
      if (user.password !== password) throw new UnauthorizedException();

      const payload: JWTPayload = {
        id: user.id,
        email: user.email,
        name: user.name,
      };

      return this.generateAuthData(payload);
    } catch (error) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async register(data: RegisterDto) {
    const user = await this.usersService.create(data);

    const payload: JWTPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
    };

    return this.generateAuthData(payload);
  }

  private async generateAuthData(payload: JWTPayload) {
    const token = await this.jwtService.signAsync(payload);
    return {
      user: payload,
      token,
    };
  }
}
