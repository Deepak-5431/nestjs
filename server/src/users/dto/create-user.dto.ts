import { IsEmail,IsNotEmpty,IsString,MinLength } from "class-validator";

export class CreateUserDto {
@IsEmail()
@IsNotEmpty()
email: string;
@IsString()
@MinLength(6,{message:"password musr be 6 char long"})
password: string;
}
