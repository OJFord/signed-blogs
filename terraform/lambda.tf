resource "aws_lambda_function" "envelope" {
    filename            = "${var.envelope_pkg}"
    function_name       = "envelope"
    role                = "${aws_iam_role.lambda.arn}"
    handler             = "envelope.handler"
    source_code_hash    = "${base64sha256(file("${var.envelope_pkg}"))}"
    runtime             = "python2.7"
}

resource "aws_lambda_permission" "allow_api_gateway" {
    function_name = "${aws_lambda_function.envelope.function_name}"
    statement_id = "AllowExecutionFromApiGateway"
    action = "lambda:InvokeFunction"
    principal = "apigateway.amazonaws.com"
}
