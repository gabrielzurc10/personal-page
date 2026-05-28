data "aws_iam_policy_document" "lambda_assume" {
  statement {
    actions = ["sts:AssumeRole"]
    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "lambda" {
  name               = "${local.name_prefix}-lambda-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume.json
}

# CloudWatch Logs.
resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

# Read/write chat sessions in the memory bucket.
data "aws_iam_policy_document" "lambda_memory" {
  statement {
    actions   = ["s3:GetObject", "s3:PutObject"]
    resources = ["${aws_s3_bucket.memory.arn}/*"]
  }

  # ListBucket so a missing session key returns 404 (handled) instead of 403.
  statement {
    actions   = ["s3:ListBucket"]
    resources = [aws_s3_bucket.memory.arn]
  }
}

resource "aws_iam_role_policy" "lambda_memory" {
  name   = "${local.name_prefix}-lambda-memory"
  role   = aws_iam_role.lambda.id
  policy = data.aws_iam_policy_document.lambda_memory.json
}
