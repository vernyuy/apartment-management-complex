"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingLamdaStacks = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const aws_appsync_1 = require("aws-cdk-lib/aws-appsync");
const signer = require("aws-cdk-lib/aws-signer");
const aws_iam_1 = require("aws-cdk-lib/aws-iam");
const lambda = require("aws-cdk-lib/aws-lambda");
const path = require("path");
const aws_lambda_nodejs_1 = require("aws-cdk-lib/aws-lambda-nodejs");
const sqs = require("aws-cdk-lib/aws-sqs");
const aws_lambda_1 = require("aws-cdk-lib/aws-lambda");
const aws_cdk_lib_2 = require("aws-cdk-lib");
const fs_1 = require("fs");
class BookingLamdaStacks extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const { acmsDatabase, acmsGraphqlApi, apiSchema, acmsTableDatasource } = props;
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
        const policyStatement = new aws_cdk_lib_2.aws_iam.PolicyStatement({
            effect: aws_cdk_lib_2.aws_iam.Effect.ALLOW,
            actions: ["cloudwatch:PutMetricData"],
            resources: ["*"],
        });
        const signingProfile = new signer.SigningProfile(this, "SigningProfile", {
            platform: signer.Platform.AWS_LAMBDA_SHA384_ECDSA,
        });
        const codeSigningConfig = new lambda.CodeSigningConfig(this, "CodeSigningConfig", {
            signingProfiles: [signingProfile],
        });
        /**
         *
         * IAM role for Queue Lambda function
         */
        const lambdaQueueRole = new aws_iam_1.Role(this, "QueueConsumerFunctionRole", {
            assumedBy: new aws_iam_1.ServicePrincipal("lambda.amazonaws.com"),
            managedPolicies: [
                aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaSQSQueueExecutionRole"),
                aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName("AWSLambda_FullAccess"),
                aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSAppSyncPushToCloudWatchLogs"),
            ],
        });
        /**
         *
         * IAM role for Queue Lambda function
         */
        const lambdaRole = new aws_iam_1.Role(this, "LmbdaFunctionRole", {
            assumedBy: new aws_iam_1.ServicePrincipal("lambda.amazonaws.com"),
            managedPolicies: [
                aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName("AWSLambda_FullAccess"),
                aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSAppSyncPushToCloudWatchLogs"),
            ],
        });
        /**
         * booking function
         */
        const bookingLambda = new aws_lambda_nodejs_1.NodejsFunction(this, "AcmsBookingHandler", {
            tracing: aws_lambda_1.Tracing.ACTIVE,
            codeSigningConfig,
            runtime: lambda.Runtime.NODEJS_16_X,
            handler: "handler",
            entry: path.join(__dirname, "lambda-fns/booking", "app.ts"),
            initialPolicy: [policyStatement],
            role: lambdaRole,
            memorySize: 1024,
        });
        /**
         * Process SQS Messages Lambda
         */
        const processSQSLambda = new aws_lambda_nodejs_1.NodejsFunction(this, "ProcessSqSBookingHandler", {
            tracing: aws_lambda_1.Tracing.ACTIVE,
            codeSigningConfig,
            runtime: lambda.Runtime.NODEJS_16_X,
            handler: "handler",
            entry: path.join(__dirname, "lambda-fns/booking", "processSqsBooking.ts"),
            initialPolicy: [policyStatement],
            role: lambdaQueueRole,
            memorySize: 1024,
        });
        /**
         * lambda to sqs
         */
        const eventSourceMapping = new lambda.EventSourceMapping(this, "QueueConsumerFunctionBookingEvent", {
            target: processSQSLambda,
            batchSize: 10,
            eventSourceArn: queue.queueArn,
            reportBatchItemFailures: true,
        });
        const appsyncLambdaRole = new aws_iam_1.Role(this, "LambdaRole", {
            assumedBy: new aws_iam_1.ServicePrincipal("appsync.amazonaws.com"),
            managedPolicies: [
                aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName("service-role/AWSLambdaSQSQueueExecutionRole"),
                aws_iam_1.ManagedPolicy.fromAwsManagedPolicyName("AWSLambda_FullAccess"),
            ],
        });
        const lambdaDataSources = new aws_appsync_1.CfnDataSource(this, "ACMSBookingLambdaDatasource", {
            apiId: acmsGraphqlApi.attrApiId,
            name: "ACMSBookingLambdaDatasource",
            type: "AWS_LAMBDA",
            lambdaConfig: {
                lambdaFunctionArn: bookingLambda.functionArn,
            },
            serviceRoleArn: appsyncLambdaRole.roleArn,
        });
        const createApartmentBookingResolver = new aws_appsync_1.CfnResolver(this, "createApartmentBookingResolver", {
            apiId: acmsGraphqlApi.attrApiId,
            typeName: "Mutation",
            fieldName: "createApartmentBooking",
            dataSourceName: lambdaDataSources.attrName,
        });
        const getAllBookingsByApartmentFunction = new aws_appsync_1.CfnFunctionConfiguration(this, "getAllBookingsFunction", {
            apiId: acmsGraphqlApi.attrApiId,
            dataSourceName: acmsTableDatasource.name,
            requestMappingTemplate: (0, fs_1.readFileSync)("./lib/vtl_templates/get_all_bookings_per_apartment_request.vtl").toString(),
            responseMappingTemplate: (0, fs_1.readFileSync)("./lib/vtl_templates/get_all_bookings_per_apartment_response.vtl").toString(),
            functionVersion: "2018-05-29",
            name: "getAllBookingsFunction",
        });
        const getUserPerBookingsFunction = new aws_appsync_1.CfnFunctionConfiguration(this, "getUserPerBookingFunction", {
            apiId: acmsGraphqlApi.attrApiId,
            dataSourceName: acmsTableDatasource.name,
            requestMappingTemplate: (0, fs_1.readFileSync)("./lib/vtl_templates/get_user_per_booking_request.vtl").toString(),
            responseMappingTemplate: (0, fs_1.readFileSync)("./lib/vtl_templates/get_user_per_booking_response.vtl").toString(),
            functionVersion: "2018-05-29",
            name: "getUserPerBookingFunction",
        });
        const getResultBookingPerApartmentResolver = new aws_appsync_1.CfnResolver(this, "getResultBookingPerApartmentResolver", {
            apiId: acmsGraphqlApi.attrApiId,
            typeName: "Query",
            fieldName: "getAllBookingsPerApartment",
            kind: "PIPELINE",
            pipelineConfig: {
                functions: [
                    getAllBookingsByApartmentFunction.attrFunctionId,
                    getUserPerBookingsFunction.attrFunctionId,
                ],
            },
            requestMappingTemplate: (0, fs_1.readFileSync)("./lib/vtl_templates/before_mapping_template.vtl").toString(),
            responseMappingTemplate: (0, fs_1.readFileSync)("./lib/vtl_templates/after_mapping_template.vtl").toString(),
        });
        createApartmentBookingResolver.addDependsOn(apiSchema);
        getResultBookingPerApartmentResolver.addDependsOn(apiSchema);
        acmsDatabase.grantWriteData(processSQSLambda);
        acmsDatabase.grantReadData(bookingLambda);
        queue.grantSendMessages(bookingLambda);
        queue.grantConsumeMessages(processSQSLambda);
        bookingLambda.addEnvironment("ACMS_DB", acmsDatabase.tableName);
        bookingLambda.addEnvironment("BOOKING_QUEUE_URL", queue.queueUrl);
        new aws_cdk_lib_1.CfnOutput(this, "SQSqueueName", {
            value: queue.queueName,
            description: "SQS queue name",
        });
        new aws_cdk_lib_1.CfnOutput(this, "SQSqueueARN", {
            value: queue.queueArn,
            description: "SQS queue ARN",
        });
        new aws_cdk_lib_1.CfnOutput(this, "SQSqueueURL", {
            value: queue.queueUrl,
            description: "SQS queue URL",
        });
    }
}
exports.BookingLamdaStacks = BookingLamdaStacks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm9va2luZy1sYW1iZGEtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJib29raW5nLWxhbWJkYS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBMkQ7QUFDM0QseURBTWlDO0FBQ2pDLGlEQUFpRDtBQUVqRCxpREFBNEU7QUFDNUUsaURBQWlEO0FBRWpELDZCQUE2QjtBQUM3QixxRUFBK0Q7QUFDL0QsMkNBQTJDO0FBQzNDLHVEQUFpRDtBQUNqRCw2Q0FBc0M7QUFDdEMsMkJBQWtDO0FBVWxDLE1BQWEsa0JBQW1CLFNBQVEsbUJBQUs7SUFDM0MsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUE4QjtRQUN0RSxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4QixNQUFNLEVBQUUsWUFBWSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsbUJBQW1CLEVBQUUsR0FDcEUsS0FBSyxDQUFDO1FBQ1I7O1dBRUc7UUFFSCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDbkQsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDaEQsZUFBZSxFQUFFO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLGVBQWUsRUFBRSxFQUFFO2FBQ3BCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsTUFBTSxlQUFlLEdBQUcsSUFBSSxxQkFBTyxDQUFDLGVBQWUsQ0FBQztZQUNsRCxNQUFNLEVBQUUscUJBQU8sQ0FBQyxNQUFNLENBQUMsS0FBSztZQUM1QixPQUFPLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQztZQUNyQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDakIsQ0FBQyxDQUFDO1FBRUgsTUFBTSxjQUFjLEdBQUcsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFD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QUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVsRSxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUNsQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFNBQVM7WUFDdEIsV0FBVyxFQUFFLGdCQUFnQjtTQUM5QixDQUFDLENBQUM7UUFFSCxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBRTtZQUNqQyxLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVE7WUFDckIsV0FBVyxFQUFFLGVBQWU7U0FDN0IsQ0FBQyxDQUFDO1FBRUgsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxhQUFhLEVBQUU7WUFDakMsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRO1lBQ3JCLFdBQVcsRUFBRSxlQUFlO1NBQzdCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTlPRCxnREE4T0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZm5PdXRwdXQsIFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQge1xuICBDZm5EYXRhU291cmNlLFxuICBDZm5GdW5jdGlvbkNvbmZpZ3VyYXRpb24sXG4gIENmbkdyYXBoUUxBcGksXG4gIENmbkdyYXBoUUxTY2hlbWEsXG4gIENmblJlc29sdmVyLFxufSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWFwcHN5bmNcIjtcbmltcG9ydCAqIGFzIHNpZ25lciBmcm9tIFwiYXdzLWNkay1saWIvYXdzLXNpZ25lclwiO1xuaW1wb3J0IHsgVGFibGUgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWR5bmFtb2RiXCI7XG5pbXBvcnQgeyBNYW5hZ2VkUG9saWN5LCBSb2xlLCBTZXJ2aWNlUHJpbmNpcGFsIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1pYW1cIjtcbmltcG9ydCAqIGFzIGxhbWJkYSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmltcG9ydCB7IE5vZGVqc0Z1bmN0aW9uIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1sYW1iZGEtbm9kZWpzXCI7XG5pbXBvcnQgKiBhcyBzcXMgZnJvbSBcImF3cy1jZGstbGliL2F3cy1zcXNcIjtcbmltcG9ydCB7IFRyYWNpbmcgfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWxhbWJkYVwiO1xuaW1wb3J0IHsgYXdzX2lhbSB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0IHsgcmVhZEZpbGVTeW5jIH0gZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBTcXNEZXN0aW5hdGlvbiB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtbGFtYmRhLWRlc3RpbmF0aW9uc1wiO1xuXG5pbnRlcmZhY2UgQm9va2luZ0xhbWJkYVN0YWNrUHJvcHMgZXh0ZW5kcyBTdGFja1Byb3BzIHtcbiAgYWNtc0dyYXBocWxBcGk6IENmbkdyYXBoUUxBcGk7XG4gIGFwaVNjaGVtYTogQ2ZuR3JhcGhRTFNjaGVtYTtcbiAgYWNtc0RhdGFiYXNlOiBUYWJsZTtcbiAgYWNtc1RhYmxlRGF0YXNvdXJjZTogQ2ZuRGF0YVNvdXJjZTtcbn1cblxuZXhwb3J0IGNsYXNzIEJvb2tpbmdMYW1kYVN0YWNrcyBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IEJvb2tpbmdMYW1iZGFTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCB7IGFjbXNEYXRhYmFzZSwgYWNtc0dyYXBocWxBcGksIGFwaVNjaGVtYSwgYWNtc1RhYmxlRGF0YXNvdXJjZSB9ID1cbiAgICAgIHByb3BzO1xuICAgIC8qKlxuICAgICAqIENyZWF0ZSBTUVMgUXVldWUgYW5kIERlYWQgbGV0dGVyIFF1ZXVlXG4gICAgICovXG5cbiAgICBjb25zdCBkbHEgPSBuZXcgc3FzLlF1ZXVlKHRoaXMsIFwiRGVhZExldHRlclF1ZXVlXCIpO1xuICAgIGNvbnN0IHF1ZXVlID0gbmV3IHNxcy5RdWV1ZSh0aGlzLCBcImJvb2tpbmdRdWV1ZVwiLCB7XG4gICAgICBkZWFkTGV0dGVyUXVldWU6IHtcbiAgICAgICAgcXVldWU6IGRscSxcbiAgICAgICAgbWF4UmVjZWl2ZUNvdW50OiAxMCxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCBwb2xpY3lTdGF0ZW1lbnQgPSBuZXcgYXdzX2lhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgZWZmZWN0OiBhd3NfaWFtLkVmZmVjdC5BTExPVyxcbiAgICAgIGFjdGlvbnM6IFtcImNsb3Vkd2F0Y2g6UHV0TWV0cmljRGF0YVwiXSxcbiAgICAgIHJlc291cmNlczogW1wiKlwiXSxcbiAgICB9KTtcblxuICAgIGNvbnN0IHNpZ25pbmdQcm9maWxlID0gbmV3IHNpZ25lci5TaWduaW5nUHJvZmlsZSh0aGlzLCBcIlNpZ25pbmdQcm9maWxlXCIsIHtcbiAgICAgIHBsYXRmb3JtOiBzaWduZXIuUGxhdGZvcm0uQVdTX0xBTUJEQV9TSEEzODRfRUNEU0EsXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb2RlU2lnbmluZ0NvbmZpZyA9IG5ldyBsYW1iZGEuQ29kZVNpZ25pbmdDb25maWcoXG4gICAgICB0aGlzLFxuICAgICAgXCJDb2RlU2lnbmluZ0NvbmZpZ1wiLFxuICAgICAge1xuICAgICAgICBzaWduaW5nUHJvZmlsZXM6IFtzaWduaW5nUHJvZmlsZV0sXG4gICAgICB9XG4gICAgKTtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogSUFNIHJvbGUgZm9yIFF1ZXVlIExhbWJkYSBmdW5jdGlvblxuICAgICAqL1xuICAgIGNvbnN0IGxhbWJkYVF1ZXVlUm9sZSA9IG5ldyBSb2xlKHRoaXMsIFwiUXVldWVDb25zdW1lckZ1bmN0aW9uUm9sZVwiLCB7XG4gICAgICBhc3N1bWVkQnk6IG5ldyBTZXJ2aWNlUHJpbmNpcGFsKFwibGFtYmRhLmFtYXpvbmF3cy5jb21cIiksXG4gICAgICBtYW5hZ2VkUG9saWNpZXM6IFtcbiAgICAgICAgTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoXG4gICAgICAgICAgXCJzZXJ2aWNlLXJvbGUvQVdTTGFtYmRhU1FTUXVldWVFeGVjdXRpb25Sb2xlXCJcbiAgICAgICAgKSxcbiAgICAgICAgTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoXCJBV1NMYW1iZGFfRnVsbEFjY2Vzc1wiKSxcbiAgICAgICAgTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoXG4gICAgICAgICAgXCJzZXJ2aWNlLXJvbGUvQVdTQXBwU3luY1B1c2hUb0Nsb3VkV2F0Y2hMb2dzXCJcbiAgICAgICAgKSxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIElBTSByb2xlIGZvciBRdWV1ZSBMYW1iZGEgZnVuY3Rpb25cbiAgICAgKi9cbiAgICBjb25zdCBsYW1iZGFSb2xlID0gbmV3IFJvbGUodGhpcywgXCJMbWJkYUZ1bmN0aW9uUm9sZVwiLCB7XG4gICAgICBhc3N1bWVkQnk6IG5ldyBTZXJ2aWNlUHJpbmNpcGFsKFwibGFtYmRhLmFtYXpvbmF3cy5jb21cIiksXG4gICAgICBtYW5hZ2VkUG9saWNpZXM6IFtcbiAgICAgICAgTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoXCJBV1NMYW1iZGFfRnVsbEFjY2Vzc1wiKSxcbiAgICAgICAgTWFuYWdlZFBvbGljeS5mcm9tQXdzTWFuYWdlZFBvbGljeU5hbWUoXG4gICAgICAgICAgXCJzZXJ2aWNlLXJvbGUvQVdTQXBwU3luY1B1c2hUb0Nsb3VkV2F0Y2hMb2dzXCJcbiAgICAgICAgKSxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBib29raW5nIGZ1bmN0aW9uXG4gICAgICovXG4gICAgY29uc3QgYm9va2luZ0xhbWJkYTogTm9kZWpzRnVuY3Rpb24gPSBuZXcgTm9kZWpzRnVuY3Rpb24oXG4gICAgICB0aGlzLFxuICAgICAgXCJBY21zQm9va2luZ0hhbmRsZXJcIixcbiAgICAgIHtcbiAgICAgICAgdHJhY2luZzogVHJhY2luZy5BQ1RJVkUsXG4gICAgICAgIGNvZGVTaWduaW5nQ29uZmlnLFxuICAgICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTZfWCxcbiAgICAgICAgaGFuZGxlcjogXCJoYW5kbGVyXCIsXG4gICAgICAgIGVudHJ5OiBwYXRoLmpvaW4oX19kaXJuYW1lLCBcImxhbWJkYS1mbnMvYm9va2luZ1wiLCBcImFwcC50c1wiKSxcbiAgICAgICAgaW5pdGlhbFBvbGljeTogW3BvbGljeVN0YXRlbWVudF0sXG4gICAgICAgIHJvbGU6IGxhbWJkYVJvbGUsXG5cbiAgICAgICAgbWVtb3J5U2l6ZTogMTAyNCxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgLyoqXG4gICAgICogUHJvY2VzcyBTUVMgTWVzc2FnZXMgTGFtYmRhXG4gICAgICovXG4gICAgY29uc3QgcHJvY2Vzc1NRU0xhbWJkYTogTm9kZWpzRnVuY3Rpb24gPSBuZXcgTm9kZWpzRnVuY3Rpb24oXG4gICAgICB0aGlzLFxuICAgICAgXCJQcm9jZXNzU3FTQm9va2luZ0hhbmRsZXJcIixcbiAgICAgIHtcbiAgICAgICAgdHJhY2luZzogVHJhY2luZy5BQ1RJVkUsXG4gICAgICAgIGNvZGVTaWduaW5nQ29uZmlnLFxuICAgICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTZfWCxcbiAgICAgICAgaGFuZGxlcjogXCJoYW5kbGVyXCIsXG4gICAgICAgIGVudHJ5OiBwYXRoLmpvaW4oXG4gICAgICAgICAgX19kaXJuYW1lLFxuICAgICAgICAgIFwibGFtYmRhLWZucy9ib29raW5nXCIsXG4gICAgICAgICAgXCJwcm9jZXNzU3FzQm9va2luZy50c1wiXG4gICAgICAgICksXG4gICAgICAgIGluaXRpYWxQb2xpY3k6IFtwb2xpY3lTdGF0ZW1lbnRdLFxuICAgICAgICByb2xlOiBsYW1iZGFRdWV1ZVJvbGUsXG5cbiAgICAgICAgbWVtb3J5U2l6ZTogMTAyNCxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgLyoqXG4gICAgICogbGFtYmRhIHRvIHNxc1xuICAgICAqL1xuXG4gICAgY29uc3QgZXZlbnRTb3VyY2VNYXBwaW5nID0gbmV3IGxhbWJkYS5FdmVudFNvdXJjZU1hcHBpbmcoXG4gICAgICB0aGlzLFxuICAgICAgXCJRdWV1ZUNvbnN1bWVyRnVuY3Rpb25Cb29raW5nRXZlbnRcIixcbiAgICAgIHtcbiAgICAgICAgdGFyZ2V0OiBwcm9jZXNzU1FTTGFtYmRhLFxuICAgICAgICBiYXRjaFNpemU6IDEwLFxuICAgICAgICBldmVudFNvdXJjZUFybjogcXVldWUucXVldWVBcm4sXG4gICAgICAgIHJlcG9ydEJhdGNoSXRlbUZhaWx1cmVzOiB0cnVlLFxuICAgICAgfVxuICAgICk7XG4gICAgY29uc3QgYXBwc3luY0xhbWJkYVJvbGUgPSBuZXcgUm9sZSh0aGlzLCBcIkxhbWJkYVJvbGVcIiwge1xuICAgICAgYXNzdW1lZEJ5OiBuZXcgU2VydmljZVByaW5jaXBhbChcImFwcHN5bmMuYW1hem9uYXdzLmNvbVwiKSxcbiAgICAgIG1hbmFnZWRQb2xpY2llczogW1xuICAgICAgICBNYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZShcbiAgICAgICAgICBcInNlcnZpY2Utcm9sZS9BV1NMYW1iZGFTUVNRdWV1ZUV4ZWN1dGlvblJvbGVcIlxuICAgICAgICApLFxuICAgICAgICBNYW5hZ2VkUG9saWN5LmZyb21Bd3NNYW5hZ2VkUG9saWN5TmFtZShcIkFXU0xhbWJkYV9GdWxsQWNjZXNzXCIpLFxuICAgICAgXSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGxhbWJkYURhdGFTb3VyY2VzOiBDZm5EYXRhU291cmNlID0gbmV3IENmbkRhdGFTb3VyY2UoXG4gICAgICB0aGlzLFxuICAgICAgXCJBQ01TQm9va2luZ0xhbWJkYURhdGFzb3VyY2VcIixcbiAgICAgIHtcbiAgICAgICAgYXBpSWQ6IGFjbXNHcmFwaHFsQXBpLmF0dHJBcGlJZCxcbiAgICAgICAgbmFtZTogXCJBQ01TQm9va2luZ0xhbWJkYURhdGFzb3VyY2VcIixcbiAgICAgICAgdHlwZTogXCJBV1NfTEFNQkRBXCIsXG5cbiAgICAgICAgbGFtYmRhQ29uZmlnOiB7XG4gICAgICAgICAgbGFtYmRhRnVuY3Rpb25Bcm46IGJvb2tpbmdMYW1iZGEuZnVuY3Rpb25Bcm4sXG4gICAgICAgIH0sXG4gICAgICAgIHNlcnZpY2VSb2xlQXJuOiBhcHBzeW5jTGFtYmRhUm9sZS5yb2xlQXJuLFxuICAgICAgfVxuICAgICk7XG5cbiAgICBjb25zdCBjcmVhdGVBcGFydG1lbnRCb29raW5nUmVzb2x2ZXI6IENmblJlc29sdmVyID0gbmV3IENmblJlc29sdmVyKFxuICAgICAgdGhpcyxcbiAgICAgIFwiY3JlYXRlQXBhcnRtZW50Qm9va2luZ1Jlc29sdmVyXCIsXG4gICAgICB7XG4gICAgICAgIGFwaUlkOiBhY21zR3JhcGhxbEFwaS5hdHRyQXBpSWQsXG4gICAgICAgIHR5cGVOYW1lOiBcIk11dGF0aW9uXCIsXG4gICAgICAgIGZpZWxkTmFtZTogXCJjcmVhdGVBcGFydG1lbnRCb29raW5nXCIsXG4gICAgICAgIGRhdGFTb3VyY2VOYW1lOiBsYW1iZGFEYXRhU291cmNlcy5hdHRyTmFtZSxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgY29uc3QgZ2V0QWxsQm9va2luZ3NCeUFwYXJ0bWVudEZ1bmN0aW9uOiBDZm5GdW5jdGlvbkNvbmZpZ3VyYXRpb24gPVxuICAgICAgbmV3IENmbkZ1bmN0aW9uQ29uZmlndXJhdGlvbih0aGlzLCBcImdldEFsbEJvb2tpbmdzRnVuY3Rpb25cIiwge1xuICAgICAgICBhcGlJZDogYWNtc0dyYXBocWxBcGkuYXR0ckFwaUlkLFxuXG4gICAgICAgIGRhdGFTb3VyY2VOYW1lOiBhY21zVGFibGVEYXRhc291cmNlLm5hbWUsXG4gICAgICAgIHJlcXVlc3RNYXBwaW5nVGVtcGxhdGU6IHJlYWRGaWxlU3luYyhcbiAgICAgICAgICBcIi4vbGliL3Z0bF90ZW1wbGF0ZXMvZ2V0X2FsbF9ib29raW5nc19wZXJfYXBhcnRtZW50X3JlcXVlc3QudnRsXCJcbiAgICAgICAgKS50b1N0cmluZygpLFxuICAgICAgICByZXNwb25zZU1hcHBpbmdUZW1wbGF0ZTogcmVhZEZpbGVTeW5jKFxuICAgICAgICAgIFwiLi9saWIvdnRsX3RlbXBsYXRlcy9nZXRfYWxsX2Jvb2tpbmdzX3Blcl9hcGFydG1lbnRfcmVzcG9uc2UudnRsXCJcbiAgICAgICAgKS50b1N0cmluZygpLFxuICAgICAgICBmdW5jdGlvblZlcnNpb246IFwiMjAxOC0wNS0yOVwiLFxuICAgICAgICBuYW1lOiBcImdldEFsbEJvb2tpbmdzRnVuY3Rpb25cIixcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgZ2V0VXNlclBlckJvb2tpbmdzRnVuY3Rpb246IENmbkZ1bmN0aW9uQ29uZmlndXJhdGlvbiA9XG4gICAgICBuZXcgQ2ZuRnVuY3Rpb25Db25maWd1cmF0aW9uKHRoaXMsIFwiZ2V0VXNlclBlckJvb2tpbmdGdW5jdGlvblwiLCB7XG4gICAgICAgIGFwaUlkOiBhY21zR3JhcGhxbEFwaS5hdHRyQXBpSWQsXG5cbiAgICAgICAgZGF0YVNvdXJjZU5hbWU6IGFjbXNUYWJsZURhdGFzb3VyY2UubmFtZSxcbiAgICAgICAgcmVxdWVzdE1hcHBpbmdUZW1wbGF0ZTogcmVhZEZpbGVTeW5jKFxuICAgICAgICAgIFwiLi9saWIvdnRsX3RlbXBsYXRlcy9nZXRfdXNlcl9wZXJfYm9va2luZ19yZXF1ZXN0LnZ0bFwiXG4gICAgICAgICkudG9TdHJpbmcoKSxcbiAgICAgICAgcmVzcG9uc2VNYXBwaW5nVGVtcGxhdGU6IHJlYWRGaWxlU3luYyhcbiAgICAgICAgICBcIi4vbGliL3Z0bF90ZW1wbGF0ZXMvZ2V0X3VzZXJfcGVyX2Jvb2tpbmdfcmVzcG9uc2UudnRsXCJcbiAgICAgICAgKS50b1N0cmluZygpLFxuICAgICAgICBmdW5jdGlvblZlcnNpb246IFwiMjAxOC0wNS0yOVwiLFxuICAgICAgICBuYW1lOiBcImdldFVzZXJQZXJCb29raW5nRnVuY3Rpb25cIixcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgZ2V0UmVzdWx0Qm9va2luZ1BlckFwYXJ0bWVudFJlc29sdmVyOiBDZm5SZXNvbHZlciA9IG5ldyBDZm5SZXNvbHZlcihcbiAgICAgIHRoaXMsXG4gICAgICBcImdldFJlc3VsdEJvb2tpbmdQZXJBcGFydG1lbnRSZXNvbHZlclwiLFxuICAgICAge1xuICAgICAgICBhcGlJZDogYWNtc0dyYXBocWxBcGkuYXR0ckFwaUlkLFxuICAgICAgICB0eXBlTmFtZTogXCJRdWVyeVwiLFxuICAgICAgICBmaWVsZE5hbWU6IFwiZ2V0QWxsQm9va2luZ3NQZXJBcGFydG1lbnRcIixcbiAgICAgICAga2luZDogXCJQSVBFTElORVwiLFxuICAgICAgICBwaXBlbGluZUNvbmZpZzoge1xuICAgICAgICAgIGZ1bmN0aW9uczogW1xuICAgICAgICAgICAgZ2V0QWxsQm9va2luZ3NCeUFwYXJ0bWVudEZ1bmN0aW9uLmF0dHJGdW5jdGlvbklkLFxuICAgICAgICAgICAgZ2V0VXNlclBlckJvb2tpbmdzRnVuY3Rpb24uYXR0ckZ1bmN0aW9uSWQsXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcblxuICAgICAgICByZXF1ZXN0TWFwcGluZ1RlbXBsYXRlOiByZWFkRmlsZVN5bmMoXG4gICAgICAgICAgXCIuL2xpYi92dGxfdGVtcGxhdGVzL2JlZm9yZV9tYXBwaW5nX3RlbXBsYXRlLnZ0bFwiXG4gICAgICAgICkudG9TdHJpbmcoKSxcblxuICAgICAgICByZXNwb25zZU1hcHBpbmdUZW1wbGF0ZTogcmVhZEZpbGVTeW5jKFxuICAgICAgICAgIFwiLi9saWIvdnRsX3RlbXBsYXRlcy9hZnRlcl9tYXBwaW5nX3RlbXBsYXRlLnZ0bFwiXG4gICAgICAgICkudG9TdHJpbmcoKSxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgY3JlYXRlQXBhcnRtZW50Qm9va2luZ1Jlc29sdmVyLmFkZERlcGVuZHNPbihhcGlTY2hlbWEpO1xuICAgIGdldFJlc3VsdEJvb2tpbmdQZXJBcGFydG1lbnRSZXNvbHZlci5hZGREZXBlbmRzT24oYXBpU2NoZW1hKTtcbiAgICBhY21zRGF0YWJhc2UuZ3JhbnRXcml0ZURhdGEocHJvY2Vzc1NRU0xhbWJkYSk7XG4gICAgYWNtc0RhdGFiYXNlLmdyYW50UmVhZERhdGEoYm9va2luZ0xhbWJkYSk7XG4gICAgcXVldWUuZ3JhbnRTZW5kTWVzc2FnZXMoYm9va2luZ0xhbWJkYSk7XG4gICAgcXVldWUuZ3JhbnRDb25zdW1lTWVzc2FnZXMocHJvY2Vzc1NRU0xhbWJkYSk7XG4gICAgYm9va2luZ0xhbWJkYS5hZGRFbnZpcm9ubWVudChcIkFDTVNfREJcIiwgYWNtc0RhdGFiYXNlLnRhYmxlTmFtZSk7XG4gICAgYm9va2luZ0xhbWJkYS5hZGRFbnZpcm9ubWVudChcIkJPT0tJTkdfUVVFVUVfVVJMXCIsIHF1ZXVlLnF1ZXVlVXJsKTtcblxuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgXCJTUVNxdWV1ZU5hbWVcIiwge1xuICAgICAgdmFsdWU6IHF1ZXVlLnF1ZXVlTmFtZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlNRUyBxdWV1ZSBuYW1lXCIsXG4gICAgfSk7XG5cbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsIFwiU1FTcXVldWVBUk5cIiwge1xuICAgICAgdmFsdWU6IHF1ZXVlLnF1ZXVlQXJuLFxuICAgICAgZGVzY3JpcHRpb246IFwiU1FTIHF1ZXVlIEFSTlwiLFxuICAgIH0pO1xuXG4gICAgbmV3IENmbk91dHB1dCh0aGlzLCBcIlNRU3F1ZXVlVVJMXCIsIHtcbiAgICAgIHZhbHVlOiBxdWV1ZS5xdWV1ZVVybCxcbiAgICAgIGRlc2NyaXB0aW9uOiBcIlNRUyBxdWV1ZSBVUkxcIixcbiAgICB9KTtcbiAgfVxufVxuIl19