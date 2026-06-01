output "cloudfront_url" {
  description = "CloudFront URL of the portfolio site (always works)."
  value       = "https://${aws_cloudfront_distribution.frontend.domain_name}"
}

output "site_url" {
  description = "Primary site URL — the custom domain if set, else the CloudFront URL."
  value       = local.use_domain ? "https://${var.domain_name}" : "https://${aws_cloudfront_distribution.frontend.domain_name}"
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

output "resource_group" {
  description = "AWS Resource Group listing all project resources (grouped by the Project tag)."
  value       = aws_resourcegroups_group.project.name
}
