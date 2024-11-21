import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { NestjsFingerprintModule } from 'nestjs-fingerprint';
import { FINGERPRINT_KEY } from './common/constants';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    ChatModule,
    NestjsFingerprintModule.forRoot({
      params: ['headers', 'userAgent', 'ipAddress'],
      cookieOptions: {
        name: FINGERPRINT_KEY,
        httpOnly: true,
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
