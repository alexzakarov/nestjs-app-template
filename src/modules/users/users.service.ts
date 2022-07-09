import { ConflictException, HttpException, Injectable, NotFoundException, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { CreateUserDTO } from './dto/create-users.dto';
import { UserRepository } from './users.repository';
import { ExceptionConstants } from 'src/Exceptions/constants.exception';

@Injectable()
export class UserService{
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) { }

  public async create(
    ipAddress: string,
    createUserDto: CreateUserDTO,
  ): Promise<Users> {
    const email = createUserDto.email;
    const user = await this.userRepository.findOne({ where: { email: email },relations: ["partner", "partner.projects", "partner.meetings", "partner.services"] });
    if(user)
    {
      throw new ConflictException(ExceptionConstants.ALREADYEXISTS);
    }
    const createdUser = await this.userRepository.createUser(ipAddress, createUserDto);
    if (!createdUser) {
      throw new ConflictException(ExceptionConstants.NOTCREATED);
    }
    return createdUser;
  }


  public async getAll(): Promise<Users[]> {
    const foundUsers =  await this.userRepository.find({relations: ["partner", "partner.projects", "partner.meetings", "partner.services"]});
    if (!foundUsers) {
      throw new NotFoundException(ExceptionConstants.NOTFOUND);
    }
    return foundUsers;
  }


  public async getOne(userId: number): Promise<Users> {
    const foundUser = await this.userRepository.findOne({ where: { id: userId}, relations: ["partner", "partner.projects", "partner.meetings", "partner.services"]  });
    if (!foundUser) {
      throw new NotFoundException(ExceptionConstants.NOTFOUND);
    }
    return foundUser;
  }

  public async getOneService(userId: number): Promise<Users> {
    const foundUser = await this.userRepository.findOne({ where: { id: userId}, relations: ["partner", "partner.projects", "partner.meetings", "partner.services"]  });
    if (!foundUser) {
      return null;
    }
    return foundUser;
  }

  public async getOneByMail(email: string): Promise<Users> {
    const foundUser = await this.userRepository.findOne({ where: { email: email }, relations: ["partner", "partner.projects", "partner.meetings", "partner.services"] });
    if (!foundUser) {
      throw new NotFoundException(ExceptionConstants.NOTFOUND);
    }
    return foundUser;
  }

  public async getOneByMailService(email: string): Promise<Users> {
    const foundUser = await this.userRepository.findOne({ where: { email: email }, relations: ["partner", "partner.projects", "partner.meetings", "partner.services"] });
    if (!foundUser) {
      return null;
    }
    return foundUser;
  }


  public async edit(
    req,
    ipAddress: string,
    userId: number,
    createUserDto: CreateUserDTO,
  ): Promise<Users> {
    const foundUser = await this.userRepository.findOne({ where: { id: userId } });
    const emailExists = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (!foundUser) {
      throw new NotFoundException(ExceptionConstants.NOTFOUND);
    }
    const editedUser = this.userRepository.editUser(ipAddress, createUserDto, foundUser);
    if (!editedUser) {
      throw new ConflictException(ExceptionConstants.NOTEDITED);
    }
    return editedUser;
  }


  public async delete(userId: number): Promise<Users> {
    const foundUser = await this.userRepository.findOne({ where: { id: userId }});
    if(!foundUser)
    {
      throw new NotFoundException(ExceptionConstants.NOTFOUND);
    }
    const deletedUser = await this.userRepository.delete(userId);
    if (!deletedUser) {
      throw new NotFoundException(ExceptionConstants.NOTDELETED);
    }
    return foundUser;
  }
}
