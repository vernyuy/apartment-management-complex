"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineStage = void 0;
const acms_shared_stack_1 = require("./acms-shared-stack");
const aws_cdk_lib_1 = require("aws-cdk-lib");
class PipelineStage extends aws_cdk_lib_1.Stage {
    constructor(scope, id, props) {
        super(scope, id, props);
        new acms_shared_stack_1.AcmsSharedStack(this, "AcmsStack");
        // new UserLamdaStacks(this, "UserLambdaStacks", {
        //   acmsDatabase: acmsStack.acmsDatabase,
        //   acmsGraphqlApi: acmsStack.acmsGraphqlApi,
        // });
        // new BuildingLamdaStacks(this, "BuildingLambdaStacks", {
        //   acmsDatabase: acmsStack.acmsDatabase,
        //   acmsGraphqlApi: acmsStack.acmsGraphqlApi,
        // });
        // new ApartmentLamdaStacks(this, "ApartmentLambdaStacks", {
        //   acmsDatabase: acmsStack.acmsDatabase,
        //   acmsGraphqlApi: acmsStack.acmsGraphqlApi,
        // });
        // new BookingLamdaStacks(this, "BookingLambdaStacks", {
        //   acmsDatabase: acmsStack.acmsDatabase,
        //   acmsGraphqlApi: acmsStack.acmsGraphqlApi,
        //   acmsTableDatasource: acmsStack.acmsTableDatasource,
        // });
        // new DdbStreamLamdaStacks(this, "DdbStreamLambdaStacks", {
        //   acmsDatabase: acmsStack.acmsDatabase,
        //   acmsGraphqlApi: acmsStack.acmsGraphqlApi,
        // });
    }
}
exports.PipelineStage = PipelineStage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGlwZWxpbmUtc3RhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwaXBlbGluZS1zdGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyREFBc0Q7QUFNdEQsNkNBQWdEO0FBR2hELE1BQWEsYUFBYyxTQUFRLG1CQUFLO0lBQ3RDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBaUI7UUFDekQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsSUFBSSxtQ0FBZSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUV2QyxrREFBa0Q7UUFDbEQsMENBQTBDO1FBQzFDLDhDQUE4QztRQUM5QyxNQUFNO1FBRU4sMERBQTBEO1FBQzFELDBDQUEwQztRQUMxQyw4Q0FBOEM7UUFDOUMsTUFBTTtRQUVOLDREQUE0RDtRQUM1RCwwQ0FBMEM7UUFDMUMsOENBQThDO1FBQzlDLE1BQU07UUFFTix3REFBd0Q7UUFDeEQsMENBQTBDO1FBQzFDLDhDQUE4QztRQUM5Qyx3REFBd0Q7UUFDeEQsTUFBTTtRQUVOLDREQUE0RDtRQUM1RCwwQ0FBMEM7UUFDMUMsOENBQThDO1FBQzlDLE1BQU07SUFDUixDQUFDO0NBQ0Y7QUFoQ0Qsc0NBZ0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWNtc1NoYXJlZFN0YWNrIH0gZnJvbSBcIi4vYWNtcy1zaGFyZWQtc3RhY2tcIjtcbmltcG9ydCB7IFVzZXJMYW1kYVN0YWNrcyB9IGZyb20gXCIuL3VzZXItbGFtYmRhLXN0YWNrXCI7XG5pbXBvcnQgeyBCdWlsZGluZ0xhbWRhU3RhY2tzIH0gZnJvbSBcIi4vYnVpbGRpbmctbGFtYmRhLXN0YWNrXCI7XG5pbXBvcnQgeyBBcGFydG1lbnRMYW1kYVN0YWNrcyB9IGZyb20gXCIuL2FwYXJ0bWVudC1sYW1iZGEtc3RhY2tcIjtcbmltcG9ydCB7IEJvb2tpbmdMYW1kYVN0YWNrcyB9IGZyb20gXCIuL2Jvb2tpbmctbGFtYmRhLXN0YWNrXCI7XG5pbXBvcnQgeyBEZGJTdHJlYW1MYW1kYVN0YWNrcyB9IGZyb20gXCIuL2RkYi1zdHJlYW0tbGFtYmRhLXN0YWNrXCI7XG5pbXBvcnQgeyBTdGFnZSwgU3RhZ2VQcm9wcyB9IGZyb20gXCJhd3MtY2RrLWxpYlwiO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcblxuZXhwb3J0IGNsYXNzIFBpcGVsaW5lU3RhZ2UgZXh0ZW5kcyBTdGFnZSB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBTdGFnZVByb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBuZXcgQWNtc1NoYXJlZFN0YWNrKHRoaXMsIFwiQWNtc1N0YWNrXCIpO1xuXG4gICAgLy8gbmV3IFVzZXJMYW1kYVN0YWNrcyh0aGlzLCBcIlVzZXJMYW1iZGFTdGFja3NcIiwge1xuICAgIC8vICAgYWNtc0RhdGFiYXNlOiBhY21zU3RhY2suYWNtc0RhdGFiYXNlLFxuICAgIC8vICAgYWNtc0dyYXBocWxBcGk6IGFjbXNTdGFjay5hY21zR3JhcGhxbEFwaSxcbiAgICAvLyB9KTtcblxuICAgIC8vIG5ldyBCdWlsZGluZ0xhbWRhU3RhY2tzKHRoaXMsIFwiQnVpbGRpbmdMYW1iZGFTdGFja3NcIiwge1xuICAgIC8vICAgYWNtc0RhdGFiYXNlOiBhY21zU3RhY2suYWNtc0RhdGFiYXNlLFxuICAgIC8vICAgYWNtc0dyYXBocWxBcGk6IGFjbXNTdGFjay5hY21zR3JhcGhxbEFwaSxcbiAgICAvLyB9KTtcblxuICAgIC8vIG5ldyBBcGFydG1lbnRMYW1kYVN0YWNrcyh0aGlzLCBcIkFwYXJ0bWVudExhbWJkYVN0YWNrc1wiLCB7XG4gICAgLy8gICBhY21zRGF0YWJhc2U6IGFjbXNTdGFjay5hY21zRGF0YWJhc2UsXG4gICAgLy8gICBhY21zR3JhcGhxbEFwaTogYWNtc1N0YWNrLmFjbXNHcmFwaHFsQXBpLFxuICAgIC8vIH0pO1xuXG4gICAgLy8gbmV3IEJvb2tpbmdMYW1kYVN0YWNrcyh0aGlzLCBcIkJvb2tpbmdMYW1iZGFTdGFja3NcIiwge1xuICAgIC8vICAgYWNtc0RhdGFiYXNlOiBhY21zU3RhY2suYWNtc0RhdGFiYXNlLFxuICAgIC8vICAgYWNtc0dyYXBocWxBcGk6IGFjbXNTdGFjay5hY21zR3JhcGhxbEFwaSxcbiAgICAvLyAgIGFjbXNUYWJsZURhdGFzb3VyY2U6IGFjbXNTdGFjay5hY21zVGFibGVEYXRhc291cmNlLFxuICAgIC8vIH0pO1xuXG4gICAgLy8gbmV3IERkYlN0cmVhbUxhbWRhU3RhY2tzKHRoaXMsIFwiRGRiU3RyZWFtTGFtYmRhU3RhY2tzXCIsIHtcbiAgICAvLyAgIGFjbXNEYXRhYmFzZTogYWNtc1N0YWNrLmFjbXNEYXRhYmFzZSxcbiAgICAvLyAgIGFjbXNHcmFwaHFsQXBpOiBhY21zU3RhY2suYWNtc0dyYXBocWxBcGksXG4gICAgLy8gfSk7XG4gIH1cbn1cbiJdfQ==