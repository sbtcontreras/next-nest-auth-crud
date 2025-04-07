import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthData, JWTPayload, LoginDTO, RegisterDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login({ username, password }: LoginDTO) {
    try {
      const user = await this.usersService.findByUsername(username);
      if (user.password !== password) throw new UnauthorizedException();

      const payload: JWTPayload = {
        id: user.id,
        username: user.username,
        fullname: user.fullname,
      };

      return this.generateAuthData(payload);
    } catch (error) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
  }

  async register(data: RegisterDTO) {
    const user = await this.usersService.create(data);

    const payload: JWTPayload = {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
    };

    return this.generateAuthData(payload);
  }

  private async generateAuthData(payload: JWTPayload) {
    const token = await this.jwtService.signAsync(payload);

    const authData: AuthData = {
      token,
      user: payload,
    };

    return authData;
  }
}
