# Deployment (AWS + Terraform)

Deploys the portfolio to AWS:

- **Frontend** — Next.js static export in a private S3 bucket, served by CloudFront.
- **Backend** — FastAPI on Lambda, fronted by an API Gateway HTTP API.
- **Memory** — chat sessions in a private S3 bucket.
- Environment: **prod** · Region: **us-east-2**.

Every resource is tagged `Project=portfolio`, `Environment=prod`, `ManagedBy=terraform` (via provider `default_tags`). A tag-based **AWS Resource Group** (`portfolio-prod-resources`) groups them for a one-click view in the console under *Resource Groups & Tag Editor*. Regional Resource Groups don't surface global/edge resources (CloudFront, ACM us-east-1, IAM, Route 53) — those still carry the `Project` tag, so use the **Tag Editor** (search all regions by `Project=portfolio`) to see everything.

> **Note:** the chat replies arrive in one buffered response rather than streaming token-by-token — API Gateway does not support Lambda response streaming. The UI still works; it just doesn't "type out" live.

## One-time setup

### 1. IAM user (from your root account)
Create an IAM user and attach these managed policies, then create an access key for it:

- `AmazonS3FullAccess`
- `CloudFrontFullAccess`
- `AWSLambda_FullAccess`
- `AmazonAPIGatewayAdministrator`
- `IAMFullAccess` (required so Terraform can create the Lambda role)
- `AmazonDynamoDBFullAccess`
- `CloudWatchLogsFullAccess`

Never create an access key for the root user.

### 2. Bootstrap the Terraform state backend
The state bucket + lock table must exist before `terraform init`. The state bucket name must be globally unique — if `gabrielcruz-portfolio-prod-tfstate` is taken, change it in both `bootstrap/main.tf` and the `backend "s3"` block in `terraform.tf`.

```bash
cd terraform/bootstrap
terraform init
terraform apply
```

### 3. GitHub repository secrets
Add these under Settings → Secrets and variables → Actions:

| Secret | Where to get it |
|---|---|
| `OPENAI_API_KEY` | platform.openai.com → API keys |
| `AWS_ACCESS_KEY_ID` | IAM access key (step 1) |
| `AWS_SECRET_ACCESS_KEY` | IAM access key (step 1) |

## Deploy via GitHub Actions
- **Apply:** push to `main`, or run the **Deploy** workflow manually with `action = apply`.
- **Destroy:** run the **Deploy** workflow manually with `action = destroy`.

## Deploy locally
```bash
# from repo root
python terraform/scripts/build_lambda.py          # build Lambda zip (Linux wheels)
cd terraform
terraform init
terraform apply                                    # prompts for openai_api_key (or use terraform.tfvars)

# push the frontend
API=$(terraform output -raw api_endpoint)
cd ../frontend
NEXT_PUBLIC_API_URL="$API" npm run build
aws s3 sync out "s3://$(cd ../terraform && terraform output -raw frontend_bucket)" --delete
aws cloudfront create-invalidation \
  --distribution-id "$(cd ../terraform && terraform output -raw cloudfront_distribution_id)" --paths "/*"
```

Outputs: `cloudfront_url` (the site), `api_endpoint`, `frontend_bucket`, `memory_bucket`, `resource_group`.

## Tear down
```bash
cd terraform
terraform destroy
```
Buckets use `force_destroy = true`, so they are emptied automatically. The bootstrap state bucket/lock table are not removed by this — delete them separately if you want a full cleanup.

## Local development (unchanged)
None of this affects local dev. With no `NEXT_PUBLIC_API_URL` the frontend hits `http://localhost:8000`, and with no `MEMORY_BUCKET` the backend stores sessions in the local `memory/` folder.
