import { Injectable,NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { title } from 'process';

@Injectable()
export class TodosService {
  private readonly todos = [
    {id:1,title:"Learn nextjs",description:"first course",isCompleted:false}
  ];
  create(createTodoDto: CreateTodoDto) {
    const newTodo ={
    id: Date.now(), // Simple way to genrate unique ID for now
    ...createTodoDto,
    isCompleted: false,
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  findAll() {
    return this.todos;
    return `This action returns all todos`;
  }

  findOne(id: number) {
    const todo = this.todos.find(todo => todo.id === id);
    if(!todo){
      throw new NotFoundException(`todo with id${id} not found`);

    }
    return todo;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = this.findOne(id);
    Object.assign(todo,updateTodoDto);
    return todo;
  }

  remove(id: number) {
    const todoIndex = this.todos.findIndex(todo => todo.id === id);
    if(todoIndex === -1){
      throw new NotFoundException(`todo with this id ${id} not found`);
    }
    this.todos.splice(todoIndex,1);
    return {message:`This action removes a #${id} todo successfully`};
    
  }
}
