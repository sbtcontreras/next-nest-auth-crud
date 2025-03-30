import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { LoginDto, loginSchema, RegisterDto, registerSchema } from './auth.dto';
import { ZodValidationPipe } from 'src/zod.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body(new ZodValidationPipe(loginSchema)) body: LoginDto) {
    return this.authService.login(body);
  }

  @Public()
  @Post('register')
  register(@Body(new ZodValidationPipe(registerSchema)) body: RegisterDto) {
    return this.authService.register(body);
  }
}
