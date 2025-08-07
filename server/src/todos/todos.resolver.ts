import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { TodosService } from './todos.service';
import { Todo } from './schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UserPayloadDto } from 'src/auth/dto/user-payload.dto';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard'; // 1. Import the new guard

@Resolver(() => Todo)
export class TodosResolver {
  constructor(private readonly todosService: TodosService) {}

  @Query(() => [Todo], { name: 'todos' })
  @UseGuards(GqlAuthGuard) // 2. Use the new GqlAuthGuard
  findAll(@GetUser() user: UserPayloadDto) {
    return this.todosService.findAllForUser(user.userId);
  }

  @Query(() => Todo, { name: 'todo' })
  @UseGuards(GqlAuthGuard) // 3. Use it on all protected queries/mutations
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.todosService.findOne(id);
  }


  @Query(() => String, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  me(@GetUser() user: UserPayloadDto) {
    console.log('--- "ME" QUERY: RESOLVER REACHED ---');
    console.log('User object from @GetUser:', user);
    console.log('------------------------------------');
    return `Successfully authenticated as user: ${user.email}`;
  }
  
  @Mutation(() => Todo)
  @UseGuards(GqlAuthGuard) // 4. And here as well
  createTodo(
    @Args('createTodoInput') createTodoInput: CreateTodoDto,
    @GetUser() user: UserPayloadDto,
  ) {
    return this.todosService.create(createTodoInput, user.userId);
  }
}