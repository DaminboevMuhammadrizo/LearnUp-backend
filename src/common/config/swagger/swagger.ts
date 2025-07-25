import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Learning Managment System Platformasi')
    .setVersion('1.0')
    .setDescription('Assalomu alaykum, bu loyiha Learning Managment System Platformasi uchun Swagger API hujjatidir, Bu loyiha NestJS, TypeScript va PostgreSQL va Mickroserver va Telegram-Bot asosida yaratilgan !S')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
}
