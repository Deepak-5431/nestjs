import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Injectable, UnauthorizedException,ConflictException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectConnection() private readonly connection: Connection,
  ){}

  async signIn(email: string,pass: string):Promise<{access_token:string}>{
    const user = await this.usersService.findOneByEmail(email);
    if(!user || !(await bcrypt.compare(pass,user.password))){
      throw new UnauthorizedException("invalid credentials");
    }
    const payload = {sub:user._id,email:user.email};
      return{
        access_token: await this.jwtService.signAsync(payload),
      };
    }
    async signUp(createUserDto:CreateUserDto): Promise<User>{
    const session = await this.connection.startSession();
    let newUser: User;
    
    session.startTransaction();
    try{
     const existingUser = await this.usersService.findOneByEmail(createUserDto.email,session);
     if(existingUser){
      throw new ConflictException('email already registered');
     }
     newUser = await this.usersService.create(createUserDto,session);

     await session.commitTransaction();
     
    }catch(error){
      await session.abortTransaction();
      throw error;
    }finally{
      session.endSession();
    }
    return newUser;
  }
  }



