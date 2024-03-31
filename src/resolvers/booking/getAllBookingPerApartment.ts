import { Context, DynamoDBQueryRequest } from "@aws-appsync/utils";
import {
  QueryGetAllBookingsPerApartmentArgs,
  Booking,
} from "../../types/appsync";

export function request(
  ctx: Context<QueryGetAllBookingsPerApartmentArgs>
): DynamoDBQueryRequest {
  // add timestamps
  const item = ctx.args!;
  const pk = `APARTMENT#${item.apartmentId}`
  const sk = 'BOOKING#'

  return {
    operation: "Query",
    query: {
        expression: 'PK = :pk and begins_with(SK, :sk)',
        expressionValues: {
            ":pk": pk,
            ":sk": sk
        }
    }
  };
}

export function response(
  ctx: Context<
  QueryGetAllBookingsPerApartmentArgs,
    object,
    object,
    object,
    Booking
  >
) {
  return ctx.result;
}
