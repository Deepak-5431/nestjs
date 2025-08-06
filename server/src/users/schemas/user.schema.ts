
import { ObjectType,Field,ID } from '@nestjs/graphql';
import {Prop,Schema,SchemaFactory} from '@nestjs/mongoose'
import {Document} from 'mongoose';
import * as bcrypt from 'bcrypt'

export type UserDocument = User & Document;

@ObjectType()
@Schema({
  timestamps:true,
  collection: 'nestjs'
})
export class User{
  @Field(() => ID)
  _id: string;
  
  @Field()
  @Prop({required: true, unique:true,trim:true,index:true})
  email: string;

  @Prop({required:true})
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre<UserDocument>('save',async function (next) {
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,10);
  }
  next();
})
