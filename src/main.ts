import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as requestIp from 'request-ip';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { AllExceptionsFilter } from './Exceptions/filter.exception';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.use(requestIp.mw());
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Akıllı Şehir Yönetişim Modülü')
    .setDescription('Konya Bilim Merkezi')
    .setVersion('1.0')
    .addTag('api')
    .addTag('backend')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);
  app.useGlobalPipes(new ValidationPipe());
  app.use(session({
    name:"NESTJS_SESSION_ID",
    secret: 'snddlsnakdjlasmkcsknclas',
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: false,
      maxAge: 1000 * 60 * 60 * 5,
      secure:false
    }
  }))
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(3001);
}
bootstrap();