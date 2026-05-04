import { Role, Status } from '../entities/user.entity';
import { IsOptional } from 'class-validator';

export class CreateUserDto {
  name: string;

  password: string;

  email: string;

  phone: string;
  
  @IsOptional()
  role: Role;

  permissions?: string[];

  isEmailVerified: boolean;

  verificationCode: string;

  status:Status

}
