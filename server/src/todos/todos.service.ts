import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoDocument,Todo } from './schemas/todo.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>){}

  async create(createTodoDto: CreateTodoDto, userId: string): Promise<Todo>{
    const newTodo = new this.todoModel({
      ...createTodoDto,
      user: userId,
    });
    return newTodo.save();
  }

  async findAllForUser(userId: string) : Promise<Todo[]>{
    return this.todoModel.find({user:userId}).exec();
  }


  async findOne(id: string): Promise<Todo>{
    const todo = await this.todoModel.findById(id).exec();
    if(!todo){
      throw new NotFoundException(`Todo with ID "${id}" not found`);
    }
    return todo;
  }

  async update(id: string,updateTodoDto: UpdateTodoDto): Promise<Todo>{
    const existingTodo = await this.todoModel.findByIdAndUpdate(id,updateTodoDto,{new: true}).exec();
    if(!existingTodo){
      throw new NotFoundException(`todo with ID "${id}" not found`);
    }
    return existingTodo;
  }

  async remove(id: string): Promise<Todo>{
    const deleteTodo = await this.todoModel.findByIdAndDelete(id).exec();
    if(!deleteTodo){
      throw new NotFoundException(`todo with id "${id}" not found`);
    }
    return deleteTodo;
  }


}