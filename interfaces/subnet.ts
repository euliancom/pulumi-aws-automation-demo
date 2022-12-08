import * as pulumi from "@pulumi/pulumi";

export interface SubnetParamType {
    cidrBlock?: string;
    vpcId: pulumi.Output<string>;
    availabilityZone?: string;
    mapPublicIpOnLaunch?: boolean;
    tags?: pulumi.Input<{ [key: string]: pulumi.Input<string>; }>;
}

export interface SubnetData {
    cidrBlock: string;
    availabilityZone: string;
    mapPublicIpOnLaunch: boolean;
}
