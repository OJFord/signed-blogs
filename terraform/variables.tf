variable "region" {
    default     = "eu-west-1"
}

variable "aws_profile" {
    description = "Credential profile to use"
}

variable "envelope_pkg" {
    description = "Zip package for deployment to AWS Lambda"
}

variable "deploy_stage" {
    description = "Deployment stage - e.g. dev, prod"
}
