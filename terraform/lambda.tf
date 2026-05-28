locals {
  lambda_zip = "${path.module}/build/lambda.zip"
}

resource "aws_lambda_function" "backend" {
  function_name = "${local.name_prefix}-backend"
  role          = aws_iam_role.lambda.arn
  runtime       = "python3.12"
  handler       = "main.handler"
  filename      = local.lambda_zip
  # Rebuild-aware: changes to the zip trigger an update.
  source_code_hash = filebase64sha256(local.lambda_zip)
  memory_size      = var.lambda_memory_mb
  timeout          = var.lambda_timeout_s

  environment {
    variables = {
      OPENAI_API_KEY = var.openai_api_key
      MEMORY_BUCKET  = aws_s3_bucket.memory.id
      CORS_ORIGINS   = "https://${aws_cloudfront_distribution.frontend.domain_name}"
    }
  }
}

resource "aws_cloudwatch_log_group" "backend" {
  name              = "/aws/lambda/${aws_lambda_function.backend.function_name}"
  retention_in_days = 14
}
