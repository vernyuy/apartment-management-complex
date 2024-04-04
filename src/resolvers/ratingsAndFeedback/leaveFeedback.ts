import { Context, DynamoDBPutItemRequest, util } from "@aws-appsync/utils";
import { createItem } from "../../lib/helpers";
import { MutationLeaveFeedbackArgs, RatingsAndFeedback } from "../../types/appsync";

export function request(
  ctx: Context<MutationLeaveFeedbackArgs>,
): DynamoDBPutItemRequest {
  // add timestamps
  const item = createItem(ctx.args.input!);

  return {
    operation: "PutItem",
    key: {
      PK: `APARTMENT#${item.apartmentId}`,
      SK: `FEEDBACK#${util.dynamodb.toDynamoDB(util.autoId())}`,
    },

    attributeValues: util.dynamodb.toMapValues({
      createdOn: util.time.nowISO8601(),
      ENTITY: "FEEDBACK",
      ...item,
    }),
  };
}

export function response(
  ctx: Context<MutationLeaveFeedbackArgs, object, object, object, RatingsAndFeedback>,
) {
  return ctx.result;
}
