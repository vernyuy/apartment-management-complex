import { CfnOutput, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cognito from "aws-cdk-lib/aws-cognito";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import * as appsync from "aws-cdk-lib/aws-appsync";
import {
  AttributeType,
  BillingMode,
  ProjectionType,
  StreamViewType,
  Table,
} from "aws-cdk-lib/aws-dynamodb";
import { readFileSync } from "fs";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as path from "path";

export class AcmsSharedStack extends Stack {
  public readonly acmsDatabase: Table;
  public readonly acmsGraphqlApi: appsync.GraphqlApi;
  public readonly apiSchema: appsync.CfnGraphQLSchema;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /**
     * UserPool and UserPool Client
     */
    const userPool: UserPool = new cognito.UserPool(
      this,
      "ACMSCognitoUserPool",
      {
        selfSignUpEnabled: true,
        accountRecovery: cognito.AccountRecovery.PHONE_AND_EMAIL,
        userVerification: {
          emailStyle: cognito.VerificationEmailStyle.CODE,
        },
        autoVerify: {
          email: true,
        },
        standardAttributes: {
          email: {
            required: true,
            mutable: true,
          },
        },
      }
    );

    const userPoolClient: UserPoolClient = new cognito.UserPoolClient(
      this,
      "ACMSUserPoolClient",
      {
        userPool,
      }
    );

    /**
     * GraphQL API
     */
    this.acmsGraphqlApi = new appsync.GraphqlApi(this, "Api", {
      name: "apartment-complex-management",
      schema: appsync.SchemaFile.fromAsset("schema/schema.graphql"),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
        },

        additionalAuthorizationModes: [
          {
            authorizationType: appsync.AuthorizationType.USER_POOL,
            userPoolConfig: {
              userPool,
            },
          },
        ],
      },
      xrayEnabled: true,
      logConfig: {
        fieldLogLevel: appsync.FieldLogLevel.ALL,
      },
    });

    /**
     * Graphql Schema
     */

    this.apiSchema = new appsync.CfnGraphQLSchema(this, "ACMSGraphqlApiSchema", {
      apiId: this.acmsGraphqlApi.apiId,
      definition: readFileSync("./schema/schema.graphql").toString(),
    });

    /**
     * Database
     */

    this.acmsDatabase = new Table(this, "ACMSDynamoDbTable", {
      tableName: "AcmsDynamoDBDatabaseTable",

      partitionKey: {
        name: "PK",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "SK",
        type: AttributeType.STRING,
      },

      billingMode: BillingMode.PAY_PER_REQUEST,
      stream: StreamViewType.NEW_IMAGE,

      removalPolicy: RemovalPolicy.DESTROY,
    });

    this.acmsDatabase.addGlobalSecondaryIndex({
      indexName: "getAllApartmentsPerUser",
      partitionKey: {
        name: "GSI1PK",
        type: AttributeType.STRING,
      },
      sortKey: {
        name: "GSI1SK",
        type: AttributeType.STRING,
      },

      projectionType: ProjectionType.ALL,
    });

  //   const lambdaFn = new lambda.Function(this, 'AppSyncLambdaHandler', {
  //     runtime: lambda.Runtime.NODEJS_20_X,
  //     handler: 'index.handler',
  //     code: lambda.Code.fromAsset(path.join(__dirname, './lambda-fns'))
  //   });
  // const lambdaDs = this.acmsGraphqlApi.addLambdaDataSource('lambdaDatasource', lambdaFn);

  //   lambdaDs.createResolver("mutRes",{
  //     typeName: 'Mutation',
  //     fieldName: 'createApartmentBooking',
  //   });

// new TestStack(this, "TestStack",{
//     tableName: this.acmsDatabase.tableName,
//     api:this.acmsGraphqlApi
// })
    /**
     * Outputs
     */

    new CfnOutput(this, "UserPoolId", {
      value: userPool.userPoolId,
    });
    new CfnOutput(this, "UserPoolClientId", {
      value: userPoolClient.userPoolClientId,
    });

    new CfnOutput(this, "GraphQLAPI ID", {
      value: this.acmsGraphqlApi.apiId!,
    });

    new CfnOutput(this, "GraphQLAPI URL", {
      value: this.acmsGraphqlApi.graphqlUrl,
    });
  }
}
