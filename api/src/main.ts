import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ValidationPipe } from '@nestjs/common';
import { create } from 'express-handlebars';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  const helpers = {
    eq: (arg1, arg2) => arg1 == arg2,
  };
  const hbs = create({
    defaultLayout: 'main.hbs',
    helpers,
  });

  app.engine('.hbs', hbs.engine);
  app.setViewEngine('.hbs');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );
  await app.listen(3001);
}
bootstrap();
