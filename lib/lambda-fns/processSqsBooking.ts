import { Context, SQSEvent, SQSRecord } from "aws-lambda";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient();
let tableName = process.env.ACMS_DB;

exports.handler = async (event: SQSEvent, context: Context) => {
  const failedMessageIds: string[] = [];


  console.log(`SQS events are ${JSON.stringify(event.Records)}`);

  const promises = event.Records.map(async (value: SQSRecord) => {
    try {
      const bookingDetails = JSON.parse(value.body);
      if (tableName === undefined) {
        console.log(`Couldn't get the table name`);
        tableName = "AcmsDynamoDBTable";
      }
      const params = {
        TableName: tableName,
        Item: bookingDetails,
      };
      const command = new PutItemCommand(params);
      const response = await client.send(command);

      console.log(`put parameters for booking is ${JSON.stringify(params)}`);
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
