# Zyme - Caucus integration

This demo is based on a real story. All names have been changed with random words. In short there is a company (let's call it Zyme) operating in a particular business sector. It has its customer base. Then there's a 3rd party system (we call it Caucus) doing all sorts of good things. We would like to build an integration app that would allow Zyme customers to authenticate into Caucus.

Tech stack is: Java, Vert.x, no framework JavaScript, Sass, AWS CloudFormation, CodePipeline ECS Fargate.

## Scenario

1. User is redirected from Caucus to our app with `nonce` and `callbackUrl` query parameters. We need to validate `callbackUrl` and then call it with a provided `nonce` value in order to obtain authentication JWT token.

2. Authentication JWT is validated with a shared signing key stored as a secret and then user is prompted for credentials.

3. After a successful login user is presented with all his/her roles. Each one has a unique ID recognized globally by all the other systems of this kind.

4. We generate a new JWT that is signed with the same shared key and it is send back to Caucus for verification.

5. User is redirected to url that comes from a Caucus verification response.

To call our Zyme endpoints we use private AWS API Gateway. Reason is that its public API Gateway does not include some endpoints we rely on.

## Development environment  

Application requires both Caucus server and Zyme customer API. In our development environment will be using same mock implementing both. From [dev](dev) directory run
```shell
docker-compose -p zyme-caucus build && docker-compose -p zyme-caucus up
```

A fresh start will take longer time. Good sign of application readiness is this line `Config - Configuration parsing completed`. More detailed dev env documentation can be fond under [dev](dev).

Now when you have it running you can test different scenarios. You can follow all the calls in a docker-compose output.

Description | URL
:--- | :---
... | http://127.0.0.1:8080/?callbackUrl=https://host.docker.internal/creator-identifiers/integration/{nonce}&nonce=nonceok
... | http://127.0.0.1:8080/?callbackUrl=https://host.docker.internal/creator-identifiers/integration/{nonce}&nonce=notfound
... | http://127.0.0.1:8080/?callbackUrl=https://host.docker.internal/creator-identifiers/integration/{nonce}&nonce=failandredirect
... | http://127.0.0.1:8080/?callbackUrl=https://host.docker.internal/creator-identifiers/integration/{nonce}&nonce=failandinform
... | http://127.0.0.1:8080/?callbackUrl=https://host.docker.internal/creator-identifiers/integration/{nonce}&nonce=verifyfailwithredirect

## Configuration  

We use profiles that you can find in [src/main/profiles](src/main/profiles) directory. Besides that there are some settings that are passed as environment variables to application Docker container.

Variable | Description
:--- |:---
ZYME_API_ENDPOINT_DNS | Endpoint-specific DNS hostname.
ZYME_API_HOST | API url, which is passed as a `Host` header.
SECRET_CAUCUS_JWT_KEY | Shared Caucus JWT signing key that we store under AWS Secrets Manager.
SECRET_ZYME_JWT_KEY | Zyme JWT signing key. Stored as AWS secret that is shared between our application and other Zyme systems.

[Here](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-api-test-invoke-url.html#apigateway-private-api-public-dns) is why we have two values for Zyme API. Remember we use private AWS API Gateway.

## AWS setup  
> **_NOTE:_** There is no development setup for AWS infrastructure. Even though this section looks very well documented you're on your own here. However this info might be helpful for some of you.

We deploy application via AWS Fargate from Docker image stored in ECR repository. Image is built by CodeBuild that is invoked from CodePipeline. Deployment is done by `Deploy` action of pipeline via CloudFormation. There are two CloudFormation stack types &mdash; [CodePipeline stack](#codepipeline-stack) (one in total) and [ECS stack](#ecs-stack) (one per each deployment/environment). The first one should be created/updated manually and the latter is invoked by CodePipeline as described above.

### ECR repository  
It makes it easier if you use same ECR repository for all environments. If you run environments on different AWS accounts then and still want to use same ECR repository then it must be configured for cross-account access. For that reason it should be created manually either via [AWS ECR CLI](#aws-ecr-cli) or via [ECR console](#ecr-console). ARN of this repository should be passed to [CodePipeline stack](#codepipeline-stack) as parameter.

#### ECR cross-account access  
To set it up you need to allow access to specific roles that will run CodeBuild projects and ECS tasks. CodeBuild service roles are created by [CodePipeline stack](#codepipeline-stack) and can be found under stack resources by `CodeBuildServiceRole` logical id. ECS task execution roles are created by [ECS stack](#ecs-stack) and have logical id `TaskExecutionRole`. All those roles must allowed for push and/or pull access in ECR repository policy. Check [ECR repository policy examples](https://docs.aws.amazon.com/AmazonECR/latest/userguide/RepositoryPolicyExamples.html) for more information.

#### AWS ECR CLI  
Create repository under desired account. Name can be changed to anything, just remember to use the same string when working with repository via CLI.
```shell
# use default settings
aws ecr create-repository --repository-name bizm/zyme-caucus-integration

# specify image scanning and tag mutability (if supported by your AWS CLI version)
aws ecr create-repository --repository-name bizm/zyme-caucus-integration --image-tag-mutability MUTABLE --image-scanning-configuration scanOnPush=true
```

Note repository ARN in output. This ARN should be passed to [pipeline CloudFormation template](#codepipeline-stack) as a parameter. To find out ARN via AWS CLI run:
```shell
# will print json with all the repository settings
aws ecr describe-repositories --repository-name bizm/zyme-caucus-integration
```

Update ECR repository policy to allow cross-account CodeBuild and ECS task execution roles:
```shell
# update
aws ecr set-repository-policy --repository-name bizm/zyme-caucus-integration --policy-text '{
  "Version": "2012-10-17",
  "Statement": [
    <list-of-ECR-policy-statements>
  ]
}'
```
Consult [ECR repository policy](#ecr-repository-policy) section for policy structure.  Remember that `aws ecr set-repository-policy` command does not append policy but replaces it, so be careful not to remove those roles that are already allowed. Policy can also be updated via AWS ECR console.

#### ECR console  
To create ECR repository from AWS console go to 'ECR' service and create repository. 'Tag immutability' should be disabled and 'Scan on push' enabled.

Repository ARN has format `arn:aws:ecr:<region>:<aws-account-id>:repository/<repository-name>`. This ARN should be passed to [CodePipeline template](#codepipeline-stack) as a parameter.

Open created repository and go to 'Permissions'. Click 'Edit policy JSON' and update it to allow access for cross-account CodeBuild and ECS task execution roles. Consult [ECR repository policy](#ecr-repository-policy) section for policy structure.

#### ECR repository policy  
See also [ECR repository policy examples](https://docs.aws.amazon.com/AmazonECR/latest/userguide/RepositoryPolicyExamples.html) for more examples.
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CodeBuildAccess",
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          <list-of-all-role-arns-with-push-and-pull-access>
        ]
      },
      "Action": [
        "ecr:BatchCheckLayerAvailability",
        "ecr:CompleteLayerUpload",
        "ecr:DescribeRepositories",
        "ecr:GetDownloadUrlForLayer",
        "ecr:InitiateLayerUpload",
        "ecr:PutImage",
        "ecr:UploadLayerPart"
      ]
    },
    {
      "Sid": "EcsAccess",
      "Effect": "Allow",
      "Principal": {
        "AWS": [
          <list-of-all-role-arns-with-pull-access>
        ]
      },
      "Action": [
        "ecr:BatchCheckLayerAvailability",
        "ecr:BatchGetImage",
        "ecr:GetDownloadUrlForLayer"
      ]
    }
  ]
}
```

### CodePipeline stack  
Creates a CodePipeline that builds Docker image, pushes it to ECR repository and deploys ECS service via CloudFormation.

Parameters:

Parameter name | Default value | Description
:--- |:--- |:---
Environment | `test` | Name of environment. Allowed values are: `test`, `prod`
ECRRepositoryArn |  | ARN of [ECR repository](#ecr-repository)
GitHubOwner | `bizm` | Owner of GitHub repository
GitHubRepository | `zyme-caucus-integration` | Name of GitHub repository
GitHubBranch |  | Name of GitHub branch to be tracked by this pipeline

CodePipeline CloudFormation template is located in [aws/codepipeline.yml](aws/codepipeline.yml). It creates:

Logical ID | Resource description
:--- |:---
DockerBuildProject | CodeBuild project to build jar package and Docker image
CodeBuildServiceRole | CodeBuild service role &mdash; requires [push and pull permissions](#ecr-cross-account-access) to ECR repository
CodePipelineArtifactStoreBucket | S3 bucket for CodePipline artifact store
CodePipelineArtifactStoreBucketPolicy | S3 bucket policy for above mentioned bucket
CodePipline | CodePipeline having:
&nbsp; | - `Source` action with GitHub action provider
&nbsp; | - `Build` action with AWS CodeBuild action provider
&nbsp; | - `Deploy` action with AWS CloudFormation action provider
CodePipelineServiceRole | CodePipeline service role
CloudFormationServiceRole | CloudFormation role

CodePipeline needs to be created/updated manually either via AWS console or via [AWS CLI](https://docs.aws.amazon.com/cli/latest/index.html):
```shell
# create stack for CodePipeline
aws cloudformation create-stack --stack-name zyme-caucus-int-test-pipeline --template-body file://codepipeline.yml --parameters ParameterKey=Environment,ParameterValue=test ParameterKey=ECRRepositoryArn,ParameterValue=<ECR Repository ARN> ParameterKey=GitHubOwner,ParameterValue=<GitHub owner> ParameterKey=GitHubBranch,ParameterValue=<GitHub branch> ParameterKey=CertificateArn,ParameterValue=<Certificate ARN> --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM

# update CodePipeline stack
aws cloudformation update-stack --stack-name zyme-caucus-int-test-pipeline --template-body file://codepipeline.yml --parameters ParameterKey=Environment,UsePreviousValue=true ParameterKey=ECRRepositoryArn,UsePreviousValue=true --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM
aws cloudformation update-stack --stack-name zyme-caucus-int-test-pipeline --template-body file://codepipeline.yml --parameters ParameterKey=Environment,UsePreviousValue=true ParameterKey=ECRRepositoryArn,UsePreviousValue=true ParameterKey=GitHubOwner,UsePreviousValue=true ParameterKey=GitHubBranch,UsePreviousValue=true ParameterKey=CertificateArn,UsePreviousValue=true --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM
```
### ECS stack  
Creates all the resources required to run AWS Fargate. This stack is created by Build action of [CodePipeline](#codepipeline-stack). Some parameters should be specified in `aws/ecs-config-<environment>.json` file, others are provided by pipeline.

Parameters:

Parameter name | Default value | Description
:--- |:--- |:---
Vpc |  | Id of VPC to be used by ECS service. Should be specified in `aws/ecs-config-<environment>.json`
Subnets |  | Ids of Subnets to be used by ECS service. Should be specified in `aws/ecs-config-<environment>.json`
Port | `8080` | Container port
Environment |  | Environment name. Provided by CodePipeline created by [CodePipeline stack](#codepipeline-stack).
PipelineStackName |  | Name of pipeline that creates this stack. Provided by CodePipeline created by [CodePipeline stack](#codepipeline-stack).
DockerImageURI |  | Docker image URI to be used by Task Definition. Provided by CodePipeline created by [CodePipeline stack](#codepipeline-stack).

ECS CloudFormation template is located in [aws/ecs.yml](aws/ecs.yml). It describes the following resources

Logical ID | Resource description
:--- |:---
Cluster | ECS Cluster
TaskDefinition | Task Definition including:
TaskRole | [ECS Task role](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_IAM_role.html)
TaskExecutionRole | [Task execution role](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_execution_IAM_role.html) &mdash; requires [pull permissions](#ecr-cross-account-access) to ECR repository
TaskLogGroup | Task Log group
TaskLogStream | Task Log stream
Service | ECS service
PublicLoadBalancer | Load balancer
TargetGroup | Target group
ListenerHTTP | Listener
SecurityGroup | Security group

In short AWS Fargate works so that ECS Service starts tasks based on provided Task Definition and Desired count. Tasks need to pull specified docker image(s) and launch container(s) according to definition. When desired count of tasks is reached ECS Service reports to CloudFormation and `CREATE_COMPLETE` event is shown for Service. Problem is that if task doesn't start Service doesn't report failure but keep on trying launching new task(s) and in CloudFormation resource remains in `CREATE_IN_PROGRESS`. It would make sense to monitor ECS Service while CloudFormation stack creation/update is in progress. Service events show information about tasks that have been started, targets registered in target group (in case task launch was successful) and state of a service. When event saying `service <service-name> has reached a steady state` resource is created. Task(s) can provide more detailed information about failure. One possible reason is lack of pull premissions to ECR repository. In that case task is not able to pull docker image and thus stops. This particular case should be solved according to [ECR cross-account access](#ecr-cross-account-access) section.

### Private API Gateway capriciousness  

> **_NOTE:_** This lady is a pain! Seriously, if you don't need to use private API Gateway just don't! Otherwise reserve a few extra week for tearing off your hear and beating your head against the wall. Here are my observations, hope they help.

Private API in order to function correctly requires a number of resources to be set up properly. Problem is that error messages are not descriptive enough an don't help to solve the problem. One example is this error:
```
'...' not a valid key=value pair (missing equal-sign) in Authorization header: 'Bearer: ...'."
```
In fact the reason was missing method in stage after API was updated but wasn't deployed. Another typical error is
```
User: anonymous is not authorized to perform: execute-api:Invoke on resource: arn:aws:execute-api:eu-central-1:************:.../api/.../...
```
which informs you about improper configuration. Here's a small checklist that you could go through.
1. Under the `Resources` verify that method exists, it point to correct VPC Link it doesn't require any API key and it's `Authorization` setting is set to `NONE`.
2. Inspect the stage and verify that it reflects all the latest changes. If not redeploy it.
3. In the `Settings` inspect Endpoint configuration and make sure that `Endpoint Type` is set to `Private` and correct VPC endpoint id is listed.
4. Inspect `Resource Policy`. Make sure that policy is present -- private API doesn't work without policy specified. Make sure that policy indeed allows `execute-api:Invoke` action for your VPC.
5. Open VPC endpoint. It must have status `available`, it must be of type `interface`, service name must be `com.amazonaws.<region>.execute-api` and private DNS names should be disabled (`false`).
6. Check security group assigned to VPC endpoint. It must allow inbound HTTPS (port 443) traffic for VPC CIDR block.
7. Inspect task execution role. Please note that task execution role is different from task role. Easiest way to find it is to open a task definition and find a link to role under `Task execution IAM role` section. Verify that role policy summary allows `execute-api:Invoke` for API arn (should look like `arn:aws:execute-api:<region>:<accountId>:<apiId>/*/*/*`).
8. Also ensure that application invokes API via [endpoint-specific public DNS hostname](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-private-api-test-invoke-url.html#apigateway-private-api-public-dns). That means request should be sent to VPC endpoint DNS name (check DNS names under endpoint Details) and API url should be passed as `Host` header.
