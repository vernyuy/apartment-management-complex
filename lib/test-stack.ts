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

      const lambdaFn = new lambda.Function(this, 'AppSyncLambdaHandler', {
        runtime: lambda.Runtime.NODEJS_20_X,
        handler: 'index.handler',
        code: lambda.Code.fromAsset(path.join(__dirname, './lambda-fns')),
      });

      const lambdaDataSource = new appsync.LambdaDataSource(this, 'MyLambdaDataSource', {
        api,
        lambdaFunction: bookingLambda,
        description: 'description',
        name: 'name',
        // serviceRole: role,
      });
  
    //   const lambdaDataSource = api.addLambdaDataSource( 'lambda-data-source', lambdaFn);

    //   const createApartmentBookingResolver: appsync.Resolver = new appsync.Resolver(
    //     this,
    //     "createApartmentBookingResolver",
    //     {
    //       api: api,
    //       typeName: "Mutation",
    //       fieldName: "createApartmentBooking",
    //       dataSource: lambdaDataSource,
    //     }
    //   );


      const lambdaResolver = lambdaDataSource.createResolver('mutation-resolver', {
        typeName: 'Mutation',
        fieldName: 'createApartmentBooking',
        
      });
    }
  }
