import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ disableErrorMessages: true, errorHttpStatusCode: 422 ,  transform: true,
    transformOptions: { enableImplicitConversion: true },
 }));
 await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
