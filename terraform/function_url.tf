# Public Lambda Function URL with response streaming. This replaces the API
# Gateway HTTP API, which buffers the whole Lambda response and therefore can't
# stream the chat reply token-by-token. CORS is handled by FastAPI's
# CORSMiddleware in the Lambda, so it is intentionally not configured here.
resource "aws_lambda_function_url" "backend" {
  function_name      = aws_lambda_function.backend.function_name
  authorization_type = "NONE"
  invoke_mode        = "RESPONSE_STREAM"
}

# Public (unauthenticated) access to the Function URL.
resource "aws_lambda_permission" "function_url" {
  statement_id           = "AllowPublicFunctionUrlInvoke"
  action                 = "lambda:InvokeFunctionUrl"
  function_name          = aws_lambda_function.backend.function_name
  principal              = "*"
  function_url_auth_type = "NONE"
}
