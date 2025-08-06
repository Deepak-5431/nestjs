import { Resolver,Query,Mutation,Args,ID } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UserPayloadDto } from 'src/auth/dto/user-payload.dto';


@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService){}
  @Query(()=>[Todo],{name:'todo'})
  @UseGuards(AuthGuard('jwt'))
  findAll(@GetUser() user: UserPayloadDto){
   return this.todosService.findAllForUser(user.userId);
  }

  @Query(() => Todo,{name:'todo'})
  @UseGuards(AuthGuard('jwt'))
  findOne(@Args('id',{type:()=>ID})id:string){
    return this.todosService.findOne(id);
  }

  @Mutation(()=> Todo)
  @UseGuards(AuthGuard('jwt'))
  createTodo(
    @Args('createTodoInput') createTodoInput:CreateTodoDto,
    @GetUser() user: UserPayloadDto,

  ){
    return this.todosService.create(createTodoInput,user.userId);
  }
}
