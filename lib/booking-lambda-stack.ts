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

interface BookingLambdaStackProps extends StackProps {
  acmsGraphqlApi: appsync.GraphqlApi;
  // apiSchema: CfnGraphQLSchema;
  acmsDatabase: Table;
  // acmsTableDatasource: CfnDataSource;
}

export class BookingLamdaStacks extends Stack {
  constructor(scope: Construct, id: string, props: BookingLambdaStackProps) {
    super(scope, id, props);

    const { acmsDatabase, acmsGraphqlApi } =
      props;
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

    const policyStatement = new aws_iam.PolicyStatement({
      effect: aws_iam.Effect.ALLOW,
      actions: ["cloudwatch:PutMetricData"],
      resources: ["*"],
    });

    const signingProfile = new signer.SigningProfile(this, "SigningProfile", {
      platform: signer.Platform.AWS_LAMBDA_SHA384_ECDSA,
    });

    const codeSigningConfig = new lambda.CodeSigningConfig(
      this,
      "CodeSigningConfig",
      {
        signingProfiles: [signingProfile],
      }
    );

    /**
     *
     * IAM role for Queue Lambda function
     */
    const lambdaQueueRole = new Role(this, "QueueConsumerFunctionRole", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaSQSQueueExecutionRole"
        ),
        ManagedPolicy.fromAwsManagedPolicyName("AWSLambda_FullAccess"),
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSAppSyncPushToCloudWatchLogs"
        ),
      ],
    });

    /**
     *
     * IAM role for Queue Lambda function
     */
    const lambdaRole = new Role(this, "LmbdaFunctionRole", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName("AWSLambda_FullAccess"),
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSAppSyncPushToCloudWatchLogs"
        ),
      ],
    });

    /**
     * booking function
     */
    const bookingLambda: NodejsFunction = new NodejsFunction(
      this,
      "AcmsBookingHandler",
      {
        tracing: Tracing.ACTIVE,
        codeSigningConfig,
        runtime: lambda.Runtime.NODEJS_16_X,
        handler: "handler",
        entry: path.join(__dirname, "lambda-fns/booking", "app.ts"),
        initialPolicy: [policyStatement],
        role: lambdaRole,

        memorySize: 1024,
      }
    );

    /**
     * Process SQS Messages Lambda
     */
    const processSQSLambda: NodejsFunction = new NodejsFunction(
      this,
      "ProcessSqSBookingHandler",
      {
        tracing: Tracing.ACTIVE,
        codeSigningConfig,
        runtime: lambda.Runtime.NODEJS_16_X,
        handler: "handler",
        entry: path.join(
          __dirname,
          "lambda-fns/booking",
          "processSqsBooking.ts"
        ),
        initialPolicy: [policyStatement],
        role: lambdaQueueRole,

        memorySize: 1024,
      }
    );

    /**
     * lambda to sqs
     */

    const eventSourceMapping = new lambda.EventSourceMapping(
      this,
      "QueueConsumerFunctionBookingEvent",
      {
        target: processSQSLambda,
        batchSize: 10,
        eventSourceArn: queue.queueArn,
        reportBatchItemFailures: true,
      }
    );
    const appsyncLambdaRole = new Role(this, "LambdaRole", {
      assumedBy: new ServicePrincipal("appsync.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaSQSQueueExecutionRole"
        ),
        ManagedPolicy.fromAwsManagedPolicyName("AWSLambda_FullAccess"),
      ],
    });

    const lambdaDataSources = acmsGraphqlApi.addLambdaDataSource(
      "bookingLambdaDatasource",
      bookingLambda
    )

    const createApartmentBookingResolver: appsync.Resolver = new appsync.Resolver(
      this,
      "createApartmentBookingResolver",
      {
        api: acmsGraphqlApi,
        typeName: "Mutation",
        fieldName: "createApartmentBooking",

        code: appsync.Code.fromAsset(
          join(__dirname, "./js_resolvers/_before_and_after_mapping_template.js")
        ),
        dataSource: lambdaDataSources,
      }
    );

    // const getAllBookingsByApartmentFunction =
    //   new CfnFunctionConfiguration(this, "getAllBookingsFunction", {
    //     apiId: acmsGraphqlApi.attrApiId,

    //     dataSourceName: acmsTableDatasource.name,
    //     requestMappingTemplate: readFileSync(
    //       "./lib/vtl_templates/get_all_bookings_per_apartment_request.vtl"
    //     ).toString(),
    //     responseMappingTemplate: readFileSync(
    //       "./lib/vtl_templates/get_all_bookings_per_apartment_response.vtl"
    //     ).toString(),
    //     functionVersion: "2018-05-29",
    //     name: "getAllBookingsFunction",
    //   });

    // const getUserPerBookingsFunction: CfnFunctionConfiguration =
    //   new CfnFunctionConfiguration(this, "getUserPerBookingFunction", {
    //     apiId: acmsGraphqlApi.attrApiId,

    //     dataSourceName: acmsTableDatasource.name,
    //     requestMappingTemplate: readFileSync(
    //       "./lib/vtl_templates/get_user_per_booking_request.vtl"
    //     ).toString(),
    //     responseMappingTemplate: readFileSync(
    //       "./lib/vtl_templates/get_user_per_booking_response.vtl"
    //     ).toString(),
    //     functionVersion: "2018-05-29",
    //     name: "getUserPerBookingFunction",
    //   });

    // const getResultBookingPerApartmentResolver: CfnResolver = new CfnResolver(
    //   this,
    //   "getResultBookingPerApartmentResolver",
    //   {
    //     apiId: acmsGraphqlApi.attrApiId,
    //     typeName: "Query",
    //     fieldName: "getAllBookingsPerApartment",
    //     kind: "PIPELINE",
    //     pipelineConfig: {
    //       functions: [
    //         getAllBookingsByApartmentFunction.attrFunctionId,
    //         getUserPerBookingsFunction.attrFunctionId,
    //       ],
    //     },

    //     requestMappingTemplate: readFileSync(
    //       "./lib/vtl_templates/before_mapping_template.vtl"
    //     ).toString(),

    //     responseMappingTemplate: readFileSync(
    //       "./lib/vtl_templates/after_mapping_template.vtl"
    //     ).toString(),
    //   }
    // );

    acmsDatabase.grantWriteData(processSQSLambda);
    acmsDatabase.grantReadData(bookingLambda);
    queue.grantSendMessages(bookingLambda);
    queue.grantConsumeMessages(processSQSLambda);
    bookingLambda.addEnvironment("ACMS_DB", acmsDatabase.tableName);
    bookingLambda.addEnvironment("BOOKING_QUEUE_URL", queue.queueUrl);

    new CfnOutput(this, "SQSqueueName", {
      value: queue.queueName,
      description: "SQS queue name",
    });

    new CfnOutput(this, "SQSqueueARN", {
      value: queue.queueArn,
      description: "SQS queue ARN",
    });

    new CfnOutput(this, "SQSqueueURL", {
      value: queue.queueUrl,
      description: "SQS queue URL",
    });
  }
}
