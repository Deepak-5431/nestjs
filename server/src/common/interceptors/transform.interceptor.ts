import { Injectable,NestInterceptor,ExecutionContext,CallHandler } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export interface Response<T>{
  data: T;
}


@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T,Response<T>>{
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>>  {

        const gqlContext = GqlExecutionContext.create(context);
    if (gqlContext.getType() === 'graphql') {
     return next.handle();
    }

    return next.handle().pipe(
    map(data => ({ data })),
    );
  }
}