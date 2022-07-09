import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { RolesGuard } from './roles/roles.guard';
import { JwtAuthController } from 'src/Controllers/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/modules/users/users.entity';
import { SessionSerializer } from './session/session.serializer';
import { UserService } from 'src/modules/users/users.service';
import { AdminsModule } from 'src/modules/admins/admins.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    UserModule,
    AdminsModule,
    PassportModule.register({
      session: true,
    }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, RolesGuard, SessionSerializer],
  controllers: [JwtAuthController],
  exports: [AuthService],
})
export class AuthModule {}