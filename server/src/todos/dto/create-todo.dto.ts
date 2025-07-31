import {MinLength, IsString, IsNotEmpty} from 'class-validator';



export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;
  @IsString()
  description: string

}
