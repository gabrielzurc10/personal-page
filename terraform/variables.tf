variable "aws_region" {
  description = "AWS region for all resources."
  type        = string
  default     = "us-east-2"
}

variable "project_name" {
  description = "Prefix used for resource names and tags."
  type        = string
  default     = "portfolio"
}

variable "openai_api_key" {
  description = "OpenAI API key passed to the Lambda as an environment variable."
  type        = string
  sensitive   = true
}

variable "lambda_memory_mb" {
  description = "Lambda memory allocation in MB."
  type        = number
  default     = 512
}

variable "lambda_timeout_s" {
  description = "Lambda timeout in seconds."
  type        = number
  default     = 30
}
