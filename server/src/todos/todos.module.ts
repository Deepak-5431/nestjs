import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { Todo, TodoSchema } from './schemas/todo.schema';
import { TodosResolver } from './todos.resolver';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[
 MongooseModule.forFeature([{name: Todo.name,schema:TodoSchema}]),
 AuthModule,
  ],
  controllers: [TodosController],
  providers: [TodosService, TodosResolver],
})
export class TodosModule {}
