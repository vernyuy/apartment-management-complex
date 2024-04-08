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

const lambdaRole = new Role(this, "bookingLambdaRole", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSAppSyncPushToCloudWatchLogs"
        ),
      ],
    });

    const bookingLambda: NodejsFunction = new NodejsFunction(
        this,
        "AcmsBookingHandler",
        {
          tracing: Tracing.ACTIVE,
          runtime: lambda.Runtime.NODEJS_16_X,
          handler: "handler",
          entry: path.join(__dirname, "lambda-fns/booking", "app.ts"),
          memorySize: 1024,
        }
      );

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

  }
}
