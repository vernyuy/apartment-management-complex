import { Context, DynamoDBBatchGetItemRequest } from "@aws-appsync/utils";

import { QueryGetAllBookingsPerApartmentArgs, User } from "../../types/appsync";

export function request(ctx: Context<any>): DynamoDBBatchGetItemRequest {
  const keys: { PK: string; SK: string }[] = [];
  ctx.prev.result.items.map((item: any) => {
    keys.push({
      PK: `USER#${item.userId}`,
      SK: `USER#${item.userId}`,
    });
  });

  return {
    operation: "BatchGetItem",
    tables: {
      AcmsDynamoDBTable: {
        keys: keys,
        consistentRead: true,
      },
    },
  };
}

export function response(
  ctx: Context<
    QueryGetAllBookingsPerApartmentArgs,
    object,
    object,
    object,
    User
  >,
) {
  // const items = [];
  // for(const item in ctx.result.get("AcmsDynamoDBTable"))
  //     #set($items= [])
  // #foreach($item in $ctx.result.data.get("AcmsDynamoDBTable"))
  //     #set($user=$ctx.prev.result.items.get($foreach.index))
  //     $util.qr($user.put("user",$item))
  //     $util.qr($items.add($user))
  // #end
  // $util.toJson($items)
  return ctx.result;
}
