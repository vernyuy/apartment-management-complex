"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcmsStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const pipelines_1 = require("aws-cdk-lib/pipelines");
class AcmsStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        /***********************************************************************
         *    Create codepipeline for the project using github as code source.
         ***********************************************************************/
        const pipeline = new pipelines_1.CodePipeline(this, "acms-pipeline", {
            synth: new pipelines_1.ShellStep("synth", {
                input: pipelines_1.CodePipelineSource.gitHub("vernyuy/apartment-management-complex", "main"),
                commands: ["npm ci", "npx cdk synth"],
            }),
        });
        /*********************************
         *    Add test stage
         *********************************/
        // const devStage = pipeline.addStage(
        //   new PipelineStage(this, "PipelineDevStage", {
        //     stageName: "dev",
        //   })
        // );
        // const prodStage = pipeline.addStage(
        //   new PipelineStage(this, "PipelineProdStage", {
        //     stageName: "prod",
        //   })
        // );
        /*****************************************************
         *    Authomate unit test within the stage
         *****************************************************/
        // devStage.addPre(
        //   new CodeBuildStep("unit test", {
        //     commands: ["npm ci", "npm run test"],
        //   })
        // );
        // devStage.addPost(
        //   new ManualApprovalStep("Manual aproval before production")
        // );
    }
}
exports.AcmsStack = AcmsStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNtcy1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFjbXMtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQTBFO0FBRzFFLHFEQU0rQjtBQUUvQixNQUFhLFNBQVUsU0FBUSxtQkFBSztJQUVsQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCOztpRkFFeUU7UUFDekUsTUFBTSxRQUFRLEdBQUcsSUFBSSx3QkFBWSxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDdkQsS0FBSyxFQUFFLElBQUkscUJBQVMsQ0FBQyxPQUFPLEVBQUU7Z0JBQzVCLEtBQUssRUFBRSw4QkFBa0IsQ0FBQyxNQUFNLENBQzlCLHNDQUFzQyxFQUN0QyxNQUFNLENBQ1A7Z0JBQ0QsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQzthQUN0QyxDQUFDO1NBQ0gsQ0FBQyxDQUFDO1FBRUg7OzJDQUVtQztRQUNuQyxzQ0FBc0M7UUFDdEMsa0RBQWtEO1FBQ2xELHdCQUF3QjtRQUN4QixPQUFPO1FBQ1AsS0FBSztRQUVMLHVDQUF1QztRQUN2QyxtREFBbUQ7UUFDbkQseUJBQXlCO1FBQ3pCLE9BQU87UUFDUCxLQUFLO1FBRUw7OytEQUV1RDtRQUN2RCxtQkFBbUI7UUFDbkIscUNBQXFDO1FBQ3JDLDRDQUE0QztRQUM1QyxPQUFPO1FBQ1AsS0FBSztRQUVMLG9CQUFvQjtRQUNwQiwrREFBK0Q7UUFDL0QsS0FBSztJQUNQLENBQUM7Q0FDRjtBQTlDRCw4QkE4Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZm5PdXRwdXQsIFJlbW92YWxQb2xpY3ksIFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiO1xuaW1wb3J0IHsgUGlwZWxpbmVTdGFnZSB9IGZyb20gXCIuL3BpcGVsaW5lLXN0YWdlXCI7XG5pbXBvcnQge1xuICBDb2RlUGlwZWxpbmUsXG4gIFNoZWxsU3RlcCxcbiAgQ29kZVBpcGVsaW5lU291cmNlLFxuICBDb2RlQnVpbGRTdGVwLFxuICBNYW51YWxBcHByb3ZhbFN0ZXAsXG59IGZyb20gXCJhd3MtY2RrLWxpYi9waXBlbGluZXNcIjtcblxuZXhwb3J0IGNsYXNzIEFjbXNTdGFjayBleHRlbmRzIFN0YWNrIHtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqICAgIENyZWF0ZSBjb2RlcGlwZWxpbmUgZm9yIHRoZSBwcm9qZWN0IHVzaW5nIGdpdGh1YiBhcyBjb2RlIHNvdXJjZS5cbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgY29uc3QgcGlwZWxpbmUgPSBuZXcgQ29kZVBpcGVsaW5lKHRoaXMsIFwiYWNtcy1waXBlbGluZVwiLCB7XG4gICAgICBzeW50aDogbmV3IFNoZWxsU3RlcChcInN5bnRoXCIsIHtcbiAgICAgICAgaW5wdXQ6IENvZGVQaXBlbGluZVNvdXJjZS5naXRIdWIoXG4gICAgICAgICAgXCJ2ZXJueXV5L2FwYXJ0bWVudC1tYW5hZ2VtZW50LWNvbXBsZXhcIixcbiAgICAgICAgICBcIm1haW5cIlxuICAgICAgICApLFxuICAgICAgICBjb21tYW5kczogW1wibnBtIGNpXCIsIFwibnB4IGNkayBzeW50aFwiXSxcbiAgICAgIH0pLFxuICAgIH0pO1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqICAgIEFkZCB0ZXN0IHN0YWdlXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAvLyBjb25zdCBkZXZTdGFnZSA9IHBpcGVsaW5lLmFkZFN0YWdlKFxuICAgIC8vICAgbmV3IFBpcGVsaW5lU3RhZ2UodGhpcywgXCJQaXBlbGluZURldlN0YWdlXCIsIHtcbiAgICAvLyAgICAgc3RhZ2VOYW1lOiBcImRldlwiLFxuICAgIC8vICAgfSlcbiAgICAvLyApO1xuXG4gICAgLy8gY29uc3QgcHJvZFN0YWdlID0gcGlwZWxpbmUuYWRkU3RhZ2UoXG4gICAgLy8gICBuZXcgUGlwZWxpbmVTdGFnZSh0aGlzLCBcIlBpcGVsaW5lUHJvZFN0YWdlXCIsIHtcbiAgICAvLyAgICAgc3RhZ2VOYW1lOiBcInByb2RcIixcbiAgICAvLyAgIH0pXG4gICAgLy8gKTtcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqICAgIEF1dGhvbWF0ZSB1bml0IHRlc3Qgd2l0aGluIHRoZSBzdGFnZVxuICAgICAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICAvLyBkZXZTdGFnZS5hZGRQcmUoXG4gICAgLy8gICBuZXcgQ29kZUJ1aWxkU3RlcChcInVuaXQgdGVzdFwiLCB7XG4gICAgLy8gICAgIGNvbW1hbmRzOiBbXCJucG0gY2lcIiwgXCJucG0gcnVuIHRlc3RcIl0sXG4gICAgLy8gICB9KVxuICAgIC8vICk7XG5cbiAgICAvLyBkZXZTdGFnZS5hZGRQb3N0KFxuICAgIC8vICAgbmV3IE1hbnVhbEFwcHJvdmFsU3RlcChcIk1hbnVhbCBhcHJvdmFsIGJlZm9yZSBwcm9kdWN0aW9uXCIpXG4gICAgLy8gKTtcbiAgfVxufVxuIl19