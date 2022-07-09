import { Module } from '@nestjs/common';
import { UserController } from '../../Controllers/api/users.controller';
import { UserService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users.repository';

import { JwtModule } from "@nestjs/jwt";

import { AbilityFactory } from '../auth/ability/ability.factory';
import { AbilityGuard } from '../auth/ability/ability.guard';
@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' }
    }),
  ], // add this
  controllers: [UserController],
  providers: [
    UserService,
  ],
  exports:[UserService]
})

export class UserModule { }