resource "aws_iam_role" "lambda" {
    name               = "Lambda-IAM-role"
    assume_role_policy = "${file("${path.module}/policies/lambda_role.json")}"
}
