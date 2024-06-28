"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineStage = void 0;
const acms_shared_stack_1 = require("./acms-shared-stack");
const user_lambda_stack_1 = require("./user-lambda-stack");
const building_lambda_stack_1 = require("./building-lambda-stack");
const apartment_lambda_stack_1 = require("./apartment-lambda-stack");
const ratings_feedback_stack_1 = require("./ratings-feedback-stack");
const aws_cdk_lib_1 = require("aws-cdk-lib");
class PipelineStage extends aws_cdk_lib_1.Stage {
    constructor(scope, id, props) {
        super(scope, id, props);
        const acmsSharedStack = new acms_shared_stack_1.AcmsSharedStack(this, "AcmsSharedStack");
        new user_lambda_stack_1.UserLamdaStacks(this, "UserLambdaStacks", {
            acmsDatabase: acmsSharedStack.acmsDatabase,
            acmsGraphqlApi: acmsSharedStack.acmsGraphqlApi,
        });
        new building_lambda_stack_1.BuildingLamdaStacks(this, "BuildingLambdaStacks", {
            acmsDatabase: acmsSharedStack.acmsDatabase,
            acmsGraphqlApi: acmsSharedStack.acmsGraphqlApi,
        });
        new apartment_lambda_stack_1.ApartmentLamdaStacks(this, "ApartmentLambdaStacks", {
            acmsDatabase: acmsSharedStack.acmsDatabase,
            acmsGraphqlApi: acmsSharedStack.acmsGraphqlApi,
        });
        new ratings_feedback_stack_1.RatingsAndFeedbackStack(this, "RatingsAndFeedbackStack", {
            acmsDatabase: acmsSharedStack.acmsDatabase,
            acmsGraphqlApi: acmsSharedStack.acmsGraphqlApi,
        });
        // const bookingStacks = new BookingLamdaStacks(this, "BookingLambdaStacks", {
        //   acmsDatabase: acmsSharedStack.acmsDatabase,
        //   acmsGraphqlApi: acmsSharedStack.acmsGraphqlApi,
        //   // apiSchema: acmsSharedStack.apiSchema,
        // });
        // new DdbStreamLamdaStacks(this, "DdbStreamLambdaStacks", {
        //   acmsDatabase: acmsSharedStack.acmsDatabase,
        //   acmsGraphqlApi: acmsSharedStack.acmsGraphqlApi,
        // });
    }
}
exports.PipelineStage = PipelineStage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBc0Q7QUFDdEQsMkRBQXNEO0FBQ3RELG1FQUE4RDtBQUM5RCxxRUFBZ0U7QUFFaEUscUVBQW1FO0FBQ25FLDZDQUFnRDtBQUdoRCxNQUFhLGFBQWMsU0FBUSxtQkFBSztJQUN0QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWlCO1FBQ3pELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sZUFBZSxHQUFHLElBQUksbUNBQWUsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztRQUVyRSxJQUFJLG1DQUFlLENBQUMsSUFBSSxFQUFFLGtCQUFrQixFQUFFO1lBQzVDLFlBQVksRUFBRSxlQUFlLENBQUMsWUFBWTtZQUMxQyxjQUFjLEVBQUUsZUFBZSxDQUFDLGNBQWM7U0FDL0MsQ0FBQyxDQUFDO1FBRUgsSUFBSSwyQ0FBbUIsQ0FBQyxJQUFJLEVBQUUsc0JBQXNCLEVBQUU7WUFDcEQsWUFBWSxFQUFFLGVBQWUsQ0FBQyxZQUFZO1lBQzFDLGNBQWMsRUFBRSxlQUFlLENBQUMsY0FBYztTQUMvQyxDQUFDLENBQUM7UUFFSCxJQUFJLDZDQUFvQixDQUFDLElBQUksRUFBRSx1QkFBdUIsRUFBRTtZQUN0RCxZQUFZLEVBQUUsZUFBZSxDQUFDLFlBQVk7WUFDMUMsY0FBYyxFQUFFLGVBQWUsQ0FBQyxjQUFjO1NBQy9DLENBQUMsQ0FBQztRQUVILElBQUksZ0RBQXVCLENBQUMsSUFBSSxFQUFFLHlCQUF5QixFQUFFO1lBQzNELFlBQVksRUFBRSxlQUFlLENBQUMsWUFBWTtZQUMxQyxjQUFjLEVBQUUsZUFBZSxDQUFDLGNBQWM7U0FDL0MsQ0FBQyxDQUFDO1FBRUgsOEVBQThFO1FBQzlFLGdEQUFnRDtRQUNoRCxvREFBb0Q7UUFDcEQsNkNBQTZDO1FBQzdDLE1BQU07UUFFTiw0REFBNEQ7UUFDNUQsZ0RBQWdEO1FBQ2hELG9EQUFvRDtRQUNwRCxNQUFNO0lBRVIsQ0FBQztDQUNGO0FBdENELHNDQXNDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjbXNTaGFyZWRTdGFjayB9IGZyb20gXCIuL2FjbXMtc2hhcmVkLXN0YWNrXCI7XG5pbXBvcnQgeyBVc2VyTGFtZGFTdGFja3MgfSBmcm9tIFwiLi91c2VyLWxhbWJkYS1zdGFja1wiO1xuaW1wb3J0IHsgQnVpbGRpbmdMYW1kYVN0YWNrcyB9IGZyb20gXCIuL2J1aWxkaW5nLWxhbWJkYS1zdGFja1wiO1xuaW1wb3J0IHsgQXBhcnRtZW50TGFtZGFTdGFja3MgfSBmcm9tIFwiLi9hcGFydG1lbnQtbGFtYmRhLXN0YWNrXCI7XG5pbXBvcnQgeyBEZGJTdHJlYW1MYW1kYVN0YWNrcyB9IGZyb20gXCIuL2RkYi1zdHJlYW0tbGFtYmRhLXN0YWNrXCI7XG5pbXBvcnQgeyBSYXRpbmdzQW5kRmVlZGJhY2tTdGFjayB9IGZyb20gXCIuL3JhdGluZ3MtZmVlZGJhY2stc3RhY2tcIjtcbmltcG9ydCB7IFN0YWdlLCBTdGFnZVByb3BzIH0gZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiO1xuXG5leHBvcnQgY2xhc3MgUGlwZWxpbmVTdGFnZSBleHRlbmRzIFN0YWdlIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFN0YWdlUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIGNvbnN0IGFjbXNTaGFyZWRTdGFjayA9IG5ldyBBY21zU2hhcmVkU3RhY2sodGhpcywgXCJBY21zU2hhcmVkU3RhY2tcIik7XG5cbiAgICBuZXcgVXNlckxhbWRhU3RhY2tzKHRoaXMsIFwiVXNlckxhbWJkYVN0YWNrc1wiLCB7XG4gICAgICBhY21zRGF0YWJhc2U6IGFjbXNTaGFyZWRTdGFjay5hY21zRGF0YWJhc2UsXG4gICAgICBhY21zR3JhcGhxbEFwaTogYWNtc1NoYXJlZFN0YWNrLmFjbXNHcmFwaHFsQXBpLFxuICAgIH0pO1xuXG4gICAgbmV3IEJ1aWxkaW5nTGFtZGFTdGFja3ModGhpcywgXCJCdWlsZGluZ0xhbWJkYVN0YWNrc1wiLCB7XG4gICAgICBhY21zRGF0YWJhc2U6IGFjbXNTaGFyZWRTdGFjay5hY21zRGF0YWJhc2UsXG4gICAgICBhY21zR3JhcGhxbEFwaTogYWNtc1NoYXJlZFN0YWNrLmFjbXNHcmFwaHFsQXBpLFxuICAgIH0pO1xuXG4gICAgbmV3IEFwYXJ0bWVudExhbWRhU3RhY2tzKHRoaXMsIFwiQXBhcnRtZW50TGFtYmRhU3RhY2tzXCIsIHtcbiAgICAgIGFjbXNEYXRhYmFzZTogYWNtc1NoYXJlZFN0YWNrLmFjbXNEYXRhYmFzZSxcbiAgICAgIGFjbXNHcmFwaHFsQXBpOiBhY21zU2hhcmVkU3RhY2suYWNtc0dyYXBocWxBcGksXG4gICAgfSk7XG5cbiAgICBuZXcgUmF0aW5nc0FuZEZlZWRiYWNrU3RhY2sodGhpcywgXCJSYXRpbmdzQW5kRmVlZGJhY2tTdGFja1wiLCB7XG4gICAgICBhY21zRGF0YWJhc2U6IGFjbXNTaGFyZWRTdGFjay5hY21zRGF0YWJhc2UsXG4gICAgICBhY21zR3JhcGhxbEFwaTogYWNtc1NoYXJlZFN0YWNrLmFjbXNHcmFwaHFsQXBpLFxuICAgIH0pO1xuXG4gICAgLy8gY29uc3QgYm9va2luZ1N0YWNrcyA9IG5ldyBCb29raW5nTGFtZGFTdGFja3ModGhpcywgXCJCb29raW5nTGFtYmRhU3RhY2tzXCIsIHtcbiAgICAvLyAgIGFjbXNEYXRhYmFzZTogYWNtc1NoYXJlZFN0YWNrLmFjbXNEYXRhYmFzZSxcbiAgICAvLyAgIGFjbXNHcmFwaHFsQXBpOiBhY21zU2hhcmVkU3RhY2suYWNtc0dyYXBocWxBcGksXG4gICAgLy8gICAvLyBhcGlTY2hlbWE6IGFjbXNTaGFyZWRTdGFjay5hcGlTY2hlbWEsXG4gICAgLy8gfSk7XG5cbiAgICAvLyBuZXcgRGRiU3RyZWFtTGFtZGFTdGFja3ModGhpcywgXCJEZGJTdHJlYW1MYW1iZGFTdGFja3NcIiwge1xuICAgIC8vICAgYWNtc0RhdGFiYXNlOiBhY21zU2hhcmVkU3RhY2suYWNtc0RhdGFiYXNlLFxuICAgIC8vICAgYWNtc0dyYXBocWxBcGk6IGFjbXNTaGFyZWRTdGFjay5hY21zR3JhcGhxbEFwaSxcbiAgICAvLyB9KTtcblxuICB9XG59XG4iXX0=