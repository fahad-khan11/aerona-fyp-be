import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    constructor(usersService: UserService, jwtService: JwtService);
    login(createAuthDto: CreateAuthDto): Promise<{
        access_token: string;
        role: any;
        id: any;
        Permissions: any;
    }>;
    assignToken(user: any): Promise<{
        access_token: string;
        role: any;
        id: any;
        Permissions: any;
    }>;
}
