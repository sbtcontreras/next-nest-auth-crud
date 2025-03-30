import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { JwtUserPayload, LoginDto, RegisterDto } from './auth.dto';

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

    const authData = await this.generateAuthData({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    return authData;
  }

  async register(data: RegisterDto) {
    const user = await this.usersService.create(data);
    const authData = await this.generateAuthData({
      id: user.id,
      email: user.email,
      name: user.name,
    });
    return authData;
  }

  private async generateAuthData(payload: JwtUserPayload) {
    const token = await this.jwtService.signAsync(payload);

    return {
      user: payload,
      token,
    };
  }
}
