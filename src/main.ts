import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { setupSwagger } from './common/config/swagger/swagger';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { FileCleanupExceptionFilter } from './core/utils/errFilter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: {
      enableImplicitConversion: true,
    }
  }));
  
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.useStaticAssets(join(process.cwd(), 'uploads/courses'), { prefix: '/files/public', });
  await setupSwagger(app);
  app.useGlobalFilters(new FileCleanupExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}


bootstrap();
