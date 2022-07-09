import { Repository, EntityRepository } from 'typeorm';
import { Users } from './users.entity';
import { CreateUserDTO } from './dto/create-users.dto';
import * as bcrypt from 'bcrypt';
import { createHmac } from 'crypto';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {

  public async createUser(
    ipAddress: string,
    createUserDto: CreateUserDTO,
  ): Promise<Users> {
    const {partnerId, name, surname, username, password,phone, email} = createUserDto;
    
    const hashedPassword = createHmac('sha256', 'Secret Key').update(password).digest('hex');
    const user = new Users();
    user.partnerId = partnerId;
    user.name = name;
    user.surname = surname;
    user.username = username;
    user.password = hashedPassword;
    user.phone = phone;
    user.email = email;
    user.createdCor = ipAddress;
    user.updatedCor = ipAddress;
    
    await user.save();
    return user;
  }

  public async editUser(
    ipAddress: string,
    createUserDto: CreateUserDTO,
    editedUser: Users,
  ): Promise<Users> {
    const {name, surname, username, password,phone} = createUserDto;

    const hashedPassword = createHmac('sha256', 'Secret Key').update(password).digest('hex');
    editedUser.name = name;
    editedUser.surname = surname;
    editedUser.username = username;
    editedUser.password = hashedPassword;
    editedUser.phone = phone;
    editedUser.updatedCor = ipAddress;
    editedUser.updatedAt = new Date();
    await editedUser.save();

    return editedUser;
  }
}
