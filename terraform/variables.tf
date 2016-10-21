variable "region" {
    description = "AWS region to use"
    default = "eu-west-1"
}

variable "aws_profile" {
    description = "Credential profile to use"
    default = "default"
}

variable "envelope_pkg" {
    description = "Zip package for deployment to AWS Lambda"
    default = "lambda.zip"
}

variable "deploy_stage" {
    description = "Deployment stage - e.g. dev, prod"
    default = "dev"
}
