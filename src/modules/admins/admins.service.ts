import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admins } from './admins.entity';
import { AdminsRepository } from './admins.repository';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(AdminsRepository)
    private adminsRepository: AdminsRepository,
  ) { }

  public async getAdmins(): Promise<Admins[]> {
    return await this.adminsRepository.find({relations: ["partners"]});
  }

  public async getAdmin(AdminsId: number): Promise<Admins> {
    const foundAdmin = await this.adminsRepository.findOne({ where: { id: AdminsId}, relations: ["partners"]  });
    if (!foundAdmin) {
      throw new NotFoundException('Admins not found');
    }
    return foundAdmin;
  }

  public async getAdminService(AdminsId: number): Promise<Admins> {
    const foundAdmin = await this.adminsRepository.findOne({ where: { id: AdminsId}, relations: ["partners"]  });
    if (!foundAdmin) {
      return null;
    }
    return foundAdmin;
  }

  public async getAdminByMail(email: string): Promise<Admins> {
    const foundAdmin = await this.adminsRepository.findOne({ where: { email: email }, relations: ["partners"] });
    if (!foundAdmin) {
      throw new NotFoundException('Admins not found');
    }
    return foundAdmin;
  }

  public async getAdminByMailService(email: string): Promise<Admins> {
    const foundAdmin = await this.adminsRepository.findOne({ where: { email: email }, relations: ["partners"] });
    if (!foundAdmin) {
      return null;
    }
    return foundAdmin;
  }
}
