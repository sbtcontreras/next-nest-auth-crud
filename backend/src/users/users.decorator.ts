import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtUserPayload } from 'src/auth/auth.dto';

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as JwtUserPayload;
  },
);
