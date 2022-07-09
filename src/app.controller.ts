import { Controller, Request, Get, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './modules/auth/local/local-auth.guard';
import { JwtAuthGuard } from './modules/auth/jwt/jwt-auth.guard';
import { AuthService } from './modules/auth/auth.service';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) { }

}
