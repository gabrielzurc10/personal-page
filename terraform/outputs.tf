output "cloudfront_url" {
  description = "Public URL of the portfolio site."
  value       = "https://${aws_cloudfront_distribution.frontend.domain_name}"
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (used for cache invalidation)."
  value       = aws_cloudfront_distribution.frontend.id
}

output "api_endpoint" {
  description = "Base URL of the backend API. Set NEXT_PUBLIC_API_URL to this when building the frontend."
  value       = aws_apigatewayv2_api.backend.api_endpoint
}

output "frontend_bucket" {
  description = "S3 bucket hosting the static frontend."
  value       = aws_s3_bucket.frontend.id
}

output "memory_bucket" {
  description = "S3 bucket storing chat session memory."
  value       = aws_s3_bucket.memory.id
}
