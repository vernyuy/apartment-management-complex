"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingsAndFeedbackStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const appsync = require("aws-cdk-lib/aws-appsync");
const helpers_1 = require("./helpers");
const path_1 = require("path");
class RatingsAndFeedbackStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const { acmsDatabase, acmsGraphqlApi } = props;
        const leaveFeedback = new appsync.AppsyncFunction(this, "leaveFeedback", {
            name: "leaveFeedback",
            api: acmsGraphqlApi,
            dataSource: acmsGraphqlApi.addDynamoDbDataSource("acmsFeedbackDataSource", acmsDatabase),
            code: (0, helpers_1.bundleAppSyncResolver)("src/resolvers/ratingsAndFeedback/leaveFeedback.ts"),
            runtime: appsync.FunctionRuntime.JS_1_0_0,
        });
        new appsync.Resolver(this, "leaveFeedbackResolver", {
            api: acmsGraphqlApi,
            typeName: "Mutation",
            fieldName: "leaveFeedback",
            code: appsync.Code.fromAsset((0, path_1.join)(__dirname, "./js_resolvers/_before_and_after_mapping_template.js")),
            runtime: appsync.FunctionRuntime.JS_1_0_0,
            pipelineConfig: [leaveFeedback],
        });
        const getApartmentFeedback = new appsync.AppsyncFunction(this, "ApartmentFeedback", {
            name: "getApartmentFeedback",
            api: acmsGraphqlApi,
            dataSource: acmsGraphqlApi.addDynamoDbDataSource("FeedbackDataSource", acmsDatabase),
            code: (0, helpers_1.bundleAppSyncResolver)("src/resolvers/ratingsAndFeedback/getApartmentFeedback.ts"),
            runtime: appsync.FunctionRuntime.JS_1_0_0,
        });
        new appsync.Resolver(this, "getApartmentFeedbackResolver", {
            api: acmsGraphqlApi,
            typeName: "Query",
            fieldName: "getApartmentFeedback",
            code: appsync.Code.fromAsset((0, path_1.join)(__dirname, "./js_resolvers/_before_and_after_mapping_template.js")),
            runtime: appsync.FunctionRuntime.JS_1_0_0,
            pipelineConfig: [getApartmentFeedback],
        });
    }
}
exports.RatingsAndFeedbackStack = RatingsAndFeedbackStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmF0aW5ncy1mZWVkYmFjay1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJhdGluZ3MtZmVlZGJhY2stc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQWdEO0FBR2hELG1EQUFtRDtBQUNuRCx1Q0FBa0Q7QUFDbEQsK0JBQTRCO0FBTzVCLE1BQWEsdUJBQXdCLFNBQVEsbUJBQUs7SUFDaEQsWUFDRSxLQUFnQixFQUNoQixFQUFVLEVBQ1YsS0FBbUM7UUFFbkMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFFL0MsTUFBTSxhQUFhLEdBQUcsSUFBSSxPQUFPLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDdkUsSUFBSSxFQUFFLGVBQWU7WUFDckIsR0FBRyxFQUFFLGNBQWM7WUFDbkIsVUFBVSxFQUFFLGNBQWMsQ0FBQyxxQkFBcUIsQ0FDOUMsd0JBQXdCLEVBQ3hCLFlBQVksQ0FDYjtZQUNELElBQUksRUFBRSxJQUFBLCtCQUFxQixFQUN6QixtREFBbUQsQ0FDcEQ7WUFDRCxPQUFPLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRO1NBQzFDLENBQUMsQ0FBQztRQUVILElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsdUJBQXVCLEVBQUU7WUFDbEQsR0FBRyxFQUFFLGNBQWM7WUFDbkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFLGVBQWU7WUFDMUIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUMxQixJQUFBLFdBQUksRUFBQyxTQUFTLEVBQUUsc0RBQXNELENBQUMsQ0FDeEU7WUFDRCxPQUFPLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRO1lBQ3pDLGNBQWMsRUFBRSxDQUFDLGFBQWEsQ0FBQztTQUNoQyxDQUFDLENBQUM7UUFFSCxNQUFNLG9CQUFvQixHQUFHLElBQUksT0FBTyxDQUFDLGVBQWUsQ0FDdEQsSUFBSSxFQUNKLG1CQUFtQixFQUNuQjtZQUNFLElBQUksRUFBRSxzQkFBc0I7WUFDNUIsR0FBRyxFQUFFLGNBQWM7WUFDbkIsVUFBVSxFQUFFLGNBQWMsQ0FBQyxxQkFBcUIsQ0FDOUMsb0JBQW9CLEVBQ3BCLFlBQVksQ0FDYjtZQUNELElBQUksRUFBRSxJQUFBLCtCQUFxQixFQUN6QiwwREFBMEQsQ0FDM0Q7WUFDRCxPQUFPLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRO1NBQzFDLENBQ0YsQ0FBQztRQUVGLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsOEJBQThCLEVBQUU7WUFDekQsR0FBRyxFQUFFLGNBQWM7WUFDbkIsUUFBUSxFQUFFLE9BQU87WUFDakIsU0FBUyxFQUFFLHNCQUFzQjtZQUNqQyxJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQzFCLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxzREFBc0QsQ0FBQyxDQUN4RTtZQUNELE9BQU8sRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVE7WUFDekMsY0FBYyxFQUFFLENBQUMsb0JBQW9CLENBQUM7U0FDdkMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBOURELDBEQThEQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgeyBUYWJsZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGJcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5pbXBvcnQgKiBhcyBhcHBzeW5jIGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtYXBwc3luY1wiO1xuaW1wb3J0IHsgYnVuZGxlQXBwU3luY1Jlc29sdmVyIH0gZnJvbSBcIi4vaGVscGVyc1wiO1xuaW1wb3J0IHsgam9pbiB9IGZyb20gXCJwYXRoXCI7XG5cbmludGVyZmFjZSBSYXRpbmdzQW5kRmVlZGJhY2tTdGFja1Byb3BzIGV4dGVuZHMgU3RhY2tQcm9wcyB7XG4gIGFjbXNHcmFwaHFsQXBpOiBhcHBzeW5jLkdyYXBocWxBcGk7XG4gIGFjbXNEYXRhYmFzZTogVGFibGU7XG59XG5cbmV4cG9ydCBjbGFzcyBSYXRpbmdzQW5kRmVlZGJhY2tTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3IoXG4gICAgc2NvcGU6IENvbnN0cnVjdCxcbiAgICBpZDogc3RyaW5nLFxuICAgIHByb3BzOiBSYXRpbmdzQW5kRmVlZGJhY2tTdGFja1Byb3BzXG4gICkge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgY29uc3QgeyBhY21zRGF0YWJhc2UsIGFjbXNHcmFwaHFsQXBpIH0gPSBwcm9wcztcblxuICAgIGNvbnN0IGxlYXZlRmVlZGJhY2sgPSBuZXcgYXBwc3luYy5BcHBzeW5jRnVuY3Rpb24odGhpcywgXCJsZWF2ZUZlZWRiYWNrXCIsIHtcbiAgICAgIG5hbWU6IFwibGVhdmVGZWVkYmFja1wiLFxuICAgICAgYXBpOiBhY21zR3JhcGhxbEFwaSxcbiAgICAgIGRhdGFTb3VyY2U6IGFjbXNHcmFwaHFsQXBpLmFkZER5bmFtb0RiRGF0YVNvdXJjZShcbiAgICAgICAgXCJhY21zRmVlZGJhY2tEYXRhU291cmNlXCIsXG4gICAgICAgIGFjbXNEYXRhYmFzZVxuICAgICAgKSxcbiAgICAgIGNvZGU6IGJ1bmRsZUFwcFN5bmNSZXNvbHZlcihcbiAgICAgICAgXCJzcmMvcmVzb2x2ZXJzL3JhdGluZ3NBbmRGZWVkYmFjay9sZWF2ZUZlZWRiYWNrLnRzXCJcbiAgICAgICksXG4gICAgICBydW50aW1lOiBhcHBzeW5jLkZ1bmN0aW9uUnVudGltZS5KU18xXzBfMCxcbiAgICB9KTtcblxuICAgIG5ldyBhcHBzeW5jLlJlc29sdmVyKHRoaXMsIFwibGVhdmVGZWVkYmFja1Jlc29sdmVyXCIsIHtcbiAgICAgIGFwaTogYWNtc0dyYXBocWxBcGksXG4gICAgICB0eXBlTmFtZTogXCJNdXRhdGlvblwiLFxuICAgICAgZmllbGROYW1lOiBcImxlYXZlRmVlZGJhY2tcIixcbiAgICAgIGNvZGU6IGFwcHN5bmMuQ29kZS5mcm9tQXNzZXQoXG4gICAgICAgIGpvaW4oX19kaXJuYW1lLCBcIi4vanNfcmVzb2x2ZXJzL19iZWZvcmVfYW5kX2FmdGVyX21hcHBpbmdfdGVtcGxhdGUuanNcIilcbiAgICAgICksXG4gICAgICBydW50aW1lOiBhcHBzeW5jLkZ1bmN0aW9uUnVudGltZS5KU18xXzBfMCxcbiAgICAgIHBpcGVsaW5lQ29uZmlnOiBbbGVhdmVGZWVkYmFja10sXG4gICAgfSk7XG5cbiAgICBjb25zdCBnZXRBcGFydG1lbnRGZWVkYmFjayA9IG5ldyBhcHBzeW5jLkFwcHN5bmNGdW5jdGlvbihcbiAgICAgIHRoaXMsXG4gICAgICBcIkFwYXJ0bWVudEZlZWRiYWNrXCIsXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwiZ2V0QXBhcnRtZW50RmVlZGJhY2tcIixcbiAgICAgICAgYXBpOiBhY21zR3JhcGhxbEFwaSxcbiAgICAgICAgZGF0YVNvdXJjZTogYWNtc0dyYXBocWxBcGkuYWRkRHluYW1vRGJEYXRhU291cmNlKFxuICAgICAgICAgIFwiRmVlZGJhY2tEYXRhU291cmNlXCIsXG4gICAgICAgICAgYWNtc0RhdGFiYXNlXG4gICAgICAgICksXG4gICAgICAgIGNvZGU6IGJ1bmRsZUFwcFN5bmNSZXNvbHZlcihcbiAgICAgICAgICBcInNyYy9yZXNvbHZlcnMvcmF0aW5nc0FuZEZlZWRiYWNrL2dldEFwYXJ0bWVudEZlZWRiYWNrLnRzXCJcbiAgICAgICAgKSxcbiAgICAgICAgcnVudGltZTogYXBwc3luYy5GdW5jdGlvblJ1bnRpbWUuSlNfMV8wXzAsXG4gICAgICB9XG4gICAgKTtcblxuICAgIG5ldyBhcHBzeW5jLlJlc29sdmVyKHRoaXMsIFwiZ2V0QXBhcnRtZW50RmVlZGJhY2tSZXNvbHZlclwiLCB7XG4gICAgICBhcGk6IGFjbXNHcmFwaHFsQXBpLFxuICAgICAgdHlwZU5hbWU6IFwiUXVlcnlcIixcbiAgICAgIGZpZWxkTmFtZTogXCJnZXRBcGFydG1lbnRGZWVkYmFja1wiLFxuICAgICAgY29kZTogYXBwc3luYy5Db2RlLmZyb21Bc3NldChcbiAgICAgICAgam9pbihfX2Rpcm5hbWUsIFwiLi9qc19yZXNvbHZlcnMvX2JlZm9yZV9hbmRfYWZ0ZXJfbWFwcGluZ190ZW1wbGF0ZS5qc1wiKVxuICAgICAgKSxcbiAgICAgIHJ1bnRpbWU6IGFwcHN5bmMuRnVuY3Rpb25SdW50aW1lLkpTXzFfMF8wLFxuICAgICAgcGlwZWxpbmVDb25maWc6IFtnZXRBcGFydG1lbnRGZWVkYmFja10sXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==