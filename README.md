# Pulumi Automation Demo using AWS Cloud Provider

The purpose of this repository is to show case pulumi automation for AWS
Cloud. This demo will provision the following cloud resources associated to
corresponding pulumi configurations:

| AWS Resource | Pulumi Resource | Link to TerraHub Config |
|-----------------------|--------------------|-------------------------|
| Security Group | aws_security_group | [components/securityGroup.ts#L2](https://github.com/euliancom/pulumi-aws-automation-demo/blob/main/components/securityGroup.ts#L2) |
| Subnet | aws_subnet | [components/subnet.ts#L2](https://github.com/euliancom/pulumi-aws-automation-demo/blob/main/components/subnet.ts#L2) |
| VPC | aws_vpc | [components/vpc.ts#L2](https://github.com/euliancom/pulumi-aws-automation-demo/blob/main/components/vpc.ts#L2) |

Follow below instructions to try this out in your own AWS Cloud account.

## Create IAM User
1. Sign in to the AWS Management Console and open the IAM console at https://console.aws.amazon.com/iam/
2. In the navigation pane, choose Users and then choose Add user
3. Type the user name for the new user
4. Select the type of access: `Programmatic access`
5. Choose `Next`: Permissions
6. On the Set permissions page, choose `Attach existing policies to user directly` and select `IAMFullAccess`
7. Choose Next: Review to see all of the choices you made up to this point
8. Choose `Create`

## Get Access Key ID and Secret Access Key for IAM User
1. Open the IAM console
2. In the navigation pane of the console, choose Users
3. Choose your IAM user name (not the check box)
4. Choose the Security credentials tab and then choose Create access key
5. To see the new access key, choose Show. Your credentials will look something like this:
  - Access Key ID: AKIAIOSFODNEXAMPLEID
  - Secret Access Key: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY

## Configure AWS CLI with IAM Credentials

Run the following command in terminal:
```shell
aws configure
```

Your output should be similar to the one below:
```
AWS Access Key ID [None]: AKIAIOSFODNEXAMPLEID
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-east-1
Default output format [None]: json
```

> NOTE: If you don't have AWS CLI, check out
[installation guide](https://docs.aws.amazon.com/cli/latest/userguide/installing.html)

## Setup Environment Variables (Will Be Used Later)

Manual Setup (set values in double quotes and run the following commands in terminal):
```shell
export AWS_ACCOUNT_ID=""     ## e.g. 123456789012
export AWS_DEFAULT_REGION="" ## e.g. us-east-1
```

### Setup AWS_ACCOUNT_ID Programmatically

Automated Setup (run the following command in terminal):
```shell
export AWS_ACCOUNT_ID="$(aws sts get-caller-identity --output=text --query='Account')"
```

### Setup AWS_DEFAULT_REGION Programmatically

Automated Setup (run the following command in terminal):
```shell
export AWS_DEFAULT_REGION="$(aws configure get region --output=text)"
```

## Pulumi Automation and Orchestration Tool

The next couple of paragraphs are showcasing the process of creating pulumi
automation process using:

### MacOs

`brew install pulumi/tap/pulumi`

### Windows

`choco install pulumi`

### Linux

`curl -fsSL https://get.pulumi.com | sh`

Run the following commands in terminal:
```shell
pulumi --help | head -3
```

Your output should be similar to the one below:
```
Pulumi - Modern Infrastructure as Code
```

> NOTE: If you don't have NodeJS, check out this
[Node.js Install](https://nodejs.org/en/download/)

