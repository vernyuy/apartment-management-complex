import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import {
  CfnDataSource,
  CfnFunctionConfiguration,
  CfnGraphQLApi,
  CfnGraphQLSchema,
  CfnResolver,
} from "aws-cdk-lib/aws-appsync";
import * as signer from "aws-cdk-lib/aws-signer";
import { ManagedPolicy, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Tracing } from "aws-cdk-lib/aws-lambda";
import { aws_iam } from "aws-cdk-lib";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import * as appsync from "aws-cdk-lib/aws-appsync";
import { bundleAppSyncResolver } from "./helpers";
import { join } from "path";
import * as sqs from  "aws-cdk-lib/aws-sqs";

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

//     // const policyStatement = new aws_iam.PolicyStatement({
//     //   effect: aws_iam.Effect.ALLOW,
//     //   actions: ["cloudwatch:PutMetricData"],
//     //   resources: ["*"],
//     // });

//     // const signingProfile = new signer.SigningProfile(this, "SigningProfile", {
//     //   platform: signer.Platform.AWS_LAMBDA_SHA384_ECDSA,
//     // });

//     // const codeSigningConfig = new lambda.CodeSigningConfig(
//     //   this,
//     //   "CodeSigningConfig",
//     //   {
//     //     signingProfiles: [signingProfile],
//     //   }
//     // );

//     /**
//      *
//      * IAM role for Queue Lambda function
//      */
//     // const lambdaQueueRole = new Role(this, "QueueConsumerFunctionRole", {
//     //   assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
//     //   managedPolicies: [
//     //     ManagedPolicy.fromAwsManagedPolicyName(
//     //       "service-role/AWSLambdaSQSQueueExecutionRole"
//     //     ),
//     //     ManagedPolicy.fromAwsManagedPolicyName("AWSLambda_FullAccess"),
//     //     ManagedPolicy.fromAwsManagedPolicyName(
//     //       "service-role/AWSAppSyncPushToCloudWatchLogs"
//     //     ),
//     //   ],
//     // });

//     /**
//      *
//      * IAM role for Queue Lambda function
//      */
//     // const lambdaRole = new Role(this, "LmbdaFunctionRole", {
//     //   assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
//     //   managedPolicies: [
//     //     ManagedPolicy.fromAwsManagedPolicyName("AWSLambda_FullAccess"),
//     //     ManagedPolicy.fromAwsManagedPolicyName(
//     //       "service-role/AWSAppSyncPushToCloudWatchLogs"
//     //     ),
//     //   ],
//     // });

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

//     // const eventSourceMapping = new lambda.EventSourceMapping(
//     //   this,
//     //   "QueueConsumerFunctionBookingEvent",
//     //   {
//     //     target: processSQSLambda,
//     //     batchSize: 10,
//     //     eventSourceArn: queue.queueArn,
//     //     reportBatchItemFailures: true,
//     //   }
//     // );
//     // const appsyncLambdaRole = new Role(this, "LambdaRole", {
//     //   assumedBy: new ServicePrincipal("appsync.amazonaws.com"),
//     //   managedPolicies: [
//     //     ManagedPolicy.fromAwsManagedPolicyName(
//     //       "service-role/AWSLambdaSQSQueueExecutionRole"
//     //     ),
//     //     ManagedPolicy.fromAwsManagedPolicyName("AWSLambda_FullAccess"),
//     //   ],
//     // });

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
