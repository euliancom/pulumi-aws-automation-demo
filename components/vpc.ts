import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as vpcUtils from "../interfaces/vpc";


export class VpcComponent extends pulumi.ComponentResource {
    private vpc: aws.ec2.Vpc;
    public vpcId: pulumi.Output<string>;

    constructor(name: string, args: { vpcParamType: vpcUtils.VpcParamType }, opts?: pulumi.ComponentResourceOptions) {
        // declare all the same things all over again.
        super("pkg:index:VpcComponent", name, args, opts);

        this.vpc = new aws.ec2.Vpc(name, {
            cidrBlock: args.vpcParamType.cidrBlock,
            assignGeneratedIpv6CidrBlock: args.vpcParamType.assignGeneratedIpv6CidrBlock,
            enableDnsHostnames: args.vpcParamType.enableDnsHostnames,
            enableDnsSupport: args.vpcParamType.enableDnsSupport,
            instanceTenancy: args.vpcParamType.instanceTenancy,
            tags: args.vpcParamType.tags,
        });

        // component resource that will get returned by default.
        this.registerOutputs({
            vpcId: this.vpc.id,
            vpcArn: this.vpc.arn,
        });

        this.vpcId = this.vpc.id;
    }
}
