import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    
    const gqlContext = GqlExecutionContext.create(context).getContext();
    if (gqlContext.req) {
      
      return gqlContext.req.user;
    }

  
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);