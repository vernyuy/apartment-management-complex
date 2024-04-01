"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_sdk_1 = require("aws-sdk");
const utils_1 = require("../../utils");
const buildingEntity_1 = require("./entities/buildingEntity");
async function createBuilding(appsyncInput, logger) {
    const documentClient = new aws_sdk_1.DynamoDB.DocumentClient();
    let tableName = process.env.ACMS_DB;
    const createdOn = Date.now().toString();
    const id = (0, utils_1.uuid)();
    if (tableName === undefined) {
        logger.error(`Couldn't get the table name`);
        tableName = "AcmsDynamoDBTable";
    }
    const input = new buildingEntity_1.BuildingEntity({
        id: id,
        ...appsyncInput.input,
        createdOn,
    });
    logger.info(`create building input info", ${JSON.stringify(input)}`);
    const params = {
        TableName: tableName,
        Item: input.toItem(),
    };
    try {
        await documentClient.put(params).promise();
        return input.graphQlReturn();
    }
    catch (error) {
        logger.error(`an error occured while creating a building ${error}`);
        throw Error(`an error occured ${error}`);
    }
}
exports.default = createBuilding;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlQnVpbGRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjcmVhdGVCdWlsZGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLHFDQUFtQztBQUNuQyx1Q0FBbUM7QUFDbkMsOERBQTJEO0FBRTNELEtBQUssVUFBVSxjQUFjLENBQzNCLFlBQWlDLEVBQ2pDLE1BQWM7SUFFZCxNQUFNLGNBQWMsR0FBRyxJQUFJLGtCQUFRLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDckQsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7SUFDcEMsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ3hDLE1BQU0sRUFBRSxHQUFXLElBQUEsWUFBSSxHQUFFLENBQUM7SUFDMUIsSUFBSSxTQUFTLEtBQUssU0FBUyxFQUFFO1FBQzNCLE1BQU0sQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUM1QyxTQUFTLEdBQUcsbUJBQW1CLENBQUM7S0FDakM7SUFFRCxNQUFNLEtBQUssR0FBbUIsSUFBSSwrQkFBYyxDQUFDO1FBQy9DLEVBQUUsRUFBRSxFQUFFO1FBQ04sR0FBRyxZQUFZLENBQUMsS0FBSztRQUNyQixTQUFTO0tBQ1YsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckUsTUFBTSxNQUFNLEdBQUc7UUFDYixTQUFTLEVBQUUsU0FBUztRQUNwQixJQUFJLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFBRTtLQUNyQixDQUFDO0lBRUYsSUFBSTtRQUNGLE1BQU0sY0FBYyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUMzQyxPQUFPLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztLQUM5QjtJQUFDLE9BQU8sS0FBVSxFQUFFO1FBQ25CLE1BQU0sQ0FBQyxLQUFLLENBQUMsOENBQThDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDcEUsTUFBTSxLQUFLLENBQUMsb0JBQW9CLEtBQUssRUFBRSxDQUFDLENBQUM7S0FDMUM7QUFDSCxDQUFDO0FBRUQsa0JBQWUsY0FBYyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTG9nZ2VyIH0gZnJvbSBcIkBhd3MtbGFtYmRhLXBvd2VydG9vbHMvbG9nZ2VyXCI7XG5pbXBvcnQgeyBEeW5hbW9EQiB9IGZyb20gXCJhd3Mtc2RrXCI7XG5pbXBvcnQgeyB1dWlkIH0gZnJvbSBcIi4uLy4uL3V0aWxzXCI7XG5pbXBvcnQgeyBCdWlsZGluZ0VudGl0eSB9IGZyb20gXCIuL2VudGl0aWVzL2J1aWxkaW5nRW50aXR5XCI7XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUJ1aWxkaW5nKFxuICBhcHBzeW5jSW5wdXQ6IENyZWF0ZUJ1aWxkaW5nSW5wdXQsXG4gIGxvZ2dlcjogTG9nZ2VyXG4pIHtcbiAgY29uc3QgZG9jdW1lbnRDbGllbnQgPSBuZXcgRHluYW1vREIuRG9jdW1lbnRDbGllbnQoKTtcbiAgbGV0IHRhYmxlTmFtZSA9IHByb2Nlc3MuZW52LkFDTVNfREI7XG4gIGNvbnN0IGNyZWF0ZWRPbiA9IERhdGUubm93KCkudG9TdHJpbmcoKTtcbiAgY29uc3QgaWQ6IHN0cmluZyA9IHV1aWQoKTtcbiAgaWYgKHRhYmxlTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbG9nZ2VyLmVycm9yKGBDb3VsZG4ndCBnZXQgdGhlIHRhYmxlIG5hbWVgKTtcbiAgICB0YWJsZU5hbWUgPSBcIkFjbXNEeW5hbW9EQlRhYmxlXCI7XG4gIH1cblxuICBjb25zdCBpbnB1dDogQnVpbGRpbmdFbnRpdHkgPSBuZXcgQnVpbGRpbmdFbnRpdHkoe1xuICAgIGlkOiBpZCxcbiAgICAuLi5hcHBzeW5jSW5wdXQuaW5wdXQsXG4gICAgY3JlYXRlZE9uLFxuICB9KTtcblxuICBsb2dnZXIuaW5mbyhgY3JlYXRlIGJ1aWxkaW5nIGlucHV0IGluZm9cIiwgJHtKU09OLnN0cmluZ2lmeShpbnB1dCl9YCk7XG4gIGNvbnN0IHBhcmFtcyA9IHtcbiAgICBUYWJsZU5hbWU6IHRhYmxlTmFtZSxcbiAgICBJdGVtOiBpbnB1dC50b0l0ZW0oKSxcbiAgfTtcblxuICB0cnkge1xuICAgIGF3YWl0IGRvY3VtZW50Q2xpZW50LnB1dChwYXJhbXMpLnByb21pc2UoKTtcbiAgICByZXR1cm4gaW5wdXQuZ3JhcGhRbFJldHVybigpO1xuICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgbG9nZ2VyLmVycm9yKGBhbiBlcnJvciBvY2N1cmVkIHdoaWxlIGNyZWF0aW5nIGEgYnVpbGRpbmcgJHtlcnJvcn1gKTtcbiAgICB0aHJvdyBFcnJvcihgYW4gZXJyb3Igb2NjdXJlZCAke2Vycm9yfWApO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUJ1aWxkaW5nO1xuIl19