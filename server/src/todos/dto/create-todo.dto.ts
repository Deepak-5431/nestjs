import { InputType,Field } from '@nestjs/graphql';
import {MinLength, IsString, IsNotEmpty,IsOptional} from 'class-validator';


@InputType()
export class CreateTodoDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;
  @Field({nullable:true})
  @IsString()
  @IsOptional()
  description?: string
}
