import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as securityGroupUtils from "../interfaces/securityGroup";

export class SecurityGroupComponent extends pulumi.ComponentResource {
    private securityGroup: aws.ec2.SecurityGroup;
    public securityGroupId: pulumi.Output<string>;

    public addSecurityGroupRule(
        name: string,
        rulePrams: securityGroupUtils.SecurityGroupRuleData): aws.ec2.SecurityGroupRule {
        return new aws.ec2.SecurityGroupRule(name, {
            type: rulePrams.type,
            toPort: rulePrams.toPort as pulumi.Input<number>,
            protocol: rulePrams.protocol as pulumi.Input<string>,
            cidrBlocks: rulePrams.cidrBlocks,
            fromPort: rulePrams.fromPort as pulumi.Input<number>,
            ipv6CidrBlocks: rulePrams.ipv6CidrBlocks,
            securityGroupId: this.securityGroup.id,
            self: rulePrams.self,
            description: rulePrams.description,
        });
    };

    constructor(
        name: string,
        args: { securityGroupParamType: securityGroupUtils.SecurityGroupParamType },
        opts?: pulumi.ComponentResourceOptions) {
        // declare all the same things all over again.
        super("pkg:index:SecurityGroupComponent", name, args, opts);

        this.securityGroup = new aws.ec2.SecurityGroup(name, {
            name: args.securityGroupParamType.name,
            description: args.securityGroupParamType.description,
            vpcId: args.securityGroupParamType.vpcId,
            tags: args.securityGroupParamType.tags
        });

        // component resource that will get returned by default.
        this.registerOutputs({
            securityGroupId: this.securityGroup.id
        });

        this.securityGroupId = this.securityGroup.id;
    }
}
