"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AcmsStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const pipeline_stage_1 = require("./pipeline-stage");
const pipelines_1 = require("aws-cdk-lib/pipelines");
class AcmsStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        /***********************************************************************
         *    Create codepipeline for the project using github as code source.
         ***********************************************************************/
        const pipeline = new pipelines_1.CodePipeline(this, "acms-pipeline", {
            synth: new pipelines_1.ShellStep("synth", {
                input: pipelines_1.CodePipelineSource.gitHub("vernyuy/apartment-management-complex", "completeCode"),
                commands: ["npm ci", "npm run build", "npx cdk synth"],
            }),
        });
        /*********************************
         *    Add test stage
         *********************************/
        const devStage = pipeline.addStage(new pipeline_stage_1.PipelineStage(this, "PipelineDevStage", {
            stageName: "dev",
        }));
        devStage.addPost(new pipelines_1.ManualApprovalStep("Manual aproval before production"));
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
    }
}
exports.AcmsStack = AcmsStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNtcy1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFjbXMtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQTBFO0FBRTFFLHFEQUFpRDtBQUNqRCxxREFNK0I7QUFFL0IsTUFBYSxTQUFVLFNBQVEsbUJBQUs7SUFFbEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4Qjs7aUZBRXlFO1FBQ3pFLE1BQU0sUUFBUSxHQUFHLElBQUksd0JBQVksQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ3ZELEtBQUssRUFBRSxJQUFJLHFCQUFTLENBQUMsT0FBTyxFQUFFO2dCQUM1QixLQUFLLEVBQUUsOEJBQWtCLENBQUMsTUFBTSxDQUM5QixzQ0FBc0MsRUFDdEMsY0FBYyxDQUNmO2dCQUNELFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxlQUFlLEVBQUUsZUFBZSxDQUFDO2FBQ3ZELENBQUM7U0FDSCxDQUFDLENBQUM7UUFFSDs7MkNBRW1DO1FBQ25DLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQ2hDLElBQUksOEJBQWEsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDMUMsU0FBUyxFQUFFLEtBQUs7U0FDakIsQ0FBQyxDQUNILENBQUM7UUFFRixRQUFRLENBQUMsT0FBTyxDQUNkLElBQUksOEJBQWtCLENBQUMsa0NBQWtDLENBQUMsQ0FDM0QsQ0FBQztRQUVGLHVDQUF1QztRQUN2QyxtREFBbUQ7UUFDbkQseUJBQXlCO1FBQ3pCLE9BQU87UUFDUCxLQUFLO1FBRUw7OytEQUV1RDtRQUN2RCxtQkFBbUI7UUFDbkIscUNBQXFDO1FBQ3JDLDRDQUE0QztRQUM1QyxPQUFPO1FBQ1AsS0FBSztJQUNQLENBQUM7Q0FDRjtBQTlDRCw4QkE4Q0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZm5PdXRwdXQsIFJlbW92YWxQb2xpY3ksIFN0YWNrLCBTdGFja1Byb3BzIH0gZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiO1xuaW1wb3J0IHsgUGlwZWxpbmVTdGFnZSB9IGZyb20gXCIuL3BpcGVsaW5lLXN0YWdlXCI7XG5pbXBvcnQge1xuICBDb2RlUGlwZWxpbmUsXG4gIFNoZWxsU3RlcCxcbiAgQ29kZVBpcGVsaW5lU291cmNlLFxuICBDb2RlQnVpbGRTdGVwLFxuICBNYW51YWxBcHByb3ZhbFN0ZXAsXG59IGZyb20gXCJhd3MtY2RrLWxpYi9waXBlbGluZXNcIjtcblxuZXhwb3J0IGNsYXNzIEFjbXNTdGFjayBleHRlbmRzIFN0YWNrIHtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqICAgIENyZWF0ZSBjb2RlcGlwZWxpbmUgZm9yIHRoZSBwcm9qZWN0IHVzaW5nIGdpdGh1YiBhcyBjb2RlIHNvdXJjZS5cbiAgICAgKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4gICAgY29uc3QgcGlwZWxpbmUgPSBuZXcgQ29kZVBpcGVsaW5lKHRoaXMsIFwiYWNtcy1waXBlbGluZVwiLCB7XG4gICAgICBzeW50aDogbmV3IFNoZWxsU3RlcChcInN5bnRoXCIsIHtcbiAgICAgICAgaW5wdXQ6IENvZGVQaXBlbGluZVNvdXJjZS5naXRIdWIoXG4gICAgICAgICAgXCJ2ZXJueXV5L2FwYXJ0bWVudC1tYW5hZ2VtZW50LWNvbXBsZXhcIixcbiAgICAgICAgICBcImNvbXBsZXRlQ29kZVwiXG4gICAgICAgICksXG4gICAgICAgIGNvbW1hbmRzOiBbXCJucG0gY2lcIiwgXCJucG0gcnVuIGJ1aWxkXCIsIFwibnB4IGNkayBzeW50aFwiXSxcbiAgICAgIH0pLFxuICAgIH0pO1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICAgICAqICAgIEFkZCB0ZXN0IHN0YWdlXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbiAgICBjb25zdCBkZXZTdGFnZSA9IHBpcGVsaW5lLmFkZFN0YWdlKFxuICAgICAgbmV3IFBpcGVsaW5lU3RhZ2UodGhpcywgXCJQaXBlbGluZURldlN0YWdlXCIsIHtcbiAgICAgICAgc3RhZ2VOYW1lOiBcImRldlwiLFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgZGV2U3RhZ2UuYWRkUG9zdChcbiAgICAgIG5ldyBNYW51YWxBcHByb3ZhbFN0ZXAoXCJNYW51YWwgYXByb3ZhbCBiZWZvcmUgcHJvZHVjdGlvblwiKVxuICAgICk7XG5cbiAgICAvLyBjb25zdCBwcm9kU3RhZ2UgPSBwaXBlbGluZS5hZGRTdGFnZShcbiAgICAvLyAgIG5ldyBQaXBlbGluZVN0YWdlKHRoaXMsIFwiUGlwZWxpbmVQcm9kU3RhZ2VcIiwge1xuICAgIC8vICAgICBzdGFnZU5hbWU6IFwicHJvZFwiLFxuICAgIC8vICAgfSlcbiAgICAvLyApO1xuXG4gICAgLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gICAgICogICAgQXV0aG9tYXRlIHVuaXQgdGVzdCB3aXRoaW4gdGhlIHN0YWdlXG4gICAgICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuICAgIC8vIGRldlN0YWdlLmFkZFByZShcbiAgICAvLyAgIG5ldyBDb2RlQnVpbGRTdGVwKFwidW5pdCB0ZXN0XCIsIHtcbiAgICAvLyAgICAgY29tbWFuZHM6IFtcIm5wbSBjaVwiLCBcIm5wbSBydW4gdGVzdFwiXSxcbiAgICAvLyAgIH0pXG4gICAgLy8gKTtcbiAgfVxufVxuIl19