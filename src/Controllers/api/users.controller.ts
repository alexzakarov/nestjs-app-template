import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Res,
  UseGuards,
  SetMetadata,
  UseInterceptors,
  CacheInterceptor,
  HttpException,
  Ip,
  Req
  
} from '@nestjs/common';


import { JwtAuthGuard } from '../../modules/auth/jwt/jwt-auth.guard';
import { UserService } from '../../modules/users/users.service';
import { CreateUserDTO } from '../../modules/users/dto/create-users.dto';
import { Users } from '../../modules/users/users.entity';
import { Roles } from 'src/modules/auth/roles/roles.decorator';
import { Role } from 'src/modules/auth/roles/roles.enum';
import { RolesGuard } from 'src/modules/auth/roles/roles.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Ability } from 'src/modules/auth/ability/ability.decorator';
import { PermissionLevel } from 'src/modules/auth/ability/ability.factory';
import { AbilityGuard } from 'src/modules/auth/ability/ability.guard';
import { UserRepository } from 'src/modules/users/users.repository';

@ApiBearerAuth()
@ApiTags("api")
@Controller('Users')
@UseGuards(JwtAuthGuard, AbilityGuard)
export class UserController {
  constructor(private UserService: UserService) { }
  @Roles(Role.SUPERADMIN)
  @Post("/create")
  @Ability([
    {name:Role.SUPERADMIN,level:PermissionLevel.ALL},
    {name:Role.PARTNERADMIN,level:PermissionLevel.ALL},
    {name:Role.USER,level:PermissionLevel.ALL}
  ],Users)
  public async createUser(
    @Ip() ipAddress: string,
    @Body() createUserDto: CreateUserDTO,
  ): Promise<Users> {
    const User = await this.UserService.create(ipAddress, createUserDto);
    return User;
  }

  @Get('all')
  @Ability([
    {name:Role.SUPERADMIN,level:PermissionLevel.ALL},
    {name:Role.PARTNERADMIN,level:PermissionLevel.ALL},
    {name:Role.USER,level:PermissionLevel.ALL}
  ])
  async getUsers(): Promise<Users[]> {
    const Users = await this.UserService.getAll();
    return Users;
  }
  
  @Get('/:UserId')
  @Ability([
    {name:Role.SUPERADMIN,level:PermissionLevel.ALL},
    {name:Role.PARTNERADMIN,level:PermissionLevel.ALL},
    {name:Role.USER,level:PermissionLevel.ALL}
  ])
  public async getUser(@Param('UserId') UserId: number) {
    const User = await this.UserService.getOne(UserId);
    return User;
  }

  @Patch('/edit/:UserId')
  @Ability([
    {name:Role.SUPERADMIN,level:PermissionLevel.ALL},
    {name:Role.PARTNERADMIN,level:PermissionLevel.ALL},
    {name:Role.USER,level:PermissionLevel.ALL}
  ])
  public async editUser(
    @Req() req,
    @Ip() ipAddress: string,
    @Body() createUserDto: CreateUserDTO,
    @Param('UserId') UserId: number,
  ): Promise<Users> {
    const User = await this.UserService.edit(
      req,
      ipAddress,
      UserId,
      createUserDto,
    );
    return User;
  }

  @Delete('/delete/:UserId')
  @Ability([
    {name:Role.SUPERADMIN,level:PermissionLevel.ALL},
    {name:Role.PARTNERADMIN,level:PermissionLevel.OWN},
    {name:Role.USER,level:PermissionLevel.OWN},
  ],Users)
  public async deleteUser(@Param('UserId') UserId: number) {
    const deletedUser = await this.UserService.delete(UserId);
    return deletedUser;
  }




}