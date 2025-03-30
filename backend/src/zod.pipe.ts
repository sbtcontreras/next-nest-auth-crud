import { PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (!(error instanceof ZodError)) {
        throw new BadRequestException('Validation failed');
      }

      const errors = error.errors
        ? error.errors
            .map((err) => `${err.path.join('.')}: ${err.message}`)
            .join(', ')
        : error.message;

      throw new BadRequestException(errors);
    }
  }
}
