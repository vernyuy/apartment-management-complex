import { Context, DynamoDBPutItemRequest, util } from '@aws-appsync/utils';
import { createItem } from '../../lib/helpers';
import { MutationCreateUserAccountArgs, User } from '../../types/appsync';

export function request(
  ctx: Context<MutationCreateUserAccountArgs>,
): DynamoDBPutItemRequest {
  // add timestamps
  const item = createItem(ctx.args.input!);
  console.log("ITEM:", item);
  const id = util.autoId()

  console.log("ITEM>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>:", id);
  return {
    operation: 'PutItem',
    key: util.dynamodb.toMapValues({
      PK: "USER",
      SK: `USER#${id}`
    }),
    attributeValues: util.dynamodb.toMapValues({
      createdOn: util.time.nowISO8601(),
      ENTITY: "USER",
      ...item,
    }),
  };
}

export function response(
  ctx: Context<MutationCreateUserAccountArgs, object, object, object, User>,
) {
  console.log("Result: ", ctx,"RESULTS2: ", ctx.result)
  return {
    firstName: ctx.result.firstName,
    lastName: ctx.result.lastName,
    email: ctx.result.email,
    createdAt: ctx.result.createdOn,
  };
}