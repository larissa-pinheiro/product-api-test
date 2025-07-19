import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API de Produtos')
    .setDescription('API para gerenciamento de produtos')
    .setContact(
      'Larissa Pinheiro',
      'https://github.com/larissa-pinheiro',
      'https://www.linkedin.com/in/larissa-mpinheiro/')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document);

  process.env.TZ = '-03:00';

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    stopAtFirstError: true,
  }));

  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();