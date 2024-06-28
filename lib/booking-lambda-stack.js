"use strict";
// import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
// import {
//   CfnDataSource,
//   CfnFunctionConfiguration,
//   CfnGraphQLApi,
//   CfnGraphQLSchema,
//   CfnResolver,
// } from "aws-cdk-lib/aws-appsync";
// import * as signer from "aws-cdk-lib/aws-signer";
// import { ManagedPolicy, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
// import * as lambda from "aws-cdk-lib/aws-lambda";
// import * as path from "path";
// import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
// import { Tracing } from "aws-cdk-lib/aws-lambda";
// import { aws_iam } from "aws-cdk-lib";
// import { Table } from "aws-cdk-lib/aws-dynamodb";
// import { Construct } from "constructs";
// import * as appsync from "aws-cdk-lib/aws-appsync";
// import { bundleAppSyncResolver } from "./helpers";
// import { join } from "path";
// import * as sqs from  "aws-cdk-lib/aws-sqs";
// interface BookingLambdaStackProps extends StackProps {
//   acmsGraphqlApi: appsync.GraphqlApi;
//   // apiSchema: CfnGraphQLSchema;
//   acmsDatabase: Table;
//   // acmsTableDatasource: CfnDataSource;
// }
// export class BookingLamdaStacks extends Stack {
//   constructor(scope: Construct, id: string, props: BookingLambdaStackProps) {
//     super(scope, id, props);
//     const { acmsDatabase, acmsGraphqlApi } =
//       props;
//     /**
//      * Create SQS Queue and Dead letter Queue
//      */
//     const dlq = new sqs.Queue(this, "DeadLetterQueue");
//     const queue = new sqs.Queue(this, "bookingQueue", {
//       deadLetterQueue: {
//         queue: dlq,
//         maxReceiveCount: 10,
//       },
//     });
//     const policyStatement = new aws_iam.PolicyStatement({
//       effect: aws_iam.Effect.ALLOW,
//       actions: ["cloudwatch:PutMetricData"],
//       resources: ["*"],
//     });
//     const signingProfile = new signer.SigningProfile(this, "SigningProfile", {
//       platform: signer.Platform.AWS_LAMBDA_SHA384_ECDSA,
//     });
//     const codeSigningConfig = new lambda.CodeSigningConfig(
//       this,
//       "CodeSigningConfig",
//       {
//         signingProfiles: [signingProfile],
//       }
//     );
//     /**
//      *
//      * IAM role for Queue Lambda function
//      */
//     const lambdaQueueRole = new Role(this, "QueueConsumerFunctionRole", {
//       assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
//       managedPolicies: [
//         ManagedPolicy.fromAwsManagedPolicyName(
//           "service-role/AWSLambdaSQSQueueExecutionRole"
//         ),
//         ManagedPolicy.fromAwsManagedPolicyName("AWSLambda_FullAccess"),
//         ManagedPolicy.fromAwsManagedPolicyName(
//           "service-role/AWSAppSyncPushToCloudWatchLogs"
//         ),
//       ],
//     });
//     /**
//      *
//      * IAM role for Queue Lambda function
//      */
//     const lambdaRole = new Role(this, "LmbdaFunctionRole", {
//       assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
//       managedPolicies: [
//         ManagedPolicy.fromAwsManagedPolicyName("AWSLambda_FullAccess"),
//         ManagedPolicy.fromAwsManagedPolicyName(
//           "service-role/AWSAppSyncPushToCloudWatchLogs"
//         ),
//       ],
//     });
//     /**
//      * booking function
//      */
//     const bookingLambda: NodejsFunction = new NodejsFunction(
//       this,
//       "AcmsBookingHandler",
//       {
//         tracing: Tracing.ACTIVE,
//         runtime: lambda.Runtime.NODEJS_16_X,
//         handler: "handler",
//         entry: path.join(__dirname, "lambda-fns/booking", "app.ts"),
//         memorySize: 1024,
//       }
//     );
//     /**
//      * Process SQS Messages Lambda
//      */
//     const processSQSLambda: NodejsFunction = new NodejsFunction(
//       this,
//       "ProcessSqSBookingHandler",
//       {
//         tracing: Tracing.ACTIVE,
//         runtime: lambda.Runtime.NODEJS_16_X,
//         handler: "handler",
//         entry: path.join(
//           __dirname,
//           "lambda-fns/booking",
//           "processSqsBooking.ts"
//         ),
//         memorySize: 1024,
//       }
//     );
//     /**
//      * lambda to sqs
//      */
//     const eventSourceMapping = new lambda.EventSourceMapping(
//       this,
//       "QueueConsumerFunctionBookingEvent",
//       {
//         target: processSQSLambda,
//         batchSize: 10,
//         eventSourceArn: queue.queueArn,
//         reportBatchItemFailures: true,
//       }
//     );
//     const appsyncLambdaRole = new Role(this, "LambdaRole", {
//       assumedBy: new ServicePrincipal("appsync.amazonaws.com"),
//       managedPolicies: [
//         ManagedPolicy.fromAwsManagedPolicyName(
//           "service-role/AWSLambdaSQSQueueExecutionRole"
//         ),
//         ManagedPolicy.fromAwsManagedPolicyName("AWSLambda_FullAccess"),
//       ],
//     });
//     const lambdaDataSources = acmsGraphqlApi.addLambdaDataSource(
//       "bookingLambdaDatasource",
//       bookingLambda
//     )
//     const createApartmentBookingResolver: appsync.Resolver = new appsync.Resolver(
//       this,
//       "createApartmentBookingResolver",
//       {
//         api: acmsGraphqlApi,
//         typeName: "Mutation",
//         fieldName: "createApartmentBooking",
//         dataSource: lambdaDataSources,
//       }
//     );
//     const getAllBookingsPerApartmentFunction = new appsync.AppsyncFunction(
//       this,
//       "getAllBookingsPerApartmentFunction",
//       {
//         name: "getAllBookingsPerApartment",
//         api: acmsGraphqlApi,
//         dataSource: acmsGraphqlApi.addDynamoDbDataSource(
//           "getAllBookingsPerApartment",
//           acmsDatabase,
//         ),
//         code: bundleAppSyncResolver(
//           "src/resolvers/booking/getAllBookingPerApartment.ts",
//         ),
//         runtime: appsync.FunctionRuntime.JS_1_0_0,
//       },
//     );
//     const getAllBookingsPerApartmentResolver = new appsync.Resolver(this, "getAllBookingsPerApartmentResolver", {
//       api: acmsGraphqlApi,
//       typeName: "Query",
//       fieldName: "getAllBookingsPerApartment",
//       code: appsync.Code.fromAsset(
//         join(__dirname, "./js_resolvers/_before_and_after_mapping_template.js"),
//       ),
//       runtime: appsync.FunctionRuntime.JS_1_0_0,
//       pipelineConfig: [getAllBookingsPerApartmentFunction],
//     });
//     createApartmentBookingResolver.addDependsOn(apiSchema);
//     getAllBookingsPerApartmentResolver.addDependsOn(apiSchema);
//     acmsDatabase.grantWriteData(processSQSLambda);
//     acmsDatabase.grantReadData(bookingLambda);
//     queue.grantSendMessages(bookingLambda);
//     queue.grantConsumeMessages(processSQSLambda);
//     bookingLambda.addEnvironment("ACMS_DB", acmsDatabase.tableName);
//     bookingLambda.addEnvironment("BOOKING_QUEUE_URL", queue.queueUrl);
//     new CfnOutput(this, "SQSqueueName", {
//       value: queue.queueName,
//       description: "SQS queue name",
//     });
//     new CfnOutput(this, "SQSqueueARN", {
//       value: queue.queueArn,
//       description: "SQS queue ARN",
//     });
//     new CfnOutput(this, "SQSqueueURL", {
//       value: queue.queueUrl,
//       description: "SQS queue URL",
//     });
//   }
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va2luZy1sYW1iZGEtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJib29raW5nLWxhbWJkYS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsOERBQThEO0FBQzlELFdBQVc7QUFDWCxtQkFBbUI7QUFDbkIsOEJBQThCO0FBQzlCLG1CQUFtQjtBQUNuQixzQkFBc0I7QUFDdEIsaUJBQWlCO0FBQ2pCLG9DQUFvQztBQUNwQyxvREFBb0Q7QUFDcEQsK0VBQStFO0FBQy9FLG9EQUFvRDtBQUNwRCxnQ0FBZ0M7QUFDaEMsa0VBQWtFO0FBQ2xFLG9EQUFvRDtBQUNwRCx5Q0FBeUM7QUFDekMsb0RBQW9EO0FBQ3BELDBDQUEwQztBQUMxQyxzREFBc0Q7QUFDdEQscURBQXFEO0FBQ3JELCtCQUErQjtBQUMvQiwrQ0FBK0M7QUFFL0MseURBQXlEO0FBQ3pELHdDQUF3QztBQUN4QyxvQ0FBb0M7QUFDcEMseUJBQXlCO0FBQ3pCLDJDQUEyQztBQUMzQyxJQUFJO0FBRUosa0RBQWtEO0FBQ2xELGdGQUFnRjtBQUNoRiwrQkFBK0I7QUFFL0IsK0NBQStDO0FBQy9DLGVBQWU7QUFDZixVQUFVO0FBQ1YsZ0RBQWdEO0FBQ2hELFVBQVU7QUFFViwwREFBMEQ7QUFDMUQsMERBQTBEO0FBQzFELDJCQUEyQjtBQUMzQixzQkFBc0I7QUFDdEIsK0JBQStCO0FBQy9CLFdBQVc7QUFDWCxVQUFVO0FBRVYsNERBQTREO0FBQzVELHNDQUFzQztBQUN0QywrQ0FBK0M7QUFDL0MsMEJBQTBCO0FBQzFCLFVBQVU7QUFFVixpRkFBaUY7QUFDakYsMkRBQTJEO0FBQzNELFVBQVU7QUFFViw4REFBOEQ7QUFDOUQsY0FBYztBQUNkLDZCQUE2QjtBQUM3QixVQUFVO0FBQ1YsNkNBQTZDO0FBQzdDLFVBQVU7QUFDVixTQUFTO0FBRVQsVUFBVTtBQUNWLFNBQVM7QUFDVCw0Q0FBNEM7QUFDNUMsVUFBVTtBQUNWLDRFQUE0RTtBQUM1RSxpRUFBaUU7QUFDakUsMkJBQTJCO0FBQzNCLGtEQUFrRDtBQUNsRCwwREFBMEQ7QUFDMUQsYUFBYTtBQUNiLDBFQUEwRTtBQUMxRSxrREFBa0Q7QUFDbEQsMERBQTBEO0FBQzFELGFBQWE7QUFDYixXQUFXO0FBQ1gsVUFBVTtBQUVWLFVBQVU7QUFDVixTQUFTO0FBQ1QsNENBQTRDO0FBQzVDLFVBQVU7QUFDViwrREFBK0Q7QUFDL0QsaUVBQWlFO0FBQ2pFLDJCQUEyQjtBQUMzQiwwRUFBMEU7QUFDMUUsa0RBQWtEO0FBQ2xELDBEQUEwRDtBQUMxRCxhQUFhO0FBQ2IsV0FBVztBQUNYLFVBQVU7QUFFVixVQUFVO0FBQ1YsMEJBQTBCO0FBQzFCLFVBQVU7QUFDVixnRUFBZ0U7QUFDaEUsY0FBYztBQUNkLDhCQUE4QjtBQUM5QixVQUFVO0FBQ1YsbUNBQW1DO0FBQ25DLCtDQUErQztBQUMvQyw4QkFBOEI7QUFDOUIsdUVBQXVFO0FBQ3ZFLDRCQUE0QjtBQUM1QixVQUFVO0FBQ1YsU0FBUztBQUVULFVBQVU7QUFDVixxQ0FBcUM7QUFDckMsVUFBVTtBQUNWLG1FQUFtRTtBQUNuRSxjQUFjO0FBQ2Qsb0NBQW9DO0FBQ3BDLFVBQVU7QUFDVixtQ0FBbUM7QUFDbkMsK0NBQStDO0FBQy9DLDhCQUE4QjtBQUM5Qiw0QkFBNEI7QUFDNUIsdUJBQXVCO0FBQ3ZCLGtDQUFrQztBQUNsQyxtQ0FBbUM7QUFDbkMsYUFBYTtBQUNiLDRCQUE0QjtBQUM1QixVQUFVO0FBQ1YsU0FBUztBQUVULFVBQVU7QUFDVix1QkFBdUI7QUFDdkIsVUFBVTtBQUVWLGdFQUFnRTtBQUNoRSxjQUFjO0FBQ2QsNkNBQTZDO0FBQzdDLFVBQVU7QUFDVixvQ0FBb0M7QUFDcEMseUJBQXlCO0FBQ3pCLDBDQUEwQztBQUMxQyx5Q0FBeUM7QUFDekMsVUFBVTtBQUNWLFNBQVM7QUFDVCwrREFBK0Q7QUFDL0Qsa0VBQWtFO0FBQ2xFLDJCQUEyQjtBQUMzQixrREFBa0Q7QUFDbEQsMERBQTBEO0FBQzFELGFBQWE7QUFDYiwwRUFBMEU7QUFDMUUsV0FBVztBQUNYLFVBQVU7QUFFVixvRUFBb0U7QUFDcEUsbUNBQW1DO0FBQ25DLHNCQUFzQjtBQUN0QixRQUFRO0FBRVIscUZBQXFGO0FBQ3JGLGNBQWM7QUFDZCwwQ0FBMEM7QUFDMUMsVUFBVTtBQUNWLCtCQUErQjtBQUMvQixnQ0FBZ0M7QUFDaEMsK0NBQStDO0FBQy9DLHlDQUF5QztBQUN6QyxVQUFVO0FBQ1YsU0FBUztBQUVULDhFQUE4RTtBQUM5RSxjQUFjO0FBQ2QsOENBQThDO0FBQzlDLFVBQVU7QUFDViw4Q0FBOEM7QUFDOUMsK0JBQStCO0FBQy9CLDREQUE0RDtBQUM1RCwwQ0FBMEM7QUFDMUMsMEJBQTBCO0FBQzFCLGFBQWE7QUFDYix1Q0FBdUM7QUFDdkMsa0VBQWtFO0FBQ2xFLGFBQWE7QUFDYixxREFBcUQ7QUFDckQsV0FBVztBQUNYLFNBQVM7QUFFVCxvSEFBb0g7QUFDcEgsNkJBQTZCO0FBQzdCLDJCQUEyQjtBQUMzQixpREFBaUQ7QUFDakQsc0NBQXNDO0FBQ3RDLG1GQUFtRjtBQUNuRixXQUFXO0FBQ1gsbURBQW1EO0FBQ25ELDhEQUE4RDtBQUM5RCxVQUFVO0FBRVYsOERBQThEO0FBQzlELGtFQUFrRTtBQUNsRSxxREFBcUQ7QUFDckQsaURBQWlEO0FBQ2pELDhDQUE4QztBQUM5QyxvREFBb0Q7QUFDcEQsdUVBQXVFO0FBQ3ZFLHlFQUF5RTtBQUV6RSw0Q0FBNEM7QUFDNUMsZ0NBQWdDO0FBQ2hDLHVDQUF1QztBQUN2QyxVQUFVO0FBRVYsMkNBQTJDO0FBQzNDLCtCQUErQjtBQUMvQixzQ0FBc0M7QUFDdEMsVUFBVTtBQUVWLDJDQUEyQztBQUMzQywrQkFBK0I7QUFDL0Isc0NBQXNDO0FBQ3RDLFVBQVU7QUFDVixNQUFNO0FBQ04sSUFBSSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGltcG9ydCB7IENmbk91dHB1dCwgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tIFwiYXdzLWNkay1saWJcIjtcbi8vIGltcG9ydCB7XG4vLyAgIENmbkRhdGFTb3VyY2UsXG4vLyAgIENmbkZ1bmN0aW9uQ29uZmlndXJhdGlvbixcbi8vICAgQ2ZuR3JhcGhRTEFwaSxcbi8vICAgQ2ZuR3JhcGhRTFNjaGVtYSxcbi8vICAgQ2ZuUmVzb2x2ZXIsXG4vLyB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtYXBwc3luY1wiO1xuLy8gaW1wb3J0ICogYXMgc2lnbmVyIGZyb20gXCJhd3MtY2RrLWxpYi9hd3Mtc2lnbmVyXCI7XG4vLyBpbXBvcnQgeyBNYW5hZ2VkUG9saWN5LCBSb2xlLCBTZXJ2aWNlUHJpbmNpcGFsIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1pYW1cIjtcbi8vIGltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuLy8gaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuLy8gaW1wb3J0IHsgTm9kZWpzRnVuY3Rpb24gfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYS1ub2RlanNcIjtcbi8vIGltcG9ydCB7IFRyYWNpbmcgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuLy8gaW1wb3J0IHsgYXdzX2lhbSB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuLy8gaW1wb3J0IHsgVGFibGUgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiXCI7XG4vLyBpbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiO1xuLy8gaW1wb3J0ICogYXMgYXBwc3luYyBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwcHN5bmNcIjtcbi8vIGltcG9ydCB7IGJ1bmRsZUFwcFN5bmNSZXNvbHZlciB9IGZyb20gXCIuL2hlbHBlcnNcIjtcbi8vIGltcG9ydCB7IGpvaW4gfSBmcm9tIFwicGF0aFwiO1xuLy8gaW1wb3J0ICogYXMgc3FzIGZyb20gIFwiYXdzLWNkay1saWIvYXdzLXNxc1wiO1xuXG4vLyBpbnRlcmZhY2UgQm9va2luZ0xhbWJkYVN0YWNrUHJvcHMgZXh0ZW5kcyBTdGFja1Byb3BzIHtcbi8vICAgYWNtc0dyYXBocWxBcGk6IGFwcHN5bmMuR3JhcGhxbEFwaTtcbi8vICAgLy8gYXBpU2NoZW1hOiBDZm5HcmFwaFFMU2NoZW1hO1xuLy8gICBhY21zRGF0YWJhc2U6IFRhYmxlO1xuLy8gICAvLyBhY21zVGFibGVEYXRhc291cmNlOiBDZm5EYXRhU291cmNlO1xuLy8gfVxuXG4vLyBleHBvcnQgY2xhc3MgQm9va2luZ0xhbWRhU3RhY2tzIGV4dGVuZHMgU3RhY2sge1xuLy8gICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogQm9va2luZ0xhbWJkYVN0YWNrUHJvcHMpIHtcbi8vICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuLy8gICAgIGNvbnN0IHsgYWNtc0RhdGFiYXNlLCBhY21zR3JhcGhxbEFwaSB9ID1cbi8vICAgICAgIHByb3BzO1xuLy8gICAgIC8qKlxuLy8gICAgICAqIENyZWF0ZSBTUVMgUXVldWUgYW5kIERlYWQgbGV0dGVyIFF1ZXVlXG4vLyAgICAgICovXG5cbi8vICAgICBjb25zdCBkbHEgPSBuZXcgc3FzLlF1ZXVlKHRoaXMsIFwiRGVhZExldHRlclF1ZXVlXCIpO1xuLy8gICAgIGNvbnN0IHF1ZXVlID0gbmV3IHNxcy5RdWV1ZSh0aGlzLCBcImJvb2tpbmdRdWV1ZVwiLCB7XG4vLyAgICAgICBkZWFkTGV0dGVyUXVldWU6IHtcbi8vICAgICAgICAgcXVldWU6IGRscSxcbi8vICAgICAgICAgbWF4UmVjZWl2ZUNvdW50OiAxMCxcbi8vICAgICAgIH0sXG4vLyAgICAgfSk7XG5cbi8vICAgICBjb25zdCBwb2xpY3lTdGF0ZW1lbnQgPSBuZXcgYXdzX2lhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuLy8gICAgICAgZWZmZWN0OiBhd3NfaWFtLkVmZmVjdC5BTExPVyxcbi8vICAgICAgIGFjdGlvbnM6IFtcImNsb3Vkd2F0Y2g6UHV0TWV0cmljRGF0YVwiXSxcbi8vICAgICAgIHJlc291cmNlczogW1wiKlwiXSxcbi8vICAgICB9KTtcblxuLy8gICAgIGNvbnN0IHNpZ25pbmdQcm9maWxlID0gbmV3IHNpZ25lci5TaWduaW5nUHJvZmlsZSh0aGlzLCBcIlNpZ25pbmdQcm9maWxlXCIsIHtcbi8vICAgICAgIHBsYXRmb3JtOiBzaWduZXIuUGxhdGZvcm0uQVdTX0xBTUJEQV9TSEEzODRfRUNEU0EsXG4vLyAgICAgfSk7XG5cbi8vICAgICBjb25zdCBjb2RlU2lnbmluZ0NvbmZpZyA9IG5ldyBsYW1iZGEuQ29kZVNpZ25pbmdDb25maWcoXG4vLyAgICAgICB0aGlzLFxuLy8gICAgICAgXCJDb2RlU2lnbmluZ0NvbmZpZ1wiLFxuLy8gICAgICAge1xuLy8gICAgICAgICBzaWduaW5nUHJvZmlsZXM6IFtzaWduaW5nUHJvZmlsZV0sXG4vLyAgICAgICB9XG4vLyAgICAgKTtcblxuLy8gICAgIC8qKlxuLy8gICAgICAqXG4vLyAgICAgICogSUFNIHJvbGUgZm9yIFF1ZXVlIExhbWJkYSBmdW5jdGlvblxuLy8gICAgICAqL1xuLy8gICAgIGNvbnN0IGxhbWJkYVF1ZXVlUm9sZSA9IG5ldyBSb2xlKHRoaXMsIFwiUXVldWVDb25zdW1lckZ1bmN0aW9uUm9sZVwiLCB7XG4vLyAgICAgICBhc3N1bWVkQnk6IG5ldyBTZXJ2aWNlUHJpbmNpcGFsKFwibGFtYmRhLmFtYXpvbmF3cy5jb21cIiksXG4vLyAgICAgICBtYW5hZ2VkUG9saWNpZXM6IFtcbi8vICAgICAgICAgTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoXG4vLyAgICAgICAgICAgXCJzZXJ2aWNlLXJvbGUvQVdTTGFtYmRhU1FTUXVldWVFeGVjdXRpb25Sb2xlXCJcbi8vICAgICAgICAgKSxcbi8vICAgICAgICAgTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoXCJBV1NMYW1iZGFfRnVsbEFjY2Vzc1wiKSxcbi8vICAgICAgICAgTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoXG4vLyAgICAgICAgICAgXCJzZXJ2aWNlLXJvbGUvQVdTQXBwU3luY1B1c2hUb0Nsb3VkV2F0Y2hMb2dzXCJcbi8vICAgICAgICAgKSxcbi8vICAgICAgIF0sXG4vLyAgICAgfSk7XG5cbi8vICAgICAvKipcbi8vICAgICAgKlxuLy8gICAgICAqIElBTSByb2xlIGZvciBRdWV1ZSBMYW1iZGEgZnVuY3Rpb25cbi8vICAgICAgKi9cbi8vICAgICBjb25zdCBsYW1iZGFSb2xlID0gbmV3IFJvbGUodGhpcywgXCJMbWJkYUZ1bmN0aW9uUm9sZVwiLCB7XG4vLyAgICAgICBhc3N1bWVkQnk6IG5ldyBTZXJ2aWNlUHJpbmNpcGFsKFwibGFtYmRhLmFtYXpvbmF3cy5jb21cIiksXG4vLyAgICAgICBtYW5hZ2VkUG9saWNpZXM6IFtcbi8vICAgICAgICAgTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoXCJBV1NMYW1iZGFfRnVsbEFjY2Vzc1wiKSxcbi8vICAgICAgICAgTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoXG4vLyAgICAgICAgICAgXCJzZXJ2aWNlLXJvbGUvQVdTQXBwU3luY1B1c2hUb0Nsb3VkV2F0Y2hMb2dzXCJcbi8vICAgICAgICAgKSxcbi8vICAgICAgIF0sXG4vLyAgICAgfSk7XG5cbi8vICAgICAvKipcbi8vICAgICAgKiBib29raW5nIGZ1bmN0aW9uXG4vLyAgICAgICovXG4vLyAgICAgY29uc3QgYm9va2luZ0xhbWJkYTogTm9kZWpzRnVuY3Rpb24gPSBuZXcgTm9kZWpzRnVuY3Rpb24oXG4vLyAgICAgICB0aGlzLFxuLy8gICAgICAgXCJBY21zQm9va2luZ0hhbmRsZXJcIixcbi8vICAgICAgIHtcbi8vICAgICAgICAgdHJhY2luZzogVHJhY2luZy5BQ1RJVkUsXG4vLyAgICAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xNl9YLFxuLy8gICAgICAgICBoYW5kbGVyOiBcImhhbmRsZXJcIixcbi8vICAgICAgICAgZW50cnk6IHBhdGguam9pbihfX2Rpcm5hbWUsIFwibGFtYmRhLWZucy9ib29raW5nXCIsIFwiYXBwLnRzXCIpLFxuLy8gICAgICAgICBtZW1vcnlTaXplOiAxMDI0LFxuLy8gICAgICAgfVxuLy8gICAgICk7XG5cbi8vICAgICAvKipcbi8vICAgICAgKiBQcm9jZXNzIFNRUyBNZXNzYWdlcyBMYW1iZGFcbi8vICAgICAgKi9cbi8vICAgICBjb25zdCBwcm9jZXNzU1FTTGFtYmRhOiBOb2RlanNGdW5jdGlvbiA9IG5ldyBOb2RlanNGdW5jdGlvbihcbi8vICAgICAgIHRoaXMsXG4vLyAgICAgICBcIlByb2Nlc3NTcVNCb29raW5nSGFuZGxlclwiLFxuLy8gICAgICAge1xuLy8gICAgICAgICB0cmFjaW5nOiBUcmFjaW5nLkFDVElWRSxcbi8vICAgICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE2X1gsXG4vLyAgICAgICAgIGhhbmRsZXI6IFwiaGFuZGxlclwiLFxuLy8gICAgICAgICBlbnRyeTogcGF0aC5qb2luKFxuLy8gICAgICAgICAgIF9fZGlybmFtZSxcbi8vICAgICAgICAgICBcImxhbWJkYS1mbnMvYm9va2luZ1wiLFxuLy8gICAgICAgICAgIFwicHJvY2Vzc1Nxc0Jvb2tpbmcudHNcIlxuLy8gICAgICAgICApLFxuLy8gICAgICAgICBtZW1vcnlTaXplOiAxMDI0LFxuLy8gICAgICAgfVxuLy8gICAgICk7XG5cbi8vICAgICAvKipcbi8vICAgICAgKiBsYW1iZGEgdG8gc3FzXG4vLyAgICAgICovXG5cbi8vICAgICBjb25zdCBldmVudFNvdXJjZU1hcHBpbmcgPSBuZXcgbGFtYmRhLkV2ZW50U291cmNlTWFwcGluZyhcbi8vICAgICAgIHRoaXMsXG4vLyAgICAgICBcIlF1ZXVlQ29uc3VtZXJGdW5jdGlvbkJvb2tpbmdFdmVudFwiLFxuLy8gICAgICAge1xuLy8gICAgICAgICB0YXJnZXQ6IHByb2Nlc3NTUVNMYW1iZGEsXG4vLyAgICAgICAgIGJhdGNoU2l6ZTogMTAsXG4vLyAgICAgICAgIGV2ZW50U291cmNlQXJuOiBxdWV1ZS5xdWV1ZUFybixcbi8vICAgICAgICAgcmVwb3J0QmF0Y2hJdGVtRmFpbHVyZXM6IHRydWUsXG4vLyAgICAgICB9XG4vLyAgICAgKTtcbi8vICAgICBjb25zdCBhcHBzeW5jTGFtYmRhUm9sZSA9IG5ldyBSb2xlKHRoaXMsIFwiTGFtYmRhUm9sZVwiLCB7XG4vLyAgICAgICBhc3N1bWVkQnk6IG5ldyBTZXJ2aWNlUHJpbmNpcGFsKFwiYXBwc3luYy5hbWF6b25hd3MuY29tXCIpLFxuLy8gICAgICAgbWFuYWdlZFBvbGljaWVzOiBbXG4vLyAgICAgICAgIE1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKFxuLy8gICAgICAgICAgIFwic2VydmljZS1yb2xlL0FXU0xhbWJkYVNRU1F1ZXVlRXhlY3V0aW9uUm9sZVwiXG4vLyAgICAgICAgICksXG4vLyAgICAgICAgIE1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKFwiQVdTTGFtYmRhX0Z1bGxBY2Nlc3NcIiksXG4vLyAgICAgICBdLFxuLy8gICAgIH0pO1xuXG4vLyAgICAgY29uc3QgbGFtYmRhRGF0YVNvdXJjZXMgPSBhY21zR3JhcGhxbEFwaS5hZGRMYW1iZGFEYXRhU291cmNlKFxuLy8gICAgICAgXCJib29raW5nTGFtYmRhRGF0YXNvdXJjZVwiLFxuLy8gICAgICAgYm9va2luZ0xhbWJkYVxuLy8gICAgIClcblxuLy8gICAgIGNvbnN0IGNyZWF0ZUFwYXJ0bWVudEJvb2tpbmdSZXNvbHZlcjogYXBwc3luYy5SZXNvbHZlciA9IG5ldyBhcHBzeW5jLlJlc29sdmVyKFxuLy8gICAgICAgdGhpcyxcbi8vICAgICAgIFwiY3JlYXRlQXBhcnRtZW50Qm9va2luZ1Jlc29sdmVyXCIsXG4vLyAgICAgICB7XG4vLyAgICAgICAgIGFwaTogYWNtc0dyYXBocWxBcGksXG4vLyAgICAgICAgIHR5cGVOYW1lOiBcIk11dGF0aW9uXCIsXG4vLyAgICAgICAgIGZpZWxkTmFtZTogXCJjcmVhdGVBcGFydG1lbnRCb29raW5nXCIsXG4vLyAgICAgICAgIGRhdGFTb3VyY2U6IGxhbWJkYURhdGFTb3VyY2VzLFxuLy8gICAgICAgfVxuLy8gICAgICk7XG5cbi8vICAgICBjb25zdCBnZXRBbGxCb29raW5nc1BlckFwYXJ0bWVudEZ1bmN0aW9uID0gbmV3IGFwcHN5bmMuQXBwc3luY0Z1bmN0aW9uKFxuLy8gICAgICAgdGhpcyxcbi8vICAgICAgIFwiZ2V0QWxsQm9va2luZ3NQZXJBcGFydG1lbnRGdW5jdGlvblwiLFxuLy8gICAgICAge1xuLy8gICAgICAgICBuYW1lOiBcImdldEFsbEJvb2tpbmdzUGVyQXBhcnRtZW50XCIsXG4vLyAgICAgICAgIGFwaTogYWNtc0dyYXBocWxBcGksXG4vLyAgICAgICAgIGRhdGFTb3VyY2U6IGFjbXNHcmFwaHFsQXBpLmFkZER5bmFtb0RiRGF0YVNvdXJjZShcbi8vICAgICAgICAgICBcImdldEFsbEJvb2tpbmdzUGVyQXBhcnRtZW50XCIsXG4vLyAgICAgICAgICAgYWNtc0RhdGFiYXNlLFxuLy8gICAgICAgICApLFxuLy8gICAgICAgICBjb2RlOiBidW5kbGVBcHBTeW5jUmVzb2x2ZXIoXG4vLyAgICAgICAgICAgXCJzcmMvcmVzb2x2ZXJzL2Jvb2tpbmcvZ2V0QWxsQm9va2luZ1BlckFwYXJ0bWVudC50c1wiLFxuLy8gICAgICAgICApLFxuLy8gICAgICAgICBydW50aW1lOiBhcHBzeW5jLkZ1bmN0aW9uUnVudGltZS5KU18xXzBfMCxcbi8vICAgICAgIH0sXG4vLyAgICAgKTtcblxuLy8gICAgIGNvbnN0IGdldEFsbEJvb2tpbmdzUGVyQXBhcnRtZW50UmVzb2x2ZXIgPSBuZXcgYXBwc3luYy5SZXNvbHZlcih0aGlzLCBcImdldEFsbEJvb2tpbmdzUGVyQXBhcnRtZW50UmVzb2x2ZXJcIiwge1xuLy8gICAgICAgYXBpOiBhY21zR3JhcGhxbEFwaSxcbi8vICAgICAgIHR5cGVOYW1lOiBcIlF1ZXJ5XCIsXG4vLyAgICAgICBmaWVsZE5hbWU6IFwiZ2V0QWxsQm9va2luZ3NQZXJBcGFydG1lbnRcIixcbi8vICAgICAgIGNvZGU6IGFwcHN5bmMuQ29kZS5mcm9tQXNzZXQoXG4vLyAgICAgICAgIGpvaW4oX19kaXJuYW1lLCBcIi4vanNfcmVzb2x2ZXJzL19iZWZvcmVfYW5kX2FmdGVyX21hcHBpbmdfdGVtcGxhdGUuanNcIiksXG4vLyAgICAgICApLFxuLy8gICAgICAgcnVudGltZTogYXBwc3luYy5GdW5jdGlvblJ1bnRpbWUuSlNfMV8wXzAsXG4vLyAgICAgICBwaXBlbGluZUNvbmZpZzogW2dldEFsbEJvb2tpbmdzUGVyQXBhcnRtZW50RnVuY3Rpb25dLFxuLy8gICAgIH0pO1xuXG4vLyAgICAgY3JlYXRlQXBhcnRtZW50Qm9va2luZ1Jlc29sdmVyLmFkZERlcGVuZHNPbihhcGlTY2hlbWEpO1xuLy8gICAgIGdldEFsbEJvb2tpbmdzUGVyQXBhcnRtZW50UmVzb2x2ZXIuYWRkRGVwZW5kc09uKGFwaVNjaGVtYSk7XG4vLyAgICAgYWNtc0RhdGFiYXNlLmdyYW50V3JpdGVEYXRhKHByb2Nlc3NTUVNMYW1iZGEpO1xuLy8gICAgIGFjbXNEYXRhYmFzZS5ncmFudFJlYWREYXRhKGJvb2tpbmdMYW1iZGEpO1xuLy8gICAgIHF1ZXVlLmdyYW50U2VuZE1lc3NhZ2VzKGJvb2tpbmdMYW1iZGEpO1xuLy8gICAgIHF1ZXVlLmdyYW50Q29uc3VtZU1lc3NhZ2VzKHByb2Nlc3NTUVNMYW1iZGEpO1xuLy8gICAgIGJvb2tpbmdMYW1iZGEuYWRkRW52aXJvbm1lbnQoXCJBQ01TX0RCXCIsIGFjbXNEYXRhYmFzZS50YWJsZU5hbWUpO1xuLy8gICAgIGJvb2tpbmdMYW1iZGEuYWRkRW52aXJvbm1lbnQoXCJCT09LSU5HX1FVRVVFX1VSTFwiLCBxdWV1ZS5xdWV1ZVVybCk7XG5cbi8vICAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsIFwiU1FTcXVldWVOYW1lXCIsIHtcbi8vICAgICAgIHZhbHVlOiBxdWV1ZS5xdWV1ZU5hbWUsXG4vLyAgICAgICBkZXNjcmlwdGlvbjogXCJTUVMgcXVldWUgbmFtZVwiLFxuLy8gICAgIH0pO1xuXG4vLyAgICAgbmV3IENmbk91dHB1dCh0aGlzLCBcIlNRU3F1ZXVlQVJOXCIsIHtcbi8vICAgICAgIHZhbHVlOiBxdWV1ZS5xdWV1ZUFybixcbi8vICAgICAgIGRlc2NyaXB0aW9uOiBcIlNRUyBxdWV1ZSBBUk5cIixcbi8vICAgICB9KTtcblxuLy8gICAgIG5ldyBDZm5PdXRwdXQodGhpcywgXCJTUVNxdWV1ZVVSTFwiLCB7XG4vLyAgICAgICB2YWx1ZTogcXVldWUucXVldWVVcmwsXG4vLyAgICAgICBkZXNjcmlwdGlvbjogXCJTUVMgcXVldWUgVVJMXCIsXG4vLyAgICAgfSk7XG4vLyAgIH1cbi8vIH1cbiJdfQ==