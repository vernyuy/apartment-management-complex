"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
/**
 * When a caretaker confirms a booking from a to be tenant, a series of changes are being made
 * Booking status changes from PENDING ---> BOOKED
 * Apartment status changes from VACANT ---> OCCUPIED
 * All the other bookings status are changed from PENDING --> REJECTED(..that's harsh)
 *
 *
 * @param apartmentId => Apartment Ids
 * @params bookingIds => All booking ids
 * @params bookingId => The Id of the Booking to be confirmed
 * @param logger
 * @returns
 */
async function confirmBooking(buildingId, userId, bookingId, bookingIds, apartmentId, logger) {
    const documentClient = new aws_sdk_1.DynamoDB.DocumentClient();
    let tableName = process.env.ACMS_DB;
    if (tableName === undefined) {
        logger.error(`Couldn't get the table name`);
        tableName = "AcmsDynamoDBTable";
    }
    logger.info(`booking ids are ", ${bookingIds}`);
    logger.info(`booking id is ", ${bookingId}`);
    logger.info(`apartment id is ", ${apartmentId}`);
    try {
        const params = {
            TransactItems: [
                {
                    Put: {
                        Item: {
                            PK: `APARTMENT#${apartmentId}`,
                            SK: `BOOKING#${bookingId}`,
                            bookingStatus: "BOOKED",
                        },
                        TableName: tableName,
                        ConditionExpression: "attribute_exists(PK)",
                    },
                },
                {
                    Put: {
                        Item: {
                            PK: `BUILDING#${buildingId}`,
                            SK: `APARTMENT#${apartmentId}`,
                            apartmentStatus: "OCCUPIED",
                        },
                        TableName: tableName,
                        ConditionExpression: "attribute_exists(PK)",
                    },
                },
            ],
        };
        await documentClient.transactWrite(params).promise();
    }
    catch (error) {
        logger.error(JSON.stringify(error));
        let errorMessage = "Could not confirm user booking";
        // If it's a condition check violation, we'll try to indicate which condition failed.
        if (error.code === "TransactionCanceledException") {
            if (error.cancellationReasons[0].Code === "ConditionalCheckFailed") {
                errorMessage = "User booking doesn't exist.";
            }
            else if (error.cancellationReasons[1].Code === "ConditionalCheckFailed") {
                errorMessage = "apartment doesn't exist.";
            }
        }
        logger.error(errorMessage);
        throw Error(errorMessage);
    }
}
exports.default = confirmBooking;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybUJvb2tpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maXJtQm9va2luZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHFDQUFtQztBQUVuQzs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxLQUFLLFVBQVUsY0FBYyxDQUMzQixVQUFrQixFQUNsQixNQUFjLEVBQ2QsU0FBaUIsRUFDakIsVUFBb0IsRUFDcEIsV0FBbUIsRUFDbkIsTUFBYztJQUVkLE1BQU0sY0FBYyxHQUFHLElBQUksa0JBQVEsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUVyRCxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUVwQyxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUU7UUFDM0IsTUFBTSxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1FBQzVDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQztLQUNqQztJQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLFVBQVUsRUFBRSxDQUFDLENBQUM7SUFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxvQkFBb0IsU0FBUyxFQUFFLENBQUMsQ0FBQztJQUM3QyxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBRWpELElBQUk7UUFDRixNQUFNLE1BQU0sR0FBRztZQUNiLGFBQWEsRUFBRTtnQkFDYjtvQkFDRSxHQUFHLEVBQUU7d0JBQ0gsSUFBSSxFQUFFOzRCQUNKLEVBQUUsRUFBRSxhQUFhLFdBQVcsRUFBRTs0QkFDOUIsRUFBRSxFQUFFLFdBQVcsU0FBUyxFQUFFOzRCQUMxQixhQUFhLEVBQUUsUUFBUTt5QkFDeEI7d0JBQ0QsU0FBUyxFQUFFLFNBQVM7d0JBQ3BCLG1CQUFtQixFQUFFLHNCQUFzQjtxQkFDNUM7aUJBQ0Y7Z0JBQ0Q7b0JBQ0UsR0FBRyxFQUFFO3dCQUNILElBQUksRUFBRTs0QkFDSixFQUFFLEVBQUUsWUFBWSxVQUFVLEVBQUU7NEJBQzVCLEVBQUUsRUFBRSxhQUFhLFdBQVcsRUFBRTs0QkFDOUIsZUFBZSxFQUFFLFVBQVU7eUJBQzVCO3dCQUNELFNBQVMsRUFBRSxTQUFTO3dCQUNwQixtQkFBbUIsRUFBRSxzQkFBc0I7cUJBQzVDO2lCQUNGO2FBQ0Y7U0FDRixDQUFDO1FBQ0YsTUFBTSxjQUFjLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQ3REO0lBQUMsT0FBTyxLQUFVLEVBQUU7UUFDbkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFcEMsSUFBSSxZQUFZLEdBQUcsZ0NBQWdDLENBQUM7UUFDcEQscUZBQXFGO1FBQ3JGLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyw4QkFBOEIsRUFBRTtZQUNqRCxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssd0JBQXdCLEVBQUU7Z0JBQ2xFLFlBQVksR0FBRyw2QkFBNkIsQ0FBQzthQUM5QztpQkFBTSxJQUNMLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssd0JBQXdCLEVBQzlEO2dCQUNBLFlBQVksR0FBRywwQkFBMEIsQ0FBQzthQUMzQztTQUNGO1FBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUMzQixNQUFNLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztLQUMzQjtBQUNILENBQUM7QUFFRCxrQkFBZSxjQUFjLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMb2dnZXIgfSBmcm9tIFwiQGF3cy1sYW1iZGEtcG93ZXJ0b29scy9sb2dnZXJcIjtcbmltcG9ydCB7IER5bmFtb0RCIH0gZnJvbSBcImF3cy1zZGtcIjtcblxuLyoqXG4gKiBXaGVuIGEgY2FyZXRha2VyIGNvbmZpcm1zIGEgYm9va2luZyBmcm9tIGEgdG8gYmUgdGVuYW50LCBhIHNlcmllcyBvZiBjaGFuZ2VzIGFyZSBiZWluZyBtYWRlXG4gKiBCb29raW5nIHN0YXR1cyBjaGFuZ2VzIGZyb20gUEVORElORyAtLS0+IEJPT0tFRFxuICogQXBhcnRtZW50IHN0YXR1cyBjaGFuZ2VzIGZyb20gVkFDQU5UIC0tLT4gT0NDVVBJRURcbiAqIEFsbCB0aGUgb3RoZXIgYm9va2luZ3Mgc3RhdHVzIGFyZSBjaGFuZ2VkIGZyb20gUEVORElORyAtLT4gUkVKRUNURUQoLi50aGF0J3MgaGFyc2gpXG4gKlxuICpcbiAqIEBwYXJhbSBhcGFydG1lbnRJZCA9PiBBcGFydG1lbnQgSWRzXG4gKiBAcGFyYW1zIGJvb2tpbmdJZHMgPT4gQWxsIGJvb2tpbmcgaWRzXG4gKiBAcGFyYW1zIGJvb2tpbmdJZCA9PiBUaGUgSWQgb2YgdGhlIEJvb2tpbmcgdG8gYmUgY29uZmlybWVkXG4gKiBAcGFyYW0gbG9nZ2VyXG4gKiBAcmV0dXJuc1xuICovXG5hc3luYyBmdW5jdGlvbiBjb25maXJtQm9va2luZyhcbiAgYnVpbGRpbmdJZDogc3RyaW5nLFxuICB1c2VySWQ6IHN0cmluZyxcbiAgYm9va2luZ0lkOiBzdHJpbmcsXG4gIGJvb2tpbmdJZHM6IHN0cmluZ1tdLFxuICBhcGFydG1lbnRJZDogc3RyaW5nLFxuICBsb2dnZXI6IExvZ2dlclxuKSB7XG4gIGNvbnN0IGRvY3VtZW50Q2xpZW50ID0gbmV3IER5bmFtb0RCLkRvY3VtZW50Q2xpZW50KCk7XG5cbiAgbGV0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LkFDTVNfREI7XG5cbiAgaWYgKHRhYmxlTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbG9nZ2VyLmVycm9yKGBDb3VsZG4ndCBnZXQgdGhlIHRhYmxlIG5hbWVgKTtcbiAgICB0YWJsZU5hbWUgPSBcIkFjbXNEeW5hbW9EQlRhYmxlXCI7XG4gIH1cbiAgbG9nZ2VyLmluZm8oYGJvb2tpbmcgaWRzIGFyZSBcIiwgJHtib29raW5nSWRzfWApO1xuICBsb2dnZXIuaW5mbyhgYm9va2luZyBpZCBpcyBcIiwgJHtib29raW5nSWR9YCk7XG4gIGxvZ2dlci5pbmZvKGBhcGFydG1lbnQgaWQgaXMgXCIsICR7YXBhcnRtZW50SWR9YCk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBwYXJhbXMgPSB7XG4gICAgICBUcmFuc2FjdEl0ZW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBQdXQ6IHtcbiAgICAgICAgICAgIEl0ZW06IHtcbiAgICAgICAgICAgICAgUEs6IGBBUEFSVE1FTlQjJHthcGFydG1lbnRJZH1gLFxuICAgICAgICAgICAgICBTSzogYEJPT0tJTkcjJHtib29raW5nSWR9YCxcbiAgICAgICAgICAgICAgYm9va2luZ1N0YXR1czogXCJCT09LRURcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBUYWJsZU5hbWU6IHRhYmxlTmFtZSxcbiAgICAgICAgICAgIENvbmRpdGlvbkV4cHJlc3Npb246IFwiYXR0cmlidXRlX2V4aXN0cyhQSylcIixcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgUHV0OiB7XG4gICAgICAgICAgICBJdGVtOiB7XG4gICAgICAgICAgICAgIFBLOiBgQlVJTERJTkcjJHtidWlsZGluZ0lkfWAsXG4gICAgICAgICAgICAgIFNLOiBgQVBBUlRNRU5UIyR7YXBhcnRtZW50SWR9YCxcbiAgICAgICAgICAgICAgYXBhcnRtZW50U3RhdHVzOiBcIk9DQ1VQSUVEXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgVGFibGVOYW1lOiB0YWJsZU5hbWUsXG4gICAgICAgICAgICBDb25kaXRpb25FeHByZXNzaW9uOiBcImF0dHJpYnV0ZV9leGlzdHMoUEspXCIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgICBhd2FpdCBkb2N1bWVudENsaWVudC50cmFuc2FjdFdyaXRlKHBhcmFtcykucHJvbWlzZSgpO1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgbG9nZ2VyLmVycm9yKEpTT04uc3RyaW5naWZ5KGVycm9yKSk7XG5cbiAgICBsZXQgZXJyb3JNZXNzYWdlID0gXCJDb3VsZCBub3QgY29uZmlybSB1c2VyIGJvb2tpbmdcIjtcbiAgICAvLyBJZiBpdCdzIGEgY29uZGl0aW9uIGNoZWNrIHZpb2xhdGlvbiwgd2UnbGwgdHJ5IHRvIGluZGljYXRlIHdoaWNoIGNvbmRpdGlvbiBmYWlsZWQuXG4gICAgaWYgKGVycm9yLmNvZGUgPT09IFwiVHJhbnNhY3Rpb25DYW5jZWxlZEV4Y2VwdGlvblwiKSB7XG4gICAgICBpZiAoZXJyb3IuY2FuY2VsbGF0aW9uUmVhc29uc1swXS5Db2RlID09PSBcIkNvbmRpdGlvbmFsQ2hlY2tGYWlsZWRcIikge1xuICAgICAgICBlcnJvck1lc3NhZ2UgPSBcIlVzZXIgYm9va2luZyBkb2Vzbid0IGV4aXN0LlwiO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZXJyb3IuY2FuY2VsbGF0aW9uUmVhc29uc1sxXS5Db2RlID09PSBcIkNvbmRpdGlvbmFsQ2hlY2tGYWlsZWRcIlxuICAgICAgKSB7XG4gICAgICAgIGVycm9yTWVzc2FnZSA9IFwiYXBhcnRtZW50IGRvZXNuJ3QgZXhpc3QuXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGxvZ2dlci5lcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgIHRocm93IEVycm9yKGVycm9yTWVzc2FnZSk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29uZmlybUJvb2tpbmc7XG4iXX0=