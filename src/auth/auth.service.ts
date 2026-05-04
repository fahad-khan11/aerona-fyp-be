import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Role, Status } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) { }
  async login(createAuthDto: CreateAuthDto) {
    const user = await this.usersService.findByEmail(createAuthDto.email);
    

    if(user){
      if(user.status!=Status.APPROVED||user.isActive==false)
        throw new UnauthorizedException('User not approved');
    if(user && user.password != createAuthDto.password) {
      throw new UnauthorizedException('Invalid credentials');

    }
  } else {
    throw new UnauthorizedException('Invalid credentials');
  }
    // if (!user.isEmailVerified) {
    //   throw new UnauthorizedException('Email not verified');
    // }

    return await this.assignToken(user);


  }

  async assignToken(user: any) {

    const payload = { username: user.email, sub: user.id, role: user.role, store: user.store,permission:user.permissions };
    return {
      access_token: this.jwtService.sign(payload),
      role: user.role,
      id: payload.sub,
      Permissions:payload.permission
    };
  }
}
