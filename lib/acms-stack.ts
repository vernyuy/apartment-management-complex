import { CfnOutput, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { PipelineStage } from "./pipeline-stage";
import {
  CodePipeline,
  ShellStep,
  CodePipelineSource,
  CodeBuildStep,
  ManualApprovalStep,
} from "aws-cdk-lib/pipelines";

export class AcmsStack extends Stack {

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    /***********************************************************************
     *    Create codepipeline for the project using github as code source.
     ***********************************************************************/
    const pipeline = new CodePipeline(this, "acms-pipeline", {
      synth: new ShellStep("synth", {
        input: CodePipelineSource.gitHub(
          "vernyuy/apartment-management-complex",
          "completeCode"
        ),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });

    /*********************************
     *    Add test stage
     *********************************/
    const devStage = pipeline.addStage(
      new PipelineStage(this, "PipelineDevStage", {
        stageName: "dev",
      })
    );

    devStage.addPost(
      new ManualApprovalStep("Manual aproval before production")
    );

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
