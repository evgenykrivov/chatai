import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AT_STRATEGY_KEY, RT_STRATEGY_KEY } from './common/constants';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: [
      process.env.CLIENT_URL_DEFAULT,
      process.env.CLIENT_URL_PUBLIC,
      'http://localhost:80',
      'http://localhost',
    ],
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.use(cookieParser());
  app.enableVersioning({
    prefix: 'api/',
    defaultVersion: 'v1',
    type: VersioningType.URI,
  });
  const config = new DocumentBuilder()
    .setTitle('Auth example')
    .setDescription('The auth API description')
    .setVersion('1.0')
    .addTag('auth')
    .addBearerAuth({ type: 'http' }, AT_STRATEGY_KEY)
    .addCookieAuth(
      RT_STRATEGY_KEY,
      { type: 'apiKey', in: 'cookie' },
      `Cookie ${RT_STRATEGY_KEY}`,
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'Swagger for auth',
    swaggerOptions: {
      withCredentials: true,
    },
  });

  await app.listen(4000);
}

bootstrap().finally();
