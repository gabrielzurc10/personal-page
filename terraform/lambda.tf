locals {
  lambda_zip = "${path.module}/build/lambda.zip"

  # AWS Lambda Web Adapter: runs uvicorn inside the Lambda and proxies
  # invocations to it over HTTP, which is what enables response streaming for a
  # Python app (Lambda only streams natively from Node.js runtimes).
  # https://github.com/awslabs/aws-lambda-web-adapter
  lwa_layer_arn = "arn:aws:lambda:${var.aws_region}:753240598075:layer:LambdaAdapterLayerX86:${var.lwa_layer_version}"
}

resource "aws_lambda_function" "backend" {
  function_name = "${local.name_prefix}-backend"
  role          = aws_iam_role.lambda.arn
  runtime       = "python3.12"
  architectures = ["x86_64"]
  # With the Web Adapter the "handler" is the startup script that launches
  # uvicorn (see backend/run.sh), not a Python callable.
  handler  = "run.sh"
  filename = local.lambda_zip
  # Rebuild-aware: changes to the zip trigger an update.
  source_code_hash = filebase64sha256(local.lambda_zip)
  memory_size      = var.lambda_memory_mb
  timeout          = var.lambda_timeout_s
  layers           = [local.lwa_layer_arn]

  environment {
    variables = {
      OPENAI_API_KEY = var.openai_api_key
      MEMORY_BUCKET  = aws_s3_bucket.memory.id
      CORS_ORIGINS   = local.use_domain ? "https://${var.domain_name},https://www.${var.domain_name}" : "https://${aws_cloudfront_distribution.frontend.domain_name}"

      # Lambda Web Adapter configuration.
      AWS_LAMBDA_EXEC_WRAPPER      = "/opt/bootstrap"
      AWS_LWA_INVOKE_MODE          = "response_stream"
      AWS_LWA_READINESS_CHECK_PATH = "/health"
      PORT                         = "8000"
    }
  }
}

resource "aws_cloudwatch_log_group" "backend" {
  name              = "/aws/lambda/${aws_lambda_function.backend.function_name}"
  retention_in_days = 14
}
