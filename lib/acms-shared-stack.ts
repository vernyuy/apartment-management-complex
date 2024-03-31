import { CfnOutput, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as cognito from "aws-cdk-lib/aws-cognito";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import * as appsync from "aws-cdk-lib/aws-appsync";

import * as iam from "aws-cdk-lib/aws-iam";
import {
  AttributeType,
  BillingMode,
  ProjectionType,
  StreamViewType,
  Table,
} from "aws-cdk-lib/aws-dynamodb";
import { ManagedPolicy, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";

export class AcmsSharedStack extends Stack {
  // public readonly acmsDatabase: Table;
  // public readonly acmsGraphqlApi: appsync.GraphqlApi;
  // public readonly acmsTableDatasource: appsync.DataSourceOptions;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /**
     * UserPool and UserPool Client
     */
    // const userPool: UserPool = new cognito.UserPool(
    //   this,
    //   "ACMSCognitoUserPool",
    //   {
    //     selfSignUpEnabled: true,
    //     accountRecovery: cognito.AccountRecovery.PHONE_AND_EMAIL,
    //     userVerification: {
    //       emailStyle: cognito.VerificationEmailStyle.CODE,
    //     },
    //     autoVerify: {
    //       email: true,
    //     },
    //     standardAttributes: {
    //       email: {
    //         required: true,
    //         mutable: true,
    //       },
    //     },
    //   }
    // );
    // const dynamoDBRole = new Role(this, "DynamoDBRole", {
    //   assumedBy: new ServicePrincipal("appsync.amazonaws.com"),
    // });

    // dynamoDBRole.addManagedPolicy(
    //   ManagedPolicy.fromAwsManagedPolicyName("AmazonDynamoDBFullAccess")
    // );

    // const userPoolClient: UserPoolClient = new cognito.UserPoolClient(
    //   this,
    //   "ACMSUserPoolClient",
    //   {
    //     userPool,
    //   }
    // );

    // /**
    //  * CloudWatch Role
    //  */
    // // give appsync permission to log to cloudwatch by assigning a role

    // const cloudWatchRole = new iam.Role(this, "appSyncCloudWatchLogs", {
    //   assumedBy: new iam.ServicePrincipal("appsync.amazonaws.com"),
    // });

    // cloudWatchRole.addManagedPolicy(
    //   iam.ManagedPolicy.fromAwsManagedPolicyName(
    //     "service-role/AWSAppSyncPushToCloudWatchLogs"
    //   )
    // );

    // /**
    //  * GraphQL API
    //  */
    // this.acmsGraphqlApi = new appsync.GraphqlApi(this, "Api", {
    //   name: "apartment-complex-management",
    //   schema: appsync.SchemaFile.fromAsset("schema/schema.graphql"),
    //   authorizationConfig: {
    //     defaultAuthorization: {
    //       authorizationType: appsync.AuthorizationType.API_KEY,
    //     },

    //     additionalAuthorizationModes: [
    //       {
    //         authorizationType: appsync.AuthorizationType.USER_POOL,
    //         userPoolConfig: {
    //           userPool,
    //         },
    //       },
    //     ],
    //   },
    //   xrayEnabled: true,
    //   logConfig: {
    //     fieldLogLevel: appsync.FieldLogLevel.ALL,
    //   },
    // });

    // //   definition: readFileSync("./schema/schema.graphql").toString(),
    // // });

    // /**
    //  * Database
    //  */

    // this.acmsDatabase = new Table(this, "ACMSDynamoDbTable", {
    //   tableName: "AcmsDynamoDBTable",

    //   partitionKey: {
    //     name: "PK",
    //     type: AttributeType.STRING,
    //   },
    //   sortKey: {
    //     name: "SK",
    //     type: AttributeType.STRING,
    //   },

    //   billingMode: BillingMode.PAY_PER_REQUEST,
    //   stream: StreamViewType.NEW_IMAGE,

    //   removalPolicy: RemovalPolicy.DESTROY,
    // });

    // this.acmsDatabase.addGlobalSecondaryIndex({
    //   indexName: "getAllApartmentsPerUser",
    //   partitionKey: {
    //     name: "GSI1PK",
    //     type: AttributeType.STRING,
    //   },
    //   sortKey: {
    //     name: "GSI1SK",
    //     type: AttributeType.STRING,
    //   },

    //   projectionType: ProjectionType.ALL,
    // });

    // // this.acmsTableDatasource = this.acmsGraphqlApi.addDynamoDbDataSource('postDataSource', this.acmsDatabase);


    // /**
    //  * Outputs
    //  */

    // new CfnOutput(this, "UserPoolId", {
    //   value: userPool.userPoolId,
    // });
    // new CfnOutput(this, "UserPoolClientId", {
    //   value: userPoolClient.userPoolClientId,
    // });

    // new CfnOutput(this, "GraphQLAPI ID", {
    //   value: this.acmsGraphqlApi.apiId!,
    // });

    // new CfnOutput(this, "GraphQLAPI URL", {
    //   value: this.acmsGraphqlApi.graphqlUrl,
    // });
  }
}
