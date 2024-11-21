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
    origin: ['http://localhost:5173'], // Разрешаем ваш фронтенд
    credentials: true, // Разрешаем отправку cookies/авторизационных данных
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // const reflector = new Reflector();
  // app.useGlobalGuards(new AtGuard(reflector)); // or do it in providers
  app.use(cookieParser());
  // app.setGlobalPrefix('v1');
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

  await app.listen(process.env.PORT || 5000);
}

bootstrap().finally();
