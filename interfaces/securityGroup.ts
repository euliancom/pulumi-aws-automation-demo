import * as pulumi from "@pulumi/pulumi";

export interface SecurityGroupParamType {
    name?: string;
    description?: string;
    vpcId: pulumi.Output<string>;
    tags?: pulumi.Input<{ [key: string]: pulumi.Input<string>; }>;
}

export interface SecurityGroupRuleData {
    type: string;
    description?: string;
    self?: boolean;
    fromPort?: number;
    toPort?: number;
    protocol?: string;
    cidrBlocks?: string[];
    ipv6CidrBlocks?: string[];
}

export interface SecurityGroupData {
    name: string;
    description: string;
    rules: SecurityGroupRuleData[];
}
