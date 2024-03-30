import { Stack, StackProps } from "aws-cdk-lib";
import {
  CfnDataSource,
  CfnGraphQLApi,
  CfnGraphQLSchema,
  CfnResolver,
} from "aws-cdk-lib/aws-appsync";
import * as signer from "aws-cdk-lib/aws-signer";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { ManagedPolicy, Role, ServicePrincipal } from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { Construct } from "constructs";
import * as path from "path";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Tracing } from "aws-cdk-lib/aws-lambda";
import * as appsync from "aws-cdk-lib/aws-appsync";
import { bundleAppSyncResolver } from "./helpers";
import { join } from "path";

interface BuildingLambdaStackProps extends StackProps {
  acmsGraphqlApi: appsync.GraphqlApi;
  acmsDatabase: Table;
}

export class BuildingLamdaStacks extends Stack {
  constructor(scope: Construct, id: string, props: BuildingLambdaStackProps) {
    super(scope, id, props);

    const { acmsDatabase, acmsGraphqlApi } = props;

    const buildingFunction = new appsync.AppsyncFunction(
      this,
      "createBuilding",
      {
        name: "createBuilding",
        api: acmsGraphqlApi,
        dataSource: acmsGraphqlApi.addDynamoDbDataSource(
          "acmsDatabase",
          acmsDatabase
        ),
        code: bundleAppSyncResolver("src/resolvers/building/createBuilding.ts"),
        runtime: appsync.FunctionRuntime.JS_1_0_0,
      }
    );

    new appsync.Resolver(this, "createBuildingResolver", {
      api: acmsGraphqlApi,
      typeName: "Mutation",
      fieldName: "createBuilding",
      code: appsync.Code.fromAsset(
        join(__dirname, "./js_resolvers/_before_and_after_mapping_template.js")
      ),
      runtime: appsync.FunctionRuntime.JS_1_0_0,
      pipelineConfig: [buildingFunction],
    });

  }
}
