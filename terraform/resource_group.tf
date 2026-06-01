# A tag-based AWS Resource Group so every resource in this project shows up in
# one place in the console (Resource Groups & Tag Editor → Saved resource
# groups). It queries the same Project tag that the provider default_tags apply
# to every taggable resource, so new resources appear here automatically.
#
# Note: a tag-based Resource Group is regional and only surfaces resources in
# this provider's region. Global/edge resources (CloudFront, ACM in us-east-1,
# IAM, Route 53) carry the Project tag but won't appear in this regional group —
# use the Tag Editor (search all regions by the Project tag) to see those too.
resource "aws_resourcegroups_group" "project" {
  name        = "${local.name_prefix}-resources"
  description = "All ${var.project_name} prod resources grouped by the Project tag."

  resource_query {
    query = jsonencode({
      ResourceTypeFilters = ["AWS::AllSupported"]
      TagFilters = [
        {
          Key    = "Project"
          Values = [var.project_name]
        }
      ]
    })
  }
}
