resource "aws_api_gateway_rest_api" "envelope" {
    name = "Envelope"
}

resource "aws_api_gateway_resource" "Letters" {
    rest_api_id = "${aws_api_gateway_rest_api.envelope.id}"
    parent_id = "${aws_api_gateway_rest_api.envelope.root_resource_id}"
    path_part = "{user}"
}

resource "aws_api_gateway_method" "list_letters" {
    rest_api_id = "${aws_api_gateway_rest_api.envelope.id}"
    resource_id = "${aws_api_gateway_resource.Letters.id}"
    http_method = "GET"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "list_letters" {
    rest_api_id = "${aws_api_gateway_rest_api.envelope.id}"
    resource_id = "${aws_api_gateway_resource.Letters.id}"
    http_method = "${aws_api_gateway_method.list_letters.http_method}"
    uri = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${aws_lambda_function.envelope.arn}/invocations"
    type = "AWS"
    integration_http_method = "POST"
    passthrough_behavior = "NEVER"
    request_templates = {
        "application/json"="${file("${path.module}/templates/list_letters.json")}"
    }
}

resource "aws_api_gateway_method_response" "list_letters" {
    rest_api_id = "${aws_api_gateway_rest_api.envelope.id}"
    resource_id = "${aws_api_gateway_resource.Letters.id}"
    http_method = "${aws_api_gateway_method.list_letters.http_method}"
    status_code = "200"
}

resource "aws_api_gateway_integration_response" "list_letters" {
    depends_on = [
        "aws_api_gateway_integration.list_letters",
    ]
    rest_api_id = "${aws_api_gateway_rest_api.envelope.id}"
    resource_id = "${aws_api_gateway_resource.Letters.id}"
    http_method = "${aws_api_gateway_method.list_letters.http_method}"
    status_code = "${aws_api_gateway_method_response.list_letters.status_code}"
    response_templates = {
        "text/html"="$input.path('$')"
    }
    response_parameters = {
        "method.response.header.Content-Type"="'text/html'"
    }
}

resource "aws_api_gateway_resource" "Letter" {
    rest_api_id = "${aws_api_gateway_rest_api.envelope.id}"
    parent_id = "${aws_api_gateway_resource.Letters.id}"
    path_part = "{title}"
}

resource "aws_api_gateway_method" "read_letter" {
    rest_api_id = "${aws_api_gateway_rest_api.envelope.id}"
    resource_id = "${aws_api_gateway_resource.Letter.id}"
    http_method = "GET"
    authorization = "NONE"
}

resource "aws_api_gateway_integration" "read_letter" {
    rest_api_id = "${aws_api_gateway_rest_api.envelope.id}"
    resource_id = "${aws_api_gateway_resource.Letter.id}"
    http_method = "${aws_api_gateway_method.read_letter.http_method}"
    uri = "arn:aws:apigateway:${var.region}:lambda:path/2015-03-31/functions/${aws_lambda_function.envelope.arn}/invocations"
    type = "AWS"
    integration_http_method = "POST"
    passthrough_behavior = "NEVER"
    request_templates = {
        "application/json"="${file("${path.module}/templates/read_letter.json")}"
    }
}

resource "aws_api_gateway_method_response" "read_letter" {
    rest_api_id = "${aws_api_gateway_rest_api.envelope.id}"
    resource_id = "${aws_api_gateway_resource.Letter.id}"
    http_method = "${aws_api_gateway_method.read_letter.http_method}"
    status_code = "200"
}

resource "aws_api_gateway_integration_response" "read_letter" {
    depends_on = [
        "aws_api_gateway_integration.read_letter"
    ]
    rest_api_id = "${aws_api_gateway_rest_api.envelope.id}"
    resource_id = "${aws_api_gateway_resource.Letter.id}"
    http_method = "${aws_api_gateway_method.read_letter.http_method}"
    status_code = "${aws_api_gateway_method_response.read_letter.status_code}"
    response_templates = {
        "text/html"="$input.path('$')"
    }
    response_parameters = {
        "method.response.header.Content-Type"="'text/html'"
    }
}

resource "aws_api_gateway_deployment" "envelope" {
    depends_on = [
        "aws_api_gateway_integration.list_letters",
        "aws_api_gateway_integration.read_letter"
    ]
    rest_api_id = "${aws_api_gateway_rest_api.envelope.id}"
    stage_name = "${var.deploy_stage}"
}
