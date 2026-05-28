# Custom domain wiring. All resources here are conditional on var.domain_name
# being set; with it empty the site uses the default CloudFront URL.

locals {
  use_domain = var.domain_name != ""
}

# Hosted zone created when you registered the domain in Route 53.
data "aws_route53_zone" "primary" {
  count        = local.use_domain ? 1 : 0
  name         = var.domain_name
  private_zone = false
}

# ACM certificate (must be in us-east-1 for CloudFront).
resource "aws_acm_certificate" "site" {
  count                     = local.use_domain ? 1 : 0
  provider                  = aws.us_east_1
  domain_name               = var.domain_name
  subject_alternative_names = ["www.${var.domain_name}"]
  validation_method         = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}

# DNS records that prove domain ownership for the certificate.
resource "aws_route53_record" "cert_validation" {
  for_each = local.use_domain ? {
    for dvo in aws_acm_certificate.site[0].domain_validation_options :
    dvo.domain_name => {
      name   = dvo.resource_record_name
      type   = dvo.resource_record_type
      record = dvo.resource_record_value
    }
  } : {}

  zone_id         = data.aws_route53_zone.primary[0].zone_id
  name            = each.value.name
  type            = each.value.type
  records         = [each.value.record]
  ttl             = 60
  allow_overwrite = true
}

# Blocks until ACM confirms the validation records.
resource "aws_acm_certificate_validation" "site" {
  count                   = local.use_domain ? 1 : 0
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.site[0].arn
  validation_record_fqdns = [for r in aws_route53_record.cert_validation : r.fqdn]
}

# Point the apex and www at CloudFront (alias records, no IPs needed).
resource "aws_route53_record" "apex" {
  count   = local.use_domain ? 1 : 0
  zone_id = data.aws_route53_zone.primary[0].zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend.domain_name
    zone_id                = aws_cloudfront_distribution.frontend.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www" {
  count   = local.use_domain ? 1 : 0
  zone_id = data.aws_route53_zone.primary[0].zone_id
  name    = "www.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend.domain_name
    zone_id                = aws_cloudfront_distribution.frontend.hosted_zone_id
    evaluate_target_health = false
  }
}
