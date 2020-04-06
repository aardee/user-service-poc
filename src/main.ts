import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(3001)

  console.log(`User Service is running on: ${await app.getUrl()}`);
}
bootstrap();
