import { Context, DynamoDBQueryRequest } from "@aws-appsync/utils";
import {
  QueryGetAllApartmentsPerBuildingArgs,
  Apartment,
} from "../../types/appsync";

export function request(
  ctx: Context<QueryGetAllApartmentsPerBuildingArgs>
): DynamoDBQueryRequest {
  // add timestamps
  const item = ctx.args!;
  const sk = `APARTMENT#`
  const pk = `BUILDING#${item.buildingId}`

  return {
    operation: "Query",
    query: {
        expression: 'PK = :pk and begins_with(SK, :sk)',
        expressionValues: {
            ":pk": util.dynamodb.toMapValues({"S": pk}),
            ":sk": util.dynamodb.toMapValues({"S":sk})
        }
    }
  };
}

export function response(
  ctx: Context<
  QueryGetAllApartmentsPerBuildingArgs,
    object,
    object,
    object,
    Apartment
  >
) {
  return ctx.result;
}
