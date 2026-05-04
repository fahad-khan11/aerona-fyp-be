import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailService } from 'src/email/email.service';
import { Role, Status } from './entities/user.entity';
export declare class UserController {
    private readonly userService;
    private readonly emailService;
    constructor(userService: UserService, emailService: EmailService);
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & import("./entities/user.entity").User>;
    verifyUser(email: string, verificationCode: string): Promise<import("./entities/user.entity").User>;
    matchCode(email: string, verificationCode: string): Promise<import("./entities/user.entity").User>;
    confirmUser(email: string): Promise<import("./entities/user.entity").User>;
    findAll(role: Role, status: Status): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    sendSms(): Promise<void>;
}
