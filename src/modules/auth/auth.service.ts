import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from 'src/modules/admins/admins.service';
import { Users } from '../users/users.entity';
import { getRepository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { createHmac } from 'crypto';
@Injectable()
export class AuthService {
  constructor(
    private adminsService: AdminsService,
    private usersService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const hash = createHmac('sha256', "Secret Key").update(pass).digest('hex')
    const admin = await this.adminsService.getAdminByMailService(email);
    const user = await getRepository(Users).findOne({where: {email: email, password: hash}});
    if (admin && admin.password === pass) {
      const { password, ...result } = admin;
      return result;
    }
    else if (user) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { user: {id :user.id, partnerId:user.partnerId,role:user.role, name:user.name, surname:user.surname, username: user.username}, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}