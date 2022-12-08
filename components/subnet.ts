import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as subnetUtils from "../interfaces/subnet";

export class SubnetComponent extends pulumi.ComponentResource {
    private subnet: aws.ec2.Subnet;
    public subnetId: pulumi.Output<string>;
    public availabilityZone: pulumi.Output<string>;

    constructor(name: string, args: { subnetParamType: subnetUtils.SubnetParamType }, opts?: pulumi.ComponentResourceOptions) {
        // declare all the same things all over again.
        super("pkg:index:SubnetComponent", name, args, opts);

        this.subnet = new aws.ec2.Subnet(name, {
            cidrBlock: args.subnetParamType.cidrBlock,
            vpcId: args.subnetParamType.vpcId,
            availabilityZone: args.subnetParamType.availabilityZone,
            mapPublicIpOnLaunch: args.subnetParamType.mapPublicIpOnLaunch,
            tags: args.subnetParamType.tags,
        });

        // component resource that will get returned by default.
        this.registerOutputs({
            subnetId: this.subnet.id,
            subnetArn: this.subnet.arn,
            availabilityZone: this.subnet.availabilityZone,
        });

        this.subnetId = this.subnet.id;
        this.availabilityZone = this.subnet.availabilityZone;
    }
}
