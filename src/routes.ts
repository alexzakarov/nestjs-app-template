import { Routes } from 'nest-router';
import { UserModule } from './modules/users/users.module';
export const routes: Routes = [
  {
    path: '/api',
    module: UserModule,
  }
];