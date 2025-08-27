import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);

  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: false, errorHttpStatusCode: 422 ,  transform: true }));
}
bootstrap();
