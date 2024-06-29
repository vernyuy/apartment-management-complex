import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";
import * as appsync from "aws-cdk-lib/aws-appsync";
import * as iam from "aws-cdk-lib/aws-iam";
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

        const lambdaRole = new iam.Role(this, 'LambdaExecutionRole', {
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
          });
      
          lambdaRole.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'));
      

      const lambdaFn = new lambda.Function(this, 'AppSyncLambdaHandler', {
        runtime: lambda.Runtime.NODEJS_20_X,
        handler: 'createApartmentBooking.handler',
        code: lambda.Code.fromAsset(path.join(__dirname, './lambda-fns')),
        environment:{
          BOOKING_QUEUE_URL: queue.queueUrl,
        }
      });
    const lambdaDs = api.addLambdaDataSource('lambdaDatasource', lambdaFn);

      lambdaDs.createResolver("mutRes",{
        typeName: 'Mutation',
        fieldName: 'createApartmentBooking',
      });
          

    // const bookingLambda: NodejsFunction = new NodejsFunction(
    //     this,
    //     "AcmsBookingHandler",
    //     {
    //       tracing: Tracing.ACTIVE,
    //       runtime: lambda.Runtime.NODEJS_16_X,
    //       handler: "handler",
    //       entry: path.join(__dirname, "lambda-fns/booking", "app.ts"),
        //   memorySize: 1024,
        //   environment:{
        //     BOOKING_QUEUE_URL: queue.queueUrl,
        //     ACMS_DB: tableName,
        //   }
    //     }
    //   );

    }
  }
