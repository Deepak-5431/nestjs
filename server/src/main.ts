import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder,SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());  
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());
  const config = new DocumentBuilder().setTitle('dodo api').setDescription("description api for managing users and their todos")
  .setVersion('1.0')
  .addTag('todos','endpoints related to managing todos')
  .addTag('auth','endpoints for user authentication')
  .addBearerAuth()
  .build();
  const document  = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api-docs',app,document);
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
