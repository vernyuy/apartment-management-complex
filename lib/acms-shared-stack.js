"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcmsSharedStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
class AcmsSharedStack extends aws_cdk_lib_1.Stack {
    // public readonly acmsDatabase: Table;
    // public readonly acmsGraphqlApi: appsync.GraphqlApi;
    // public readonly acmsTableDatasource: appsync.DataSourceOptions;
    constructor(scope, id, props) {
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
exports.AcmsSharedStack = AcmsSharedStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNtcy1zaGFyZWQtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY21zLXNoYXJlZC1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBMEU7QUFnQjFFLE1BQWEsZUFBZ0IsU0FBUSxtQkFBSztJQUN4Qyx1Q0FBdUM7SUFDdkMsc0RBQXNEO0lBQ3RELGtFQUFrRTtJQUVsRSxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCOztXQUVHO1FBQ0gsbURBQW1EO1FBQ25ELFVBQVU7UUFDViwyQkFBMkI7UUFDM0IsTUFBTTtRQUNOLCtCQUErQjtRQUMvQixnRUFBZ0U7UUFDaEUsMEJBQTBCO1FBQzFCLHlEQUF5RDtRQUN6RCxTQUFTO1FBQ1Qsb0JBQW9CO1FBQ3BCLHFCQUFxQjtRQUNyQixTQUFTO1FBQ1QsNEJBQTRCO1FBQzVCLGlCQUFpQjtRQUNqQiwwQkFBMEI7UUFDMUIseUJBQXlCO1FBQ3pCLFdBQVc7UUFDWCxTQUFTO1FBQ1QsTUFBTTtRQUNOLEtBQUs7UUFDTCx3REFBd0Q7UUFDeEQsOERBQThEO1FBQzlELE1BQU07UUFFTixpQ0FBaUM7UUFDakMsdUVBQXVFO1FBQ3ZFLEtBQUs7UUFFTCxxRUFBcUU7UUFDckUsVUFBVTtRQUNWLDBCQUEwQjtRQUMxQixNQUFNO1FBQ04sZ0JBQWdCO1FBQ2hCLE1BQU07UUFDTixLQUFLO1FBRUwsTUFBTTtRQUNOLHFCQUFxQjtRQUNyQixNQUFNO1FBQ04sc0VBQXNFO1FBRXRFLHVFQUF1RTtRQUN2RSxrRUFBa0U7UUFDbEUsTUFBTTtRQUVOLG1DQUFtQztRQUNuQyxnREFBZ0Q7UUFDaEQsb0RBQW9EO1FBQ3BELE1BQU07UUFDTixLQUFLO1FBRUwsTUFBTTtRQUNOLGlCQUFpQjtRQUNqQixNQUFNO1FBQ04sOERBQThEO1FBQzlELDBDQUEwQztRQUMxQyxtRUFBbUU7UUFDbkUsMkJBQTJCO1FBQzNCLDhCQUE4QjtRQUM5Qiw4REFBOEQ7UUFDOUQsU0FBUztRQUVULHNDQUFzQztRQUN0QyxVQUFVO1FBQ1Ysa0VBQWtFO1FBQ2xFLDRCQUE0QjtRQUM1QixzQkFBc0I7UUFDdEIsYUFBYTtRQUNiLFdBQVc7UUFDWCxTQUFTO1FBQ1QsT0FBTztRQUNQLHVCQUF1QjtRQUN2QixpQkFBaUI7UUFDakIsZ0RBQWdEO1FBQ2hELE9BQU87UUFDUCxNQUFNO1FBRU4sdUVBQXVFO1FBQ3ZFLFNBQVM7UUFFVCxNQUFNO1FBQ04sY0FBYztRQUNkLE1BQU07UUFFTiw2REFBNkQ7UUFDN0Qsb0NBQW9DO1FBRXBDLG9CQUFvQjtRQUNwQixrQkFBa0I7UUFDbEIsa0NBQWtDO1FBQ2xDLE9BQU87UUFDUCxlQUFlO1FBQ2Ysa0JBQWtCO1FBQ2xCLGtDQUFrQztRQUNsQyxPQUFPO1FBRVAsOENBQThDO1FBQzlDLHNDQUFzQztRQUV0QywwQ0FBMEM7UUFDMUMsTUFBTTtRQUVOLDhDQUE4QztRQUM5QywwQ0FBMEM7UUFDMUMsb0JBQW9CO1FBQ3BCLHNCQUFzQjtRQUN0QixrQ0FBa0M7UUFDbEMsT0FBTztRQUNQLGVBQWU7UUFDZixzQkFBc0I7UUFDdEIsa0NBQWtDO1FBQ2xDLE9BQU87UUFFUCx3Q0FBd0M7UUFDeEMsTUFBTTtRQUVOLGdIQUFnSDtRQUdoSCxNQUFNO1FBQ04sYUFBYTtRQUNiLE1BQU07UUFFTixzQ0FBc0M7UUFDdEMsZ0NBQWdDO1FBQ2hDLE1BQU07UUFDTiw0Q0FBNEM7UUFDNUMsNENBQTRDO1FBQzVDLE1BQU07UUFFTix5Q0FBeUM7UUFDekMsdUNBQXVDO1FBQ3ZDLE1BQU07UUFFTiwwQ0FBMEM7UUFDMUMsMkNBQTJDO1FBQzNDLE1BQU07SUFDUixDQUFDO0NBQ0Y7QUFySkQsMENBcUpDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2ZuT3V0cHV0LCBSZW1vdmFsUG9saWN5LCBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcbmltcG9ydCAqIGFzIGNvZ25pdG8gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jb2duaXRvXCI7XG5pbXBvcnQgeyBVc2VyUG9vbCwgVXNlclBvb2xDbGllbnQgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNvZ25pdG9cIjtcbmltcG9ydCAqIGFzIGFwcHN5bmMgZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcHBzeW5jXCI7XG5cbmltcG9ydCAqIGFzIGlhbSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWlhbVwiO1xuaW1wb3J0IHtcbiAgQXR0cmlidXRlVHlwZSxcbiAgQmlsbGluZ01vZGUsXG4gIFByb2plY3Rpb25UeXBlLFxuICBTdHJlYW1WaWV3VHlwZSxcbiAgVGFibGUsXG59IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGJcIjtcbmltcG9ydCB7IE1hbmFnZWRQb2xpY3ksIFJvbGUsIFNlcnZpY2VQcmluY2lwYWwgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWlhbVwiO1xuXG5leHBvcnQgY2xhc3MgQWNtc1NoYXJlZFN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICAvLyBwdWJsaWMgcmVhZG9ubHkgYWNtc0RhdGFiYXNlOiBUYWJsZTtcbiAgLy8gcHVibGljIHJlYWRvbmx5IGFjbXNHcmFwaHFsQXBpOiBhcHBzeW5jLkdyYXBocWxBcGk7XG4gIC8vIHB1YmxpYyByZWFkb25seSBhY21zVGFibGVEYXRhc291cmNlOiBhcHBzeW5jLkRhdGFTb3VyY2VPcHRpb25zO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLyoqXG4gICAgICogVXNlclBvb2wgYW5kIFVzZXJQb29sIENsaWVudFxuICAgICAqL1xuICAgIC8vIGNvbnN0IHVzZXJQb29sOiBVc2VyUG9vbCA9IG5ldyBjb2duaXRvLlVzZXJQb29sKFxuICAgIC8vICAgdGhpcyxcbiAgICAvLyAgIFwiQUNNU0NvZ25pdG9Vc2VyUG9vbFwiLFxuICAgIC8vICAge1xuICAgIC8vICAgICBzZWxmU2lnblVwRW5hYmxlZDogdHJ1ZSxcbiAgICAvLyAgICAgYWNjb3VudFJlY292ZXJ5OiBjb2duaXRvLkFjY291bnRSZWNvdmVyeS5QSE9ORV9BTkRfRU1BSUwsXG4gICAgLy8gICAgIHVzZXJWZXJpZmljYXRpb246IHtcbiAgICAvLyAgICAgICBlbWFpbFN0eWxlOiBjb2duaXRvLlZlcmlmaWNhdGlvbkVtYWlsU3R5bGUuQ09ERSxcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAgYXV0b1ZlcmlmeToge1xuICAgIC8vICAgICAgIGVtYWlsOiB0cnVlLFxuICAgIC8vICAgICB9LFxuICAgIC8vICAgICBzdGFuZGFyZEF0dHJpYnV0ZXM6IHtcbiAgICAvLyAgICAgICBlbWFpbDoge1xuICAgIC8vICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgLy8gICAgICAgICBtdXRhYmxlOiB0cnVlLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICB9XG4gICAgLy8gKTtcbiAgICAvLyBjb25zdCBkeW5hbW9EQlJvbGUgPSBuZXcgUm9sZSh0aGlzLCBcIkR5bmFtb0RCUm9sZVwiLCB7XG4gICAgLy8gICBhc3N1bWVkQnk6IG5ldyBTZXJ2aWNlUHJpbmNpcGFsKFwiYXBwc3luYy5hbWF6b25hd3MuY29tXCIpLFxuICAgIC8vIH0pO1xuXG4gICAgLy8gZHluYW1vREJSb2xlLmFkZE1hbmFnZWRQb2xpY3koXG4gICAgLy8gICBNYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZShcIkFtYXpvbkR5bmFtb0RCRnVsbEFjY2Vzc1wiKVxuICAgIC8vICk7XG5cbiAgICAvLyBjb25zdCB1c2VyUG9vbENsaWVudDogVXNlclBvb2xDbGllbnQgPSBuZXcgY29nbml0by5Vc2VyUG9vbENsaWVudChcbiAgICAvLyAgIHRoaXMsXG4gICAgLy8gICBcIkFDTVNVc2VyUG9vbENsaWVudFwiLFxuICAgIC8vICAge1xuICAgIC8vICAgICB1c2VyUG9vbCxcbiAgICAvLyAgIH1cbiAgICAvLyApO1xuXG4gICAgLy8gLyoqXG4gICAgLy8gICogQ2xvdWRXYXRjaCBSb2xlXG4gICAgLy8gICovXG4gICAgLy8gLy8gZ2l2ZSBhcHBzeW5jIHBlcm1pc3Npb24gdG8gbG9nIHRvIGNsb3Vkd2F0Y2ggYnkgYXNzaWduaW5nIGEgcm9sZVxuXG4gICAgLy8gY29uc3QgY2xvdWRXYXRjaFJvbGUgPSBuZXcgaWFtLlJvbGUodGhpcywgXCJhcHBTeW5jQ2xvdWRXYXRjaExvZ3NcIiwge1xuICAgIC8vICAgYXNzdW1lZEJ5OiBuZXcgaWFtLlNlcnZpY2VQcmluY2lwYWwoXCJhcHBzeW5jLmFtYXpvbmF3cy5jb21cIiksXG4gICAgLy8gfSk7XG5cbiAgICAvLyBjbG91ZFdhdGNoUm9sZS5hZGRNYW5hZ2VkUG9saWN5KFxuICAgIC8vICAgaWFtLk1hbmFnZWRQb2xpY3kuZnJvbUF3c01hbmFnZWRQb2xpY3lOYW1lKFxuICAgIC8vICAgICBcInNlcnZpY2Utcm9sZS9BV1NBcHBTeW5jUHVzaFRvQ2xvdWRXYXRjaExvZ3NcIlxuICAgIC8vICAgKVxuICAgIC8vICk7XG5cbiAgICAvLyAvKipcbiAgICAvLyAgKiBHcmFwaFFMIEFQSVxuICAgIC8vICAqL1xuICAgIC8vIHRoaXMuYWNtc0dyYXBocWxBcGkgPSBuZXcgYXBwc3luYy5HcmFwaHFsQXBpKHRoaXMsIFwiQXBpXCIsIHtcbiAgICAvLyAgIG5hbWU6IFwiYXBhcnRtZW50LWNvbXBsZXgtbWFuYWdlbWVudFwiLFxuICAgIC8vICAgc2NoZW1hOiBhcHBzeW5jLlNjaGVtYUZpbGUuZnJvbUFzc2V0KFwic2NoZW1hL3NjaGVtYS5ncmFwaHFsXCIpLFxuICAgIC8vICAgYXV0aG9yaXphdGlvbkNvbmZpZzoge1xuICAgIC8vICAgICBkZWZhdWx0QXV0aG9yaXphdGlvbjoge1xuICAgIC8vICAgICAgIGF1dGhvcml6YXRpb25UeXBlOiBhcHBzeW5jLkF1dGhvcml6YXRpb25UeXBlLkFQSV9LRVksXG4gICAgLy8gICAgIH0sXG5cbiAgICAvLyAgICAgYWRkaXRpb25hbEF1dGhvcml6YXRpb25Nb2RlczogW1xuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIGF1dGhvcml6YXRpb25UeXBlOiBhcHBzeW5jLkF1dGhvcml6YXRpb25UeXBlLlVTRVJfUE9PTCxcbiAgICAvLyAgICAgICAgIHVzZXJQb29sQ29uZmlnOiB7XG4gICAgLy8gICAgICAgICAgIHVzZXJQb29sLFxuICAgIC8vICAgICAgICAgfSxcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICBdLFxuICAgIC8vICAgfSxcbiAgICAvLyAgIHhyYXlFbmFibGVkOiB0cnVlLFxuICAgIC8vICAgbG9nQ29uZmlnOiB7XG4gICAgLy8gICAgIGZpZWxkTG9nTGV2ZWw6IGFwcHN5bmMuRmllbGRMb2dMZXZlbC5BTEwsXG4gICAgLy8gICB9LFxuICAgIC8vIH0pO1xuXG4gICAgLy8gLy8gICBkZWZpbml0aW9uOiByZWFkRmlsZVN5bmMoXCIuL3NjaGVtYS9zY2hlbWEuZ3JhcGhxbFwiKS50b1N0cmluZygpLFxuICAgIC8vIC8vIH0pO1xuXG4gICAgLy8gLyoqXG4gICAgLy8gICogRGF0YWJhc2VcbiAgICAvLyAgKi9cblxuICAgIC8vIHRoaXMuYWNtc0RhdGFiYXNlID0gbmV3IFRhYmxlKHRoaXMsIFwiQUNNU0R5bmFtb0RiVGFibGVcIiwge1xuICAgIC8vICAgdGFibGVOYW1lOiBcIkFjbXNEeW5hbW9EQlRhYmxlXCIsXG5cbiAgICAvLyAgIHBhcnRpdGlvbktleToge1xuICAgIC8vICAgICBuYW1lOiBcIlBLXCIsXG4gICAgLy8gICAgIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HLFxuICAgIC8vICAgfSxcbiAgICAvLyAgIHNvcnRLZXk6IHtcbiAgICAvLyAgICAgbmFtZTogXCJTS1wiLFxuICAgIC8vICAgICB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyxcbiAgICAvLyAgIH0sXG5cbiAgICAvLyAgIGJpbGxpbmdNb2RlOiBCaWxsaW5nTW9kZS5QQVlfUEVSX1JFUVVFU1QsXG4gICAgLy8gICBzdHJlYW06IFN0cmVhbVZpZXdUeXBlLk5FV19JTUFHRSxcblxuICAgIC8vICAgcmVtb3ZhbFBvbGljeTogUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxuICAgIC8vIH0pO1xuXG4gICAgLy8gdGhpcy5hY21zRGF0YWJhc2UuYWRkR2xvYmFsU2Vjb25kYXJ5SW5kZXgoe1xuICAgIC8vICAgaW5kZXhOYW1lOiBcImdldEFsbEFwYXJ0bWVudHNQZXJVc2VyXCIsXG4gICAgLy8gICBwYXJ0aXRpb25LZXk6IHtcbiAgICAvLyAgICAgbmFtZTogXCJHU0kxUEtcIixcbiAgICAvLyAgICAgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcsXG4gICAgLy8gICB9LFxuICAgIC8vICAgc29ydEtleToge1xuICAgIC8vICAgICBuYW1lOiBcIkdTSTFTS1wiLFxuICAgIC8vICAgICB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyxcbiAgICAvLyAgIH0sXG5cbiAgICAvLyAgIHByb2plY3Rpb25UeXBlOiBQcm9qZWN0aW9uVHlwZS5BTEwsXG4gICAgLy8gfSk7XG5cbiAgICAvLyAvLyB0aGlzLmFjbXNUYWJsZURhdGFzb3VyY2UgPSB0aGlzLmFjbXNHcmFwaHFsQXBpLmFkZER5bmFtb0RiRGF0YVNvdXJjZSgncG9zdERhdGFTb3VyY2UnLCB0aGlzLmFjbXNEYXRhYmFzZSk7XG5cblxuICAgIC8vIC8qKlxuICAgIC8vICAqIE91dHB1dHNcbiAgICAvLyAgKi9cblxuICAgIC8vIG5ldyBDZm5PdXRwdXQodGhpcywgXCJVc2VyUG9vbElkXCIsIHtcbiAgICAvLyAgIHZhbHVlOiB1c2VyUG9vbC51c2VyUG9vbElkLFxuICAgIC8vIH0pO1xuICAgIC8vIG5ldyBDZm5PdXRwdXQodGhpcywgXCJVc2VyUG9vbENsaWVudElkXCIsIHtcbiAgICAvLyAgIHZhbHVlOiB1c2VyUG9vbENsaWVudC51c2VyUG9vbENsaWVudElkLFxuICAgIC8vIH0pO1xuXG4gICAgLy8gbmV3IENmbk91dHB1dCh0aGlzLCBcIkdyYXBoUUxBUEkgSURcIiwge1xuICAgIC8vICAgdmFsdWU6IHRoaXMuYWNtc0dyYXBocWxBcGkuYXBpSWQhLFxuICAgIC8vIH0pO1xuXG4gICAgLy8gbmV3IENmbk91dHB1dCh0aGlzLCBcIkdyYXBoUUxBUEkgVVJMXCIsIHtcbiAgICAvLyAgIHZhbHVlOiB0aGlzLmFjbXNHcmFwaHFsQXBpLmdyYXBocWxVcmwsXG4gICAgLy8gfSk7XG4gIH1cbn1cbiJdfQ==