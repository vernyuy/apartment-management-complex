import { AcmsSharedStack } from "./acms-shared-stack";
import { UserLamdaStacks } from "./user-lambda-stack";
import { BuildingLamdaStacks } from "./building-lambda-stack";
import { ApartmentLamdaStacks } from "./apartment-lambda-stack";
import { BookingLamdaStacks } from "./booking-lambda-stack";
import { DdbStreamLamdaStacks } from "./ddb-stream-lambda-stack";
import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";

export class PipelineStage extends Stage {
  constructor(scope: Construct, id: string, props: StageProps) {
    super(scope, id, props);

    const acmsStack: AcmsSharedStack = new AcmsSharedStack(this, "AcmsStack");

    new UserLamdaStacks(this, "UserLambdaStacks", {
      acmsDatabase: acmsStack.acmsDatabase,
      apiSchema: acmsStack.apiSchema,
      acmsGraphqlApi: acmsStack.acmsGraphqlApi,
    });

    new BuildingLamdaStacks(this, "BuildingLambdaStacks", {
      acmsDatabase: acmsStack.acmsDatabase,
      apiSchema: acmsStack.apiSchema,
      acmsGraphqlApi: acmsStack.acmsGraphqlApi,
    });

    new ApartmentLamdaStacks(this, "ApartmentLambdaStacks", {
      acmsDatabase: acmsStack.acmsDatabase,
      apiSchema: acmsStack.apiSchema,
      acmsGraphqlApi: acmsStack.acmsGraphqlApi,
    });

    new BookingLamdaStacks(this, "BookingLambdaStacks", {
      acmsDatabase: acmsStack.acmsDatabase,
      apiSchema: acmsStack.apiSchema,
      acmsGraphqlApi: acmsStack.acmsGraphqlApi,
      acmsTableDatasource: acmsStack.acmsTableDatasource,
    });

    new DdbStreamLamdaStacks(this, "DdbStreamLambdaStacks", {
      acmsDatabase: acmsStack.acmsDatabase,
      apiSchema: acmsStack.apiSchema,
      acmsGraphqlApi: acmsStack.acmsGraphqlApi,
    });
  }
}
