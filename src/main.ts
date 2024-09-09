import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe(
  //   {
  //     whitelist: true,//remove unwanted properties
  //     forbidNonWhitelisted: true,//throw error if unwanted properties are present
      
  //   }
  // ));
  app.enableCors({
    origin: /http:\/\/localhost:\d+$/, // Cambia esto al origen que necesites permitir
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false,
  });
  await app.listen(3000);
}
bootstrap();
