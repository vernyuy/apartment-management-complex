import { Context, DynamoDBGetItemRequest } from '@aws-appsync/utils';
import { QueryGetUserAccountArgs, User } from '../../types/appsync';

export function request(
  ctx: Context<QueryGetUserAccountArgs>,
): DynamoDBGetItemRequest {
  // add timestamps
  const id = ctx.args.id;

  return {
    operation: 'GetItem',
    key: {
      PK: `USER#${id}`,
    }
  };
}

export function response(
  ctx: Context<QueryGetUserAccountArgs, object, object, object, User>,
) {
  return ctx.result;
}