import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Role, Status, User } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & User>;
    verifyUser(email: string, verificationCode: string): Promise<User>;
    matchCode(email: string, verificationCode: string): Promise<User>;
    confirmUser(email: string): Promise<User>;
    findAll(role?: Role, status?: Status): Promise<User[]>;
    updateStatus(): Promise<import("typeorm").UpdateResult>;
    findByEmail(email: string): Promise<User>;
    findOne(id: number): Promise<User>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    findTotalUsers(): Promise<{
        userCount: number;
        vendorCount: number;
    }>;
}
