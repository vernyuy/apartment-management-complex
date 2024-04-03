import { Stack, StackProps } from "aws-cdk-lib";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";
import { join } from "path";
import * as appsync from "aws-cdk-lib/aws-appsync";
import { bundleAppSyncResolver } from "./helpers";

interface UserLambdaStackProps extends StackProps {
  acmsGraphqlApi: appsync.GraphqlApi;
  acmsDatabase: Table;
}
export class UserLamdaStacks extends Stack {
  constructor(scope: Construct, id: string, props: UserLambdaStackProps) {
    super(scope, id, props);

    const { acmsDatabase, acmsGraphqlApi } = props;

    const defaultPipelineCode = appsync.Code.fromInline(`
    // The before step
    export function request(...args) {
      return {}
    }

    // The after step
    export function response(ctx) {
      return ctx.prev.result
    }
  `);

    const createUserAccountFunction = new appsync.AppsyncFunction(this, "createUserAccount", {
      name: "createUserAccount",
      api: acmsGraphqlApi,
      dataSource: acmsGraphqlApi.addDynamoDbDataSource(
        "createUserAccount",
        acmsDatabase
      ),
      code: bundleAppSyncResolver("src/resolvers/user/createUserAccount.ts"),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
    });

    new appsync.Resolver(this, "createUserResolver", {
      api: acmsGraphqlApi,
      typeName: "Mutation",
      fieldName: "createUserAccount",
      code: defaultPipelineCode,
      // appsync.Code.fromAsset(
      //   join(__dirname, "./js_resolvers/_before_and_after_mapping_template.js")
      // ),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      pipelineConfig: [createUserAccountFunction],
    });
  }
}
