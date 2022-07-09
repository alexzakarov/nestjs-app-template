import { Repository, EntityRepository } from 'typeorm';
import { Admins } from './admins.entity';

@EntityRepository(Admins)
export class AdminsRepository extends Repository<Admins> {
}
