#!/usr/bin/env bash
# Build the frontend with the deployed API URL, sync it to S3, and invalidate
# the CloudFront cache. Run AFTER `terraform apply` from anywhere in the repo.
#
# Usage: terraform/scripts/deploy_frontend.sh
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TERRAFORM_DIR="$(dirname "$SCRIPT_DIR")"
FRONTEND_DIR="$(dirname "$TERRAFORM_DIR")/frontend"

echo "Reading Terraform outputs..."
API_URL="$(terraform -chdir="$TERRAFORM_DIR" output -raw api_endpoint)"
BUCKET="$(terraform -chdir="$TERRAFORM_DIR" output -raw frontend_bucket)"
DIST_ID="$(terraform -chdir="$TERRAFORM_DIR" output -raw cloudfront_distribution_id)"
SITE_URL="$(terraform -chdir="$TERRAFORM_DIR" output -raw cloudfront_url)"

echo "API endpoint: $API_URL"
echo "Frontend bucket: $BUCKET"

echo "Building frontend..."
cd "$FRONTEND_DIR"
NEXT_PUBLIC_API_URL="$API_URL" npm run build

echo "Syncing to s3://$BUCKET ..."
aws s3 sync out "s3://$BUCKET" --delete

echo "Invalidating CloudFront cache..."
aws cloudfront create-invalidation --distribution-id "$DIST_ID" --paths "/*" >/dev/null

echo "Done. Site: $SITE_URL"
