import { Context, DynamoDBGetItemRequest } from '@aws-appsync/utils';
import { QueryGetSingleApartmentArgs, Apartment } from '../../types/appsync';

export function request(
  ctx: Context<QueryGetSingleApartmentArgs>,
): DynamoDBGetItemRequest {

  return {
    operation: 'GetItem',
    key: {
      id: ctx.args.apartmentId
    }
  };
}

export function response(
  ctx: Context<QueryGetSingleApartmentArgs, object, object, object, Apartment>,
) {
  return ctx.result;
}