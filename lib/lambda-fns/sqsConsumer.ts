import { Context, SQSEvent, SQSRecord } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient();
let tableName = process.env.TABLE_NAME;
  // const tableName = "acms_table"

exports.handler = async (event: SQSEvent, context: Context) => {
  const failedMessageIds: string[] = [];


  console.log(`SQS events are ${JSON.stringify(event)}`);

  const promises = event.Records.map(async (value: SQSRecord) => {
    try {
      const bookingDetails = JSON.parse(value.body);
      console.log(`booking details are ${JSON.stringify(bookingDetails)}`);
      if (tableName === undefined) {
        console.log(`Couldn't get the table name`);
        tableName = "AcmsDynamoDBDatabaseTable";
      }
      const params = {
        TableName: tableName,
        Item: bookingDetails,
      };
      console.log(`put parameters for booking is ${JSON.stringify(params)}`);
      const command = new PutItemCommand(params);
      const response = await client.send(command);

    } catch (error) {
      console.log(
        `an error occured during put booking ${JSON.stringify(error)}`
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
