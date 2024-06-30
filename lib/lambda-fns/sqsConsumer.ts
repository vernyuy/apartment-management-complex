import { Context, SQSEvent, SQSRecord } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient();
let tableName = process.env.TABLE_NAME;

exports.handler = async (event: SQSEvent, context: Context) => {
  const failedMessageIds: string[] = [];

  const promises = event.Records.map(async (value: SQSRecord) => {
    try {
      const bookingDetails = JSON.parse(value.body);
      if (tableName === undefined) {
        tableName = "AcmsDynamoDBDatabaseTable";
      }
      const params = {
        TableName: tableName,
        Item: bookingDetails,
      };
      console.log(params)
      const command = new PutItemCommand(params);
      await client.send(command);
    } catch (error) {
      console.log(
        `an error occured during put booking::::: ${error}`
      );
      failedMessageIds.push(value.messageId);
    }
  });
  // execute all promises
  await Promise.all(promises);

  return {
    batchItemFailures: failedMessageIds.map((id) => {
      return {
        itemIdentifier: id,
      };
    }),
  };
};
