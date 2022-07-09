import { APP_INTERCEPTOR } from '@nestjs/core';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/users.module';

import { AppController } from './app.controller';

import { AppService } from './app.service';
import { RouterModule } from 'nest-router';
import { routes } from './routes';
export const ALLSERVICES = "AllServices";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: "root",
      password: "123456",
      database: 'excureka',
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
      synchronize: true,
    }),
    RouterModule.forRoutes(routes),
    CacheModule.register({
      ttl: 1,
      isGlobal:true
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor
    },
  ],
})
export class AppModule { }