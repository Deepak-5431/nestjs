import { Controller,UseGuards, Get, Post, Body, Patch, Param, Delete,ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { UserPayloadDto } from 'src/auth/dto/user-payload.dto'

@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(
    @Body() createTodoDto: CreateTodoDto,
    @GetUser() user: UserPayloadDto,
  ) {
    return this.todosService.create(createTodoDto, user.userId);
  }

  @Get()
  findAll(@GetUser() user: UserPayloadDto) {
    return this.todosService.findAllForUser(user.userId);
  }

  
  @Get('my-special-todos') 
  findMyTodos(@GetUser() user: UserPayloadDto) { 
    console.log(`Fetching special todos for user: ${user.email}`);
    return this.todosService.findAllForUser(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(id);
  }
}