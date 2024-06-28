"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserLamdaStacks = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const path_1 = require("path");
const appsync = require("aws-cdk-lib/aws-appsync");
const helpers_1 = require("./helpers");
class UserLamdaStacks extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const { acmsDatabase, acmsGraphqlApi } = props;
        const acmsDataSource = acmsGraphqlApi.addDynamoDbDataSource("acmsdbs", acmsDatabase);
        const acmsUserFunction = new appsync.AppsyncFunction(this, "createUserAccount", {
            name: "createUserAccount",
            api: acmsGraphqlApi,
            dataSource: acmsDataSource,
            code: (0, helpers_1.bundleAppSyncResolver)("src/resolvers/user/createUserAccount.ts"),
            runtime: appsync.FunctionRuntime.JS_1_0_0,
        });
        const getUserAccount = new appsync.AppsyncFunction(this, "getUserAccount", {
            name: "getUserAccount",
            api: acmsGraphqlApi,
            dataSource: acmsDataSource,
            code: (0, helpers_1.bundleAppSyncResolver)("src/resolvers/user/getUserAccount.ts"),
            runtime: appsync.FunctionRuntime.JS_1_0_0,
        });
        new appsync.Resolver(this, "getUserAccountResolver", {
            api: acmsGraphqlApi,
            typeName: "Query",
            fieldName: "getUserAccount",
            code: appsync.Code.fromAsset((0, path_1.join)(__dirname, "./js_resolvers/_before_and_after_mapping_template.js")),
            runtime: appsync.FunctionRuntime.JS_1_0_0,
            pipelineConfig: [getUserAccount],
        });
        new appsync.Resolver(this, "createUserResolver", {
            api: acmsGraphqlApi,
            typeName: "Mutation",
            fieldName: "createUserAccount",
            code: appsync.Code.fromAsset((0, path_1.join)(__dirname, "./js_resolvers/_before_and_after_mapping_template.js")),
            runtime: appsync.FunctionRuntime.JS_1_0_0,
            pipelineConfig: [acmsUserFunction],
        });
    }
}
exports.UserLamdaStacks = UserLamdaStacks;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1sYW1iZGEtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyLWxhbWJkYS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw2Q0FBZ0Q7QUFHaEQsK0JBQTRCO0FBQzVCLG1EQUFtRDtBQUNuRCx1Q0FBa0Q7QUFNbEQsTUFBYSxlQUFnQixTQUFRLG1CQUFLO0lBQ3hDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBMkI7UUFDbkUsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDL0MsTUFBTSxjQUFjLEdBQUcsY0FBYyxDQUFDLHFCQUFxQixDQUN6RCxTQUFTLEVBQ1QsWUFBWSxDQUNiLENBQUE7UUFDRCxNQUFNLGdCQUFnQixHQUFHLElBQUksT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUU7WUFDOUUsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixHQUFHLEVBQUUsY0FBYztZQUNuQixVQUFVLEVBQUUsY0FBYztZQUMxQixJQUFJLEVBQUUsSUFBQSwrQkFBcUIsRUFBQyx5Q0FBeUMsQ0FBQztZQUN0RSxPQUFPLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRO1NBQzFDLENBQUMsQ0FBQztRQUVILE1BQU0sY0FBYyxHQUFHLElBQUksT0FBTyxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDekUsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixHQUFHLEVBQUUsY0FBYztZQUNuQixVQUFVLEVBQUUsY0FBYztZQUMxQixJQUFJLEVBQUUsSUFBQSwrQkFBcUIsRUFBQyxzQ0FBc0MsQ0FBQztZQUNuRSxPQUFPLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRO1NBQzFDLENBQUMsQ0FBQztRQUVILElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsd0JBQXdCLEVBQUU7WUFDbkQsR0FBRyxFQUFFLGNBQWM7WUFDbkIsUUFBUSxFQUFFLE9BQU87WUFDakIsU0FBUyxFQUFFLGdCQUFnQjtZQUMzQixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQzFCLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxzREFBc0QsQ0FBQyxDQUN4RTtZQUNELE9BQU8sRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVE7WUFDekMsY0FBYyxFQUFFLENBQUMsY0FBYyxDQUFDO1NBQ2pDLENBQUMsQ0FBQztRQUVILElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsb0JBQW9CLEVBQUU7WUFDL0MsR0FBRyxFQUFFLGNBQWM7WUFDbkIsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFLG1CQUFtQjtZQUM5QixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQzFCLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSxzREFBc0QsQ0FBQyxDQUN4RTtZQUNELE9BQU8sRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVE7WUFDekMsY0FBYyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7U0FDbkMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBL0NELDBDQStDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgeyBUYWJsZSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGJcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSBcInBhdGhcIjtcbmltcG9ydCAqIGFzIGFwcHN5bmMgZnJvbSBcImF3cy1jZGstbGliL2F3cy1hcHBzeW5jXCI7XG5pbXBvcnQgeyBidW5kbGVBcHBTeW5jUmVzb2x2ZXIgfSBmcm9tIFwiLi9oZWxwZXJzXCI7XG5cbmludGVyZmFjZSBVc2VyTGFtYmRhU3RhY2tQcm9wcyBleHRlbmRzIFN0YWNrUHJvcHMge1xuICBhY21zR3JhcGhxbEFwaTogYXBwc3luYy5HcmFwaHFsQXBpO1xuICBhY21zRGF0YWJhc2U6IFRhYmxlO1xufVxuZXhwb3J0IGNsYXNzIFVzZXJMYW1kYVN0YWNrcyBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFVzZXJMYW1iZGFTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCB7IGFjbXNEYXRhYmFzZSwgYWNtc0dyYXBocWxBcGkgfSA9IHByb3BzO1xuICAgIGNvbnN0IGFjbXNEYXRhU291cmNlID0gYWNtc0dyYXBocWxBcGkuYWRkRHluYW1vRGJEYXRhU291cmNlKFxuICAgICAgXCJhY21zZGJzXCIsXG4gICAgICBhY21zRGF0YWJhc2VcbiAgICApXG4gICAgY29uc3QgYWNtc1VzZXJGdW5jdGlvbiA9IG5ldyBhcHBzeW5jLkFwcHN5bmNGdW5jdGlvbih0aGlzLCBcImNyZWF0ZVVzZXJBY2NvdW50XCIsIHtcbiAgICAgIG5hbWU6IFwiY3JlYXRlVXNlckFjY291bnRcIixcbiAgICAgIGFwaTogYWNtc0dyYXBocWxBcGksXG4gICAgICBkYXRhU291cmNlOiBhY21zRGF0YVNvdXJjZSxcbiAgICAgIGNvZGU6IGJ1bmRsZUFwcFN5bmNSZXNvbHZlcihcInNyYy9yZXNvbHZlcnMvdXNlci9jcmVhdGVVc2VyQWNjb3VudC50c1wiKSxcbiAgICAgIHJ1bnRpbWU6IGFwcHN5bmMuRnVuY3Rpb25SdW50aW1lLkpTXzFfMF8wLFxuICAgIH0pO1xuXG4gICAgY29uc3QgZ2V0VXNlckFjY291bnQgPSBuZXcgYXBwc3luYy5BcHBzeW5jRnVuY3Rpb24odGhpcywgXCJnZXRVc2VyQWNjb3VudFwiLCB7XG4gICAgICBuYW1lOiBcImdldFVzZXJBY2NvdW50XCIsXG4gICAgICBhcGk6IGFjbXNHcmFwaHFsQXBpLFxuICAgICAgZGF0YVNvdXJjZTogYWNtc0RhdGFTb3VyY2UsXG4gICAgICBjb2RlOiBidW5kbGVBcHBTeW5jUmVzb2x2ZXIoXCJzcmMvcmVzb2x2ZXJzL3VzZXIvZ2V0VXNlckFjY291bnQudHNcIiksXG4gICAgICBydW50aW1lOiBhcHBzeW5jLkZ1bmN0aW9uUnVudGltZS5KU18xXzBfMCxcbiAgICB9KTtcblxuICAgIG5ldyBhcHBzeW5jLlJlc29sdmVyKHRoaXMsIFwiZ2V0VXNlckFjY291bnRSZXNvbHZlclwiLCB7XG4gICAgICBhcGk6IGFjbXNHcmFwaHFsQXBpLFxuICAgICAgdHlwZU5hbWU6IFwiUXVlcnlcIixcbiAgICAgIGZpZWxkTmFtZTogXCJnZXRVc2VyQWNjb3VudFwiLFxuICAgICAgY29kZTogYXBwc3luYy5Db2RlLmZyb21Bc3NldChcbiAgICAgICAgam9pbihfX2Rpcm5hbWUsIFwiLi9qc19yZXNvbHZlcnMvX2JlZm9yZV9hbmRfYWZ0ZXJfbWFwcGluZ190ZW1wbGF0ZS5qc1wiKVxuICAgICAgKSxcbiAgICAgIHJ1bnRpbWU6IGFwcHN5bmMuRnVuY3Rpb25SdW50aW1lLkpTXzFfMF8wLFxuICAgICAgcGlwZWxpbmVDb25maWc6IFtnZXRVc2VyQWNjb3VudF0sXG4gICAgfSk7XG5cbiAgICBuZXcgYXBwc3luYy5SZXNvbHZlcih0aGlzLCBcImNyZWF0ZVVzZXJSZXNvbHZlclwiLCB7XG4gICAgICBhcGk6IGFjbXNHcmFwaHFsQXBpLFxuICAgICAgdHlwZU5hbWU6IFwiTXV0YXRpb25cIixcbiAgICAgIGZpZWxkTmFtZTogXCJjcmVhdGVVc2VyQWNjb3VudFwiLFxuICAgICAgY29kZTogYXBwc3luYy5Db2RlLmZyb21Bc3NldChcbiAgICAgICAgam9pbihfX2Rpcm5hbWUsIFwiLi9qc19yZXNvbHZlcnMvX2JlZm9yZV9hbmRfYWZ0ZXJfbWFwcGluZ190ZW1wbGF0ZS5qc1wiKVxuICAgICAgKSxcbiAgICAgIHJ1bnRpbWU6IGFwcHN5bmMuRnVuY3Rpb25SdW50aW1lLkpTXzFfMF8wLFxuICAgICAgcGlwZWxpbmVDb25maWc6IFthY21zVXNlckZ1bmN0aW9uXSxcbiAgICB9KTtcbiAgfVxufVxuXG4iXX0=