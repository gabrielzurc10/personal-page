terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      # >= 6.x for aws_lambda_permission.invoked_via_function_url (see function_url.tf).
      version = "~> 6.0"
    }
  }

  # State backend. The bucket + DynamoDB table are created by terraform/bootstrap.
  # If you changed the names there, update them here too.
  backend "s3" {
    bucket         = "gabrielcruz-portfolio-prod-tfstate"
    key            = "prod/terraform.tfstate"
    region         = "us-east-2"
    dynamodb_table = "portfolio-prod-tflock"
    encrypt        = true
  }
}
