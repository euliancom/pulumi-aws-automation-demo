import * as pulumi from "@pulumi/pulumi";
import * as vpc from "./components/vpc";
import * as subnet from "./components/subnet";
import * as securityGroup from "./components/securityGroup";
import * as tagUtils from "./interfaces/tag";
import * as subnetUtils from "./interfaces/subnet";
import * as securityGroupUtils from "./interfaces/securityGroup";

const tagConfig = new pulumi.Config("tags");
const tagData = tagUtils.mapTag(tagConfig.requireObject<tagUtils.TagData>("data"));
const vpcConfig = new pulumi.Config("vpc");

const vpcComponent = new vpc.VpcComponent(`vpc-${pulumi.getStack()}`, {
    vpcParamType: {
        cidrBlock: vpcConfig.require("cidrBlock"),
        assignGeneratedIpv6CidrBlock: Boolean(vpcConfig.require("assignGeneratedIpv6CidrBlock")),
        enableDnsHostnames: Boolean(vpcConfig.require("enableDnsHostnames")),
        enableDnsSupport: Boolean(vpcConfig.require("enableDnsSupport")),
        instanceTenancy: vpcConfig.require("instance-tenancy"),
        tags: tagData
    },
});

const subnetConfig = new pulumi.Config("subnet");
let subnetData = subnetConfig.requireObject<subnetUtils.SubnetData[]>("data");

const subnetComponents = subnetData.forEach(function (data) {
    return new subnet.SubnetComponent(`main-${data.availabilityZone}-${data.cidrBlock}-${pulumi.getStack()}`, {
        subnetParamType: {
            vpcId: vpcComponent.vpcId,
            cidrBlock: data.cidrBlock,
            availabilityZone: data.availabilityZone,
            mapPublicIpOnLaunch: data.mapPublicIpOnLaunch,
            tags: tagData
        }
    });
});

const securityGroupConfig = new pulumi.Config("securityGroup");
let securityGroupData = securityGroupConfig.requireObject<securityGroupUtils.SecurityGroupData[]>("data");

const securityGroupComponents = securityGroupData.forEach(function (data) {
    const securityGroupComponent = new securityGroup.SecurityGroupComponent(`main-${data.name}-${pulumi.getStack()}`, {
        securityGroupParamType: {
            vpcId: vpcComponent.vpcId,
            name: data.name,
            description: data.description,
            tags: tagData
        }
    });

    let count = 0;
    data.rules.forEach(function (dataRule) {
        securityGroupComponent.addSecurityGroupRule(
            `main-${data.name}-rule-${count++}-${pulumi.getStack()}`,
            dataRule
        );
    });

    return securityGroupComponent;
});