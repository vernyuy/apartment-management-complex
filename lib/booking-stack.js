"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingStacks = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const path = require("path");
const aws_lambda_nodejs_1 = require("aws-cdk-lib/aws-lambda-nodejs");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const sqs = require("aws-cdk-lib/aws-sqs");
class BookingStacks extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const { acmsDatabase, acmsGraphqlApi } = props;
        /**
         * Create SQS Queue and Dead letter Queue
         */
        const dlq = new sqs.Queue(this, "DeadLetterQueue");
        const queue = new sqs.Queue(this, "bookingQueue", {
            deadLetterQueue: {
                queue: dlq,
                maxReceiveCount: 10,
            },
        });
        // const lambdaRole = new Role(this, "bookingLambdaRole", {
        //       assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
        //       managedPolicies: [
        //         ManagedPolicy.fromAwsManagedPolicyName(
        //           "service-role/AWSAppSyncPushToCloudWatchLogs"
        //         ),
        //       ],
        //     });
        const bookingLambda = new aws_lambda_nodejs_1.NodejsFunction(this, "AcmsBookingHandler", {
            tracing: aws_lambda_1.Tracing.ACTIVE,
            runtime: lambda.Runtime.NODEJS_16_X,
            handler: "handler",
            entry: path.join(__dirname, "lambda-fns/booking", "app.ts"),
            memorySize: 1024,
            environment: {
                BOOKING_QUEUE_URL: queue.queueUrl,
                // ACMS_DB: acmsDatabase.tableName,
            }
        });
        /**
      * Process SQS Messages Lambda
      */
        const processSQSLambda = new aws_lambda_nodejs_1.NodejsFunction(this, "ProcessSqSBookingHandler", {
            tracing: aws_lambda_1.Tracing.ACTIVE,
            runtime: lambda.Runtime.NODEJS_16_X,
            handler: "handler",
            entry: path.join(__dirname, "lambda-fns/booking", "processSqsBooking.ts"),
            memorySize: 1024,
        });
        // Create a data source for the Lambda function
        const lambdaDataSource = acmsGraphqlApi.addLambdaDataSource('lambda-data-source', bookingLambda);
        // lambdaDataSource.createResolver('query-resolver', {
        //     typeName: 'Query',
        //     fieldName: 'listNotes',
        //   });
        lambdaDataSource.createResolver('mutation-resolver', {
            typeName: 'Mutation',
            fieldName: 'createApartmentBooking',
        });
        // lambdaResolver.node.addDependency(acmsDatabase);
        // lambdaResolver.node.addDependency(acmsGraphqlApi);
        // lambdaResolver.node.addDependency(apiSchema);
        // processSQSLambda.node.addDependency(acmsDatabase)
        acmsDatabase.grantWriteData(processSQSLambda);
        acmsDatabase.grantReadData(bookingLambda);
        queue.grantSendMessages(bookingLambda);
        queue.grantConsumeMessages(processSQSLambda);
        // bookingLambda.addEnvironment("ACMS_DB", acmsDatabase.tableName);
        bookingLambda.addEnvironment("BOOKING_QUEUE_URL", queue.queueUrl);
    }
}
exports.BookingStacks = BookingStacks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va2luZy1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJvb2tpbmctc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQTJEO0FBVTNELGlEQUFpRDtBQUNqRCw2QkFBNkI7QUFDN0IscUVBQStEO0FBQy9ELHVEQUFpRDtBQVFqRCwyQ0FBNEM7QUFTNUMsTUFBYSxhQUFjLFNBQVEsbUJBQUs7SUFDdEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUF3QjtRQUNoRSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxHQUNwQyxLQUFLLENBQUM7UUFDUjs7V0FFRztRQUVILE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUNuRCxNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUNoRCxlQUFlLEVBQUU7Z0JBQ2YsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsZUFBZSxFQUFFLEVBQUU7YUFDcEI7U0FDRixDQUFDLENBQUM7UUFFUCwyREFBMkQ7UUFDM0QsaUVBQWlFO1FBQ2pFLDJCQUEyQjtRQUMzQixrREFBa0Q7UUFDbEQsMERBQTBEO1FBQzFELGFBQWE7UUFDYixXQUFXO1FBQ1gsVUFBVTtRQUVOLE1BQU0sYUFBYSxHQUFtQixJQUFJLGtDQUFjLENBQ3BELElBQUksRUFDSixvQkFBb0IsRUFDcEI7WUFDRSxPQUFPLEVBQUUsb0JBQU8sQ0FBQyxNQUFNO1lBQ3ZCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsT0FBTyxFQUFFLFNBQVM7WUFDbEIsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLG9CQUFvQixFQUFFLFFBQVEsQ0FBQztZQUMzRCxVQUFVLEVBQUUsSUFBSTtZQUNoQixXQUFXLEVBQUM7Z0JBQ1YsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLFFBQVE7Z0JBQ2pDLG1DQUFtQzthQUNwQztTQUNGLENBQ0YsQ0FBQztRQUVEOztRQUVBO1FBQ0gsTUFBTSxnQkFBZ0IsR0FBbUIsSUFBSSxrQ0FBYyxDQUN2RCxJQUFJLEVBQ0osMEJBQTBCLEVBQzFCO1lBQ0UsT0FBTyxFQUFFLG9CQUFPLENBQUMsTUFBTTtZQUN2QixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUNkLFNBQVMsRUFDVCxvQkFBb0IsRUFDcEIsc0JBQXNCLENBQ3ZCO1lBQ0QsVUFBVSxFQUFFLElBQUk7U0FDakIsQ0FDRixDQUFDO1FBRUYsK0NBQStDO1FBQ2pELE1BQU0sZ0JBQWdCLEdBQUcsY0FBYyxDQUFDLG1CQUFtQixDQUFDLG9CQUFvQixFQUFFLGFBQWEsQ0FBQyxDQUFDO1FBRWpHLHNEQUFzRDtRQUN0RCx5QkFBeUI7UUFDekIsOEJBQThCO1FBQzlCLFFBQVE7UUFFTixnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsbUJBQW1CLEVBQUU7WUFDbkQsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFLHdCQUF3QjtTQUNwQyxDQUFDLENBQUM7UUFFSCxtREFBbUQ7UUFDbkQscURBQXFEO1FBQ3JELGdEQUFnRDtRQUNoRCxvREFBb0Q7UUFDdEQsWUFBWSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlDLFlBQVksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDMUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzdDLG1FQUFtRTtRQUNuRSxhQUFhLENBQUMsY0FBYyxDQUFDLG1CQUFtQixFQUFFLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwRSxDQUFDO0NBQ0Y7QUF0RkQsc0NBc0ZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2ZuT3V0cHV0LCBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0IHtcbiAgQ2ZuRGF0YVNvdXJjZSxcbiAgQ2ZuRnVuY3Rpb25Db25maWd1cmF0aW9uLFxuICBDZm5HcmFwaFFMQXBpLFxuICBDZm5HcmFwaFFMU2NoZW1hLFxuICBDZm5SZXNvbHZlcixcbn0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcHBzeW5jXCI7XG5pbXBvcnQgKiBhcyBzaWduZXIgZnJvbSBcImF3cy1jZGstbGliL2F3cy1zaWduZXJcIjtcbmltcG9ydCB7IE1hbmFnZWRQb2xpY3ksIFJvbGUsIFNlcnZpY2VQcmluY2lwYWwgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWlhbVwiO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBOb2RlanNGdW5jdGlvbiB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhLW5vZGVqc1wiO1xuaW1wb3J0IHsgVHJhY2luZyB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhXCI7XG5pbXBvcnQgeyBhd3NfaWFtIH0gZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgKiBhcyBkZGIgZnJvbSBcImF3cy1jZGstbGliL2F3cy1keW5hbW9kYlwiO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcbmltcG9ydCAqIGFzIGFwcHN5bmMgZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcHBzeW5jXCI7XG5pbXBvcnQgeyBUYWJsZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGJcIjtcbmltcG9ydCB7IGJ1bmRsZUFwcFN5bmNSZXNvbHZlciB9IGZyb20gXCIuL2hlbHBlcnNcIjtcbmltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuaW1wb3J0ICogYXMgc3FzIGZyb20gIFwiYXdzLWNkay1saWIvYXdzLXNxc1wiO1xuXG5pbnRlcmZhY2UgQm9va2luZ1N0YWNrUHJvcHMgZXh0ZW5kcyBTdGFja1Byb3BzIHtcbiAgYWNtc0dyYXBocWxBcGk6IGFwcHN5bmMuR3JhcGhxbEFwaTtcbiAgLy8gYXBpU2NoZW1hOiBhcHBzeW5jLkNmbkdyYXBoUUxTY2hlbWE7XG4gIGFjbXNEYXRhYmFzZTogVGFibGU7XG4gIC8vIGFjbXNUYWJsZURhdGFzb3VyY2U6IENmbkRhdGFTb3VyY2U7XG59XG5cbmV4cG9ydCBjbGFzcyBCb29raW5nU3RhY2tzIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogQm9va2luZ1N0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IHsgYWNtc0RhdGFiYXNlLCBhY21zR3JhcGhxbEFwaSB9ID1cbiAgICAgIHByb3BzO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBTUVMgUXVldWUgYW5kIERlYWQgbGV0dGVyIFF1ZXVlXG4gICAgICovXG5cbiAgICBjb25zdCBkbHEgPSBuZXcgc3FzLlF1ZXVlKHRoaXMsIFwiRGVhZExldHRlclF1ZXVlXCIpO1xuICAgIGNvbnN0IHF1ZXVlID0gbmV3IHNxcy5RdWV1ZSh0aGlzLCBcImJvb2tpbmdRdWV1ZVwiLCB7XG4gICAgICBkZWFkTGV0dGVyUXVldWU6IHtcbiAgICAgICAgcXVldWU6IGRscSxcbiAgICAgICAgbWF4UmVjZWl2ZUNvdW50OiAxMCxcbiAgICAgIH0sXG4gICAgfSk7XG5cbi8vIGNvbnN0IGxhbWJkYVJvbGUgPSBuZXcgUm9sZSh0aGlzLCBcImJvb2tpbmdMYW1iZGFSb2xlXCIsIHtcbi8vICAgICAgIGFzc3VtZWRCeTogbmV3IFNlcnZpY2VQcmluY2lwYWwoXCJsYW1iZGEuYW1hem9uYXdzLmNvbVwiKSxcbi8vICAgICAgIG1hbmFnZWRQb2xpY2llczogW1xuLy8gICAgICAgICBNYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZShcbi8vICAgICAgICAgICBcInNlcnZpY2Utcm9sZS9BV1NBcHBTeW5jUHVzaFRvQ2xvdWRXYXRjaExvZ3NcIlxuLy8gICAgICAgICApLFxuLy8gICAgICAgXSxcbi8vICAgICB9KTtcblxuICAgIGNvbnN0IGJvb2tpbmdMYW1iZGE6IE5vZGVqc0Z1bmN0aW9uID0gbmV3IE5vZGVqc0Z1bmN0aW9uKFxuICAgICAgICB0aGlzLFxuICAgICAgICBcIkFjbXNCb29raW5nSGFuZGxlclwiLFxuICAgICAgICB7XG4gICAgICAgICAgdHJhY2luZzogVHJhY2luZy5BQ1RJVkUsXG4gICAgICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE2X1gsXG4gICAgICAgICAgaGFuZGxlcjogXCJoYW5kbGVyXCIsXG4gICAgICAgICAgZW50cnk6IHBhdGguam9pbihfX2Rpcm5hbWUsIFwibGFtYmRhLWZucy9ib29raW5nXCIsIFwiYXBwLnRzXCIpLFxuICAgICAgICAgIG1lbW9yeVNpemU6IDEwMjQsXG4gICAgICAgICAgZW52aXJvbm1lbnQ6e1xuICAgICAgICAgICAgQk9PS0lOR19RVUVVRV9VUkw6IHF1ZXVlLnF1ZXVlVXJsLFxuICAgICAgICAgICAgLy8gQUNNU19EQjogYWNtc0RhdGFiYXNlLnRhYmxlTmFtZSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgICAvKipcbiAgICAgKiBQcm9jZXNzIFNRUyBNZXNzYWdlcyBMYW1iZGFcbiAgICAgKi9cbiAgICBjb25zdCBwcm9jZXNzU1FTTGFtYmRhOiBOb2RlanNGdW5jdGlvbiA9IG5ldyBOb2RlanNGdW5jdGlvbihcbiAgICAgICAgdGhpcyxcbiAgICAgICAgXCJQcm9jZXNzU3FTQm9va2luZ0hhbmRsZXJcIixcbiAgICAgICAge1xuICAgICAgICAgIHRyYWNpbmc6IFRyYWNpbmcuQUNUSVZFLFxuICAgICAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNl9YLFxuICAgICAgICAgIGhhbmRsZXI6IFwiaGFuZGxlclwiLFxuICAgICAgICAgIGVudHJ5OiBwYXRoLmpvaW4oXG4gICAgICAgICAgICBfX2Rpcm5hbWUsXG4gICAgICAgICAgICBcImxhbWJkYS1mbnMvYm9va2luZ1wiLFxuICAgICAgICAgICAgXCJwcm9jZXNzU3FzQm9va2luZy50c1wiXG4gICAgICAgICAgKSxcbiAgICAgICAgICBtZW1vcnlTaXplOiAxMDI0LFxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgICAvLyBDcmVhdGUgYSBkYXRhIHNvdXJjZSBmb3IgdGhlIExhbWJkYSBmdW5jdGlvblxuICAgIGNvbnN0IGxhbWJkYURhdGFTb3VyY2UgPSBhY21zR3JhcGhxbEFwaS5hZGRMYW1iZGFEYXRhU291cmNlKCdsYW1iZGEtZGF0YS1zb3VyY2UnLCBib29raW5nTGFtYmRhKTtcblxuICAgIC8vIGxhbWJkYURhdGFTb3VyY2UuY3JlYXRlUmVzb2x2ZXIoJ3F1ZXJ5LXJlc29sdmVyJywge1xuICAgIC8vICAgICB0eXBlTmFtZTogJ1F1ZXJ5JyxcbiAgICAvLyAgICAgZmllbGROYW1lOiAnbGlzdE5vdGVzJyxcbiAgICAvLyAgIH0pO1xuICBcbiAgICAgIGxhbWJkYURhdGFTb3VyY2UuY3JlYXRlUmVzb2x2ZXIoJ211dGF0aW9uLXJlc29sdmVyJywge1xuICAgICAgICB0eXBlTmFtZTogJ011dGF0aW9uJyxcbiAgICAgICAgZmllbGROYW1lOiAnY3JlYXRlQXBhcnRtZW50Qm9va2luZycsXG4gICAgICB9KTtcblxuICAgICAgLy8gbGFtYmRhUmVzb2x2ZXIubm9kZS5hZGREZXBlbmRlbmN5KGFjbXNEYXRhYmFzZSk7XG4gICAgICAvLyBsYW1iZGFSZXNvbHZlci5ub2RlLmFkZERlcGVuZGVuY3koYWNtc0dyYXBocWxBcGkpO1xuICAgICAgLy8gbGFtYmRhUmVzb2x2ZXIubm9kZS5hZGREZXBlbmRlbmN5KGFwaVNjaGVtYSk7XG4gICAgICAvLyBwcm9jZXNzU1FTTGFtYmRhLm5vZGUuYWRkRGVwZW5kZW5jeShhY21zRGF0YWJhc2UpXG4gICAgYWNtc0RhdGFiYXNlLmdyYW50V3JpdGVEYXRhKHByb2Nlc3NTUVNMYW1iZGEpO1xuICAgIGFjbXNEYXRhYmFzZS5ncmFudFJlYWREYXRhKGJvb2tpbmdMYW1iZGEpO1xuICAgIHF1ZXVlLmdyYW50U2VuZE1lc3NhZ2VzKGJvb2tpbmdMYW1iZGEpO1xuICAgIHF1ZXVlLmdyYW50Q29uc3VtZU1lc3NhZ2VzKHByb2Nlc3NTUVNMYW1iZGEpO1xuICAgIC8vIGJvb2tpbmdMYW1iZGEuYWRkRW52aXJvbm1lbnQoXCJBQ01TX0RCXCIsIGFjbXNEYXRhYmFzZS50YWJsZU5hbWUpO1xuICAgIGJvb2tpbmdMYW1iZGEuYWRkRW52aXJvbm1lbnQoXCJCT09LSU5HX1FVRVVFX1VSTFwiLCBxdWV1ZS5xdWV1ZVVybCk7XG4gIH1cbn1cbiJdfQ==