"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcmsSharedStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const cognito = require("aws-cdk-lib/aws-cognito");
const appsync = require("aws-cdk-lib/aws-appsync");
const aws_dynamodb_1 = require("aws-cdk-lib/aws-dynamodb");
const fs_1 = require("fs");
class AcmsSharedStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        /**
         * UserPool and UserPool Client
         */
        const userPool = new cognito.UserPool(this, "ACMSCognitoUserPool", {
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
        });
        const userPoolClient = new cognito.UserPoolClient(this, "ACMSUserPoolClient", {
            userPool,
        });
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
            definition: (0, fs_1.readFileSync)("./schema/schema.graphql").toString(),
        });
        /**
         * Database
         */
        this.acmsDatabase = new aws_dynamodb_1.Table(this, "ACMSDynamoDbTable", {
            tableName: "AcmsDynamoDBDatabaseTable",
            partitionKey: {
                name: "PK",
                type: aws_dynamodb_1.AttributeType.STRING,
            },
            sortKey: {
                name: "SK",
                type: aws_dynamodb_1.AttributeType.STRING,
            },
            billingMode: aws_dynamodb_1.BillingMode.PAY_PER_REQUEST,
            stream: aws_dynamodb_1.StreamViewType.NEW_IMAGE,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
        });
        this.acmsDatabase.addGlobalSecondaryIndex({
            indexName: "getAllApartmentsPerUser",
            partitionKey: {
                name: "GSI1PK",
                type: aws_dynamodb_1.AttributeType.STRING,
            },
            sortKey: {
                name: "GSI1SK",
                type: aws_dynamodb_1.AttributeType.STRING,
            },
            projectionType: aws_dynamodb_1.ProjectionType.ALL,
        });
        /**
         * Outputs
         */
        new aws_cdk_lib_1.CfnOutput(this, "UserPoolId", {
            value: userPool.userPoolId,
        });
        new aws_cdk_lib_1.CfnOutput(this, "UserPoolClientId", {
            value: userPoolClient.userPoolClientId,
        });
        new aws_cdk_lib_1.CfnOutput(this, "GraphQLAPI ID", {
            value: this.acmsGraphqlApi.apiId,
        });
        new aws_cdk_lib_1.CfnOutput(this, "GraphQLAPI URL", {
            value: this.acmsGraphqlApi.graphqlUrl,
        });
    }
}
exports.AcmsSharedStack = AcmsSharedStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNtcy1zaGFyZWQtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY21zLXNoYXJlZC1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBMEU7QUFFMUUsbURBQW1EO0FBRW5ELG1EQUFtRDtBQUNuRCwyREFNa0M7QUFDbEMsMkJBQWtDO0FBRWxDLE1BQWEsZUFBZ0IsU0FBUSxtQkFBSztJQUt4QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCOztXQUVHO1FBQ0gsTUFBTSxRQUFRLEdBQWEsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUM3QyxJQUFJLEVBQ0oscUJBQXFCLEVBQ3JCO1lBQ0UsaUJBQWlCLEVBQUUsSUFBSTtZQUN2QixlQUFlLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxlQUFlO1lBQ3hELGdCQUFnQixFQUFFO2dCQUNoQixVQUFVLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixDQUFDLElBQUk7YUFDaEQ7WUFDRCxVQUFVLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLElBQUk7YUFDWjtZQUNELGtCQUFrQixFQUFFO2dCQUNsQixLQUFLLEVBQUU7b0JBQ0wsUUFBUSxFQUFFLElBQUk7b0JBQ2QsT0FBTyxFQUFFLElBQUk7aUJBQ2Q7YUFDRjtTQUNGLENBQ0YsQ0FBQztRQUVGLE1BQU0sY0FBYyxHQUFtQixJQUFJLE9BQU8sQ0FBQyxjQUFjLENBQy9ELElBQUksRUFDSixvQkFBb0IsRUFDcEI7WUFDRSxRQUFRO1NBQ1QsQ0FDRixDQUFDO1FBRUY7O1dBRUc7UUFDSCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFO1lBQ3hELElBQUksRUFBRSw4QkFBOEI7WUFDcEMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLHVCQUF1QixDQUFDO1lBQzdELG1CQUFtQixFQUFFO2dCQUNuQixvQkFBb0IsRUFBRTtvQkFDcEIsaUJBQWlCLEVBQUUsT0FBTyxDQUFDLGlCQUFpQixDQUFDLE9BQU87aUJBQ3JEO2dCQUVELDRCQUE0QixFQUFFO29CQUM1Qjt3QkFDRSxpQkFBaUIsRUFBRSxPQUFPLENBQUMsaUJBQWlCLENBQUMsU0FBUzt3QkFDdEQsY0FBYyxFQUFFOzRCQUNkLFFBQVE7eUJBQ1Q7cUJBQ0Y7aUJBQ0Y7YUFDRjtZQUNELFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFNBQVMsRUFBRTtnQkFDVCxhQUFhLEVBQUUsT0FBTyxDQUFDLGFBQWEsQ0FBQyxHQUFHO2FBQ3pDO1NBQ0YsQ0FBQyxDQUFDO1FBRUg7O1dBRUc7UUFFSCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksT0FBTyxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxzQkFBc0IsRUFBRTtZQUMxRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLO1lBQ2hDLFVBQVUsRUFBRSxJQUFBLGlCQUFZLEVBQUMseUJBQXlCLENBQUMsQ0FBQyxRQUFRLEVBQUU7U0FDL0QsQ0FBQyxDQUFDO1FBRUg7O1dBRUc7UUFFSCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksb0JBQUssQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUU7WUFDdkQsU0FBUyxFQUFFLDJCQUEyQjtZQUV0QyxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLDRCQUFhLENBQUMsTUFBTTthQUMzQjtZQUNELE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUsSUFBSTtnQkFDVixJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNO2FBQzNCO1lBRUQsV0FBVyxFQUFFLDBCQUFXLENBQUMsZUFBZTtZQUN4QyxNQUFNLEVBQUUsNkJBQWMsQ0FBQyxTQUFTO1lBRWhDLGFBQWEsRUFBRSwyQkFBYSxDQUFDLE9BQU87U0FDckMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFlBQVksQ0FBQyx1QkFBdUIsQ0FBQztZQUN4QyxTQUFTLEVBQUUseUJBQXlCO1lBQ3BDLFlBQVksRUFBRTtnQkFDWixJQUFJLEVBQUUsUUFBUTtnQkFDZCxJQUFJLEVBQUUsNEJBQWEsQ0FBQyxNQUFNO2FBQzNCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRSw0QkFBYSxDQUFDLE1BQU07YUFDM0I7WUFFRCxjQUFjLEVBQUUsNkJBQWMsQ0FBQyxHQUFHO1NBQ25DLENBQUMsQ0FBQztRQUdIOztXQUVHO1FBRUgsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDaEMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxVQUFVO1NBQzNCLENBQUMsQ0FBQztRQUNILElBQUksdUJBQVMsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDdEMsS0FBSyxFQUFFLGNBQWMsQ0FBQyxnQkFBZ0I7U0FDdkMsQ0FBQyxDQUFDO1FBRUgsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDbkMsS0FBSyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBTTtTQUNsQyxDQUFDLENBQUM7UUFFSCxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ3BDLEtBQUssRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLFVBQVU7U0FDdEMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBbklELDBDQW1JQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENmbk91dHB1dCwgUmVtb3ZhbFBvbGljeSwgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5pbXBvcnQgKiBhcyBjb2duaXRvIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY29nbml0b1wiO1xuaW1wb3J0IHsgVXNlclBvb2wsIFVzZXJQb29sQ2xpZW50IH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jb2duaXRvXCI7XG5pbXBvcnQgKiBhcyBhcHBzeW5jIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtYXBwc3luY1wiO1xuaW1wb3J0IHtcbiAgQXR0cmlidXRlVHlwZSxcbiAgQmlsbGluZ01vZGUsXG4gIFByb2plY3Rpb25UeXBlLFxuICBTdHJlYW1WaWV3VHlwZSxcbiAgVGFibGUsXG59IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGJcIjtcbmltcG9ydCB7IHJlYWRGaWxlU3luYyB9IGZyb20gXCJmc1wiO1xuXG5leHBvcnQgY2xhc3MgQWNtc1NoYXJlZFN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBwdWJsaWMgcmVhZG9ubHkgYWNtc0RhdGFiYXNlOiBUYWJsZTtcbiAgcHVibGljIHJlYWRvbmx5IGFjbXNHcmFwaHFsQXBpOiBhcHBzeW5jLkdyYXBocWxBcGk7XG4gIHB1YmxpYyByZWFkb25seSBhcGlTY2hlbWE6IGFwcHN5bmMuQ2ZuR3JhcGhRTFNjaGVtYTtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8qKlxuICAgICAqIFVzZXJQb29sIGFuZCBVc2VyUG9vbCBDbGllbnRcbiAgICAgKi9cbiAgICBjb25zdCB1c2VyUG9vbDogVXNlclBvb2wgPSBuZXcgY29nbml0by5Vc2VyUG9vbChcbiAgICAgIHRoaXMsXG4gICAgICBcIkFDTVNDb2duaXRvVXNlclBvb2xcIixcbiAgICAgIHtcbiAgICAgICAgc2VsZlNpZ25VcEVuYWJsZWQ6IHRydWUsXG4gICAgICAgIGFjY291bnRSZWNvdmVyeTogY29nbml0by5BY2NvdW50UmVjb3ZlcnkuUEhPTkVfQU5EX0VNQUlMLFxuICAgICAgICB1c2VyVmVyaWZpY2F0aW9uOiB7XG4gICAgICAgICAgZW1haWxTdHlsZTogY29nbml0by5WZXJpZmljYXRpb25FbWFpbFN0eWxlLkNPREUsXG4gICAgICAgIH0sXG4gICAgICAgIGF1dG9WZXJpZnk6IHtcbiAgICAgICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgc3RhbmRhcmRBdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgZW1haWw6IHtcbiAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgbXV0YWJsZTogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfVxuICAgICk7XG5cbiAgICBjb25zdCB1c2VyUG9vbENsaWVudDogVXNlclBvb2xDbGllbnQgPSBuZXcgY29nbml0by5Vc2VyUG9vbENsaWVudChcbiAgICAgIHRoaXMsXG4gICAgICBcIkFDTVNVc2VyUG9vbENsaWVudFwiLFxuICAgICAge1xuICAgICAgICB1c2VyUG9vbCxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgLyoqXG4gICAgICogR3JhcGhRTCBBUElcbiAgICAgKi9cbiAgICB0aGlzLmFjbXNHcmFwaHFsQXBpID0gbmV3IGFwcHN5bmMuR3JhcGhxbEFwaSh0aGlzLCBcIkFwaVwiLCB7XG4gICAgICBuYW1lOiBcImFwYXJ0bWVudC1jb21wbGV4LW1hbmFnZW1lbnRcIixcbiAgICAgIHNjaGVtYTogYXBwc3luYy5TY2hlbWFGaWxlLmZyb21Bc3NldChcInNjaGVtYS9zY2hlbWEuZ3JhcGhxbFwiKSxcbiAgICAgIGF1dGhvcml6YXRpb25Db25maWc6IHtcbiAgICAgICAgZGVmYXVsdEF1dGhvcml6YXRpb246IHtcbiAgICAgICAgICBhdXRob3JpemF0aW9uVHlwZTogYXBwc3luYy5BdXRob3JpemF0aW9uVHlwZS5BUElfS0VZLFxuICAgICAgICB9LFxuXG4gICAgICAgIGFkZGl0aW9uYWxBdXRob3JpemF0aW9uTW9kZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhdXRob3JpemF0aW9uVHlwZTogYXBwc3luYy5BdXRob3JpemF0aW9uVHlwZS5VU0VSX1BPT0wsXG4gICAgICAgICAgICB1c2VyUG9vbENvbmZpZzoge1xuICAgICAgICAgICAgICB1c2VyUG9vbCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB4cmF5RW5hYmxlZDogdHJ1ZSxcbiAgICAgIGxvZ0NvbmZpZzoge1xuICAgICAgICBmaWVsZExvZ0xldmVsOiBhcHBzeW5jLkZpZWxkTG9nTGV2ZWwuQUxMLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEdyYXBocWwgU2NoZW1hXG4gICAgICovXG5cbiAgICB0aGlzLmFwaVNjaGVtYSA9IG5ldyBhcHBzeW5jLkNmbkdyYXBoUUxTY2hlbWEodGhpcywgXCJBQ01TR3JhcGhxbEFwaVNjaGVtYVwiLCB7XG4gICAgICBhcGlJZDogdGhpcy5hY21zR3JhcGhxbEFwaS5hcGlJZCxcbiAgICAgIGRlZmluaXRpb246IHJlYWRGaWxlU3luYyhcIi4vc2NoZW1hL3NjaGVtYS5ncmFwaHFsXCIpLnRvU3RyaW5nKCksXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBEYXRhYmFzZVxuICAgICAqL1xuXG4gICAgdGhpcy5hY21zRGF0YWJhc2UgPSBuZXcgVGFibGUodGhpcywgXCJBQ01TRHluYW1vRGJUYWJsZVwiLCB7XG4gICAgICB0YWJsZU5hbWU6IFwiQWNtc0R5bmFtb0RCRGF0YWJhc2VUYWJsZVwiLFxuXG4gICAgICBwYXJ0aXRpb25LZXk6IHtcbiAgICAgICAgbmFtZTogXCJQS1wiLFxuICAgICAgICB0eXBlOiBBdHRyaWJ1dGVUeXBlLlNUUklORyxcbiAgICAgIH0sXG4gICAgICBzb3J0S2V5OiB7XG4gICAgICAgIG5hbWU6IFwiU0tcIixcbiAgICAgICAgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcsXG4gICAgICB9LFxuXG4gICAgICBiaWxsaW5nTW9kZTogQmlsbGluZ01vZGUuUEFZX1BFUl9SRVFVRVNULFxuICAgICAgc3RyZWFtOiBTdHJlYW1WaWV3VHlwZS5ORVdfSU1BR0UsXG5cbiAgICAgIHJlbW92YWxQb2xpY3k6IFJlbW92YWxQb2xpY3kuREVTVFJPWSxcbiAgICB9KTtcblxuICAgIHRoaXMuYWNtc0RhdGFiYXNlLmFkZEdsb2JhbFNlY29uZGFyeUluZGV4KHtcbiAgICAgIGluZGV4TmFtZTogXCJnZXRBbGxBcGFydG1lbnRzUGVyVXNlclwiLFxuICAgICAgcGFydGl0aW9uS2V5OiB7XG4gICAgICAgIG5hbWU6IFwiR1NJMVBLXCIsXG4gICAgICAgIHR5cGU6IEF0dHJpYnV0ZVR5cGUuU1RSSU5HLFxuICAgICAgfSxcbiAgICAgIHNvcnRLZXk6IHtcbiAgICAgICAgbmFtZTogXCJHU0kxU0tcIixcbiAgICAgICAgdHlwZTogQXR0cmlidXRlVHlwZS5TVFJJTkcsXG4gICAgICB9LFxuXG4gICAgICBwcm9qZWN0aW9uVHlwZTogUHJvamVjdGlvblR5cGUuQUxMLFxuICAgIH0pO1xuXG5cbiAgICAvKipcbiAgICAgKiBPdXRwdXRzXG4gICAgICovXG5cbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsIFwiVXNlclBvb2xJZFwiLCB7XG4gICAgICB2YWx1ZTogdXNlclBvb2wudXNlclBvb2xJZCxcbiAgICB9KTtcbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsIFwiVXNlclBvb2xDbGllbnRJZFwiLCB7XG4gICAgICB2YWx1ZTogdXNlclBvb2xDbGllbnQudXNlclBvb2xDbGllbnRJZCxcbiAgICB9KTtcblxuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgXCJHcmFwaFFMQVBJIElEXCIsIHtcbiAgICAgIHZhbHVlOiB0aGlzLmFjbXNHcmFwaHFsQXBpLmFwaUlkISxcbiAgICB9KTtcblxuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgXCJHcmFwaFFMQVBJIFVSTFwiLCB7XG4gICAgICB2YWx1ZTogdGhpcy5hY21zR3JhcGhxbEFwaS5ncmFwaHFsVXJsLFxuICAgIH0pO1xuICB9XG59XG4iXX0=