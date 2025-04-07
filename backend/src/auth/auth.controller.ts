import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { LoginDTO, loginSchema, RegisterDTO, registerSchema } from './auth.dto';
import { ZodValidationPipe } from 'src/zod.pipe';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body(new ZodValidationPipe(loginSchema)) body: LoginDTO) {
    return this.authService.login(body);
  }

  @Public()
  @Post('register')
  register(@Body(new ZodValidationPipe(registerSchema)) body: RegisterDTO) {
    return this.authService.register(body);
  }
}
