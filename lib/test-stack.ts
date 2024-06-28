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
import * as ddb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import * as appsync from "aws-cdk-lib/aws-appsync";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { bundleAppSyncResolver } from "./helpers";
import { join } from "path";
import * as sqs from  "aws-cdk-lib/aws-sqs";

interface TestStackProps extends StackProps {
    api: appsync.GraphqlApi;
    tableName: string;
  }
  
  export class TestStack extends Stack {
    constructor(scope: Construct, id: string, props: TestStackProps) {
        super(scope, id, props);
    
        const { api, tableName } = props;

          const dlq = new sqs.Queue(this, "DeadLetterQueue");
    const queue = new sqs.Queue(this, "bookingQueue", {
      deadLetterQueue: {
        queue: dlq,
        maxReceiveCount: 10,
      },
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
          environment:{
            BOOKING_QUEUE_URL: queue.queueUrl,
            ACMS_DB: tableName,
          }
        }
      );

      const lambdaDataSource = api.addLambdaDataSource('lambda-data-source', bookingLambda);


      const lambdaResolver = lambdaDataSource.createResolver('mutation-resolver', {
        typeName: 'Mutation',
        fieldName: 'createApartmentBooking',
      });
    }
  }
