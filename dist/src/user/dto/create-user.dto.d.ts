import { Role, Status } from '../entities/user.entity';
export declare class CreateUserDto {
    name: string;
    password: string;
    email: string;
    phone: string;
    role: Role;
    permissions?: string[];
    isEmailVerified: boolean;
    verificationCode: string;
    status: Status;
}
