import { ObjectType,Field,ID } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { HydratedDocument } from 'mongoose';

export type TodoDocument = HydratedDocument<Todo>;

@ObjectType()
@Schema({timestamps:true})
export class Todo {
  @Field(()=> ID) 
  _id: string;

  @Field() 
  @Prop()
  title: string;

  @Field({nullable: true})
  @Prop()
  description?: string;

  @Field()
  @Prop({default: false})
  isCompleted: boolean;

  @Field(()=> User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User',required:true})
  user:User;
}

export const TodoSchema = SchemaFactory.createForClass(Todo);