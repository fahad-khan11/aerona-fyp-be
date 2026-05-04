import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, Status, User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
   
  ) {}
async  create(createUserDto: CreateUserDto) {
    return await this.usersRepository.save(createUserDto);
  }

async verifyUser(email: string, verificationCode: string) {
  const user = await this.findByEmail(email);
  if (!user) {
    throw new NotFoundException('User not found');
  }
  if (user.verificationCode !== verificationCode) {
    throw new UnauthorizedException('Invalid verification code');
  }
  user.isEmailVerified = true;
  user.verificationCode = null;
  await this.update(user.id, user);
  return user;
}
async matchCode(email: string, verificationCode: string) {
  const user = await this.findByEmail(email);
  if(user.verificationCode===verificationCode){
    return user
  }
  throw new UnauthorizedException('Invalid verification code');
}
async confirmUser(email: string) {
  const user = await this.findByEmail(email);
  if (!user) {
    throw new NotFoundException('User not found');
  }
 const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
 user.verificationCode = verificationCode;
  return await this.usersRepository.save(user);
}

 async findAll(role?:Role,status?:Status) {
   return await this.usersRepository.find({
    where:{
      role,
      status
    },
    select:{
      password:false
    }

   });
  }

 async updateStatus(){
  return await this.usersRepository.update({status:Status.PENDING}, {status:Status.APPROVED});
 }

  async findByEmail(email: string) {
    return await this.usersRepository.findOne({where:{email}});

  }

  async findOne(id: number) {
    return await this.usersRepository.findOne({where:{id}});
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return await this.usersRepository.delete(id);
  }
  async findTotalUsers(){
    const userCount=await this.usersRepository.count({
      where:{
        role:Role.USER,
        status:Status.APPROVED
      }
    })
    const vendorCount=await this.usersRepository.count({
      where:{
        role:Role.VENDOR,
        status:Status.APPROVED
      }
    })
    return {
      userCount,
      vendorCount
    }
  }
}
