import { AcmsSharedStack } from "./acms-shared-stack";
import { UserLamdaStacks } from "./user-lambda-stack";
import { BuildingLamdaStacks } from "./building-lambda-stack";
import { ApartmentLamdaStacks } from "./apartment-lambda-stack";
import { DdbStreamLamdaStacks } from "./ddb-stream-lambda-stack";
import { RatingsAndFeedbackStack } from "./ratings-feedback-stack";
import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { BookingStack } from "./booking-stack";

export class PipelineStage extends Stage {
  constructor(scope: Construct, id: string, props: StageProps) {
    super(scope, id, props);

    const acmsSharedStack = new AcmsSharedStack(this, "AcmsSharedStack");

    new UserLamdaStacks(this, "UserLambdaStacks", {
      acmsDatabase: acmsSharedStack.acmsDatabase,
      acmsGraphqlApi: acmsSharedStack.acmsGraphqlApi,
    });

    new BuildingLamdaStacks(this, "BuildingLambdaStacks", {
      acmsDatabase: acmsSharedStack.acmsDatabase,
      acmsGraphqlApi: acmsSharedStack.acmsGraphqlApi,
    });

    new ApartmentLamdaStacks(this, "ApartmentLambdaStacks", {
      acmsDatabase: acmsSharedStack.acmsDatabase,
      acmsGraphqlApi: acmsSharedStack.acmsGraphqlApi,
    });

    new RatingsAndFeedbackStack(this, "RatingsAndFeedbackStack", {
      acmsDatabase: acmsSharedStack.acmsDatabase,
      acmsGraphqlApi: acmsSharedStack.acmsGraphqlApi,
    });

    const bookingStack = new BookingStack(this, "BookingStack", {
      tableName: acmsSharedStack.acmsDatabase.tableName,
      api: acmsSharedStack.acmsGraphqlApi,
    });

    // new DdbStreamLamdaStacks(this, "DdbStreamLambdaStacks", {
    //   acmsDatabase: acmsSharedStack.acmsDatabase,
    //   acmsGraphqlApi: acmsSharedStack.acmsGraphqlApi,
    // });
    // bookingStacks.addDependency(acmsSharedStack)
    // acmsSharedStack.addDependency(bookingStack)

  }
}
