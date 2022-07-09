import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminsRepository } from './admins.repository';

import { JwtModule } from "@nestjs/jwt";
@Module({
  imports: [
    TypeOrmModule.forFeature([AdminsRepository]),
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' }
    }),
  ], // add this
  providers: [AdminsService],
  exports:[AdminsService]
})

export class AdminsModule { }