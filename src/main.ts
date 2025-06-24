import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes( new ValidationPipe({
      whitelist: true,        // Xóa các field không nằm trong DTO
      forbidNonWhitelisted: true,  // Báo lỗi nếu có field lạ
      transform: true,        // Tự động convert kiểu (ví dụ string thành number)
  }))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
