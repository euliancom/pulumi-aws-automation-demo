import * as pulumi from "@pulumi/pulumi";

export interface VpcParamType {
    cidrBlock: string;
    assignGeneratedIpv6CidrBlock?: boolean;
    enableDnsHostnames?: boolean;
    enableDnsSupport?: boolean;
    instanceTenancy?: string;
    tags?: pulumi.Input<{ [key: string]: pulumi.Input<string>; }>;
}
