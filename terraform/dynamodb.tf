resource "aws_dynamodb_table" "remedies_cache" {
  name           = "${var.project_name}-cache-${var.environment}"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "symptom_hash"
  range_key      = "timestamp"

  attribute {
    name = "symptom_hash"
    type = "S"
  }

  attribute {
    name = "timestamp"
    type = "N"
  }

  ttl {
    attribute_name = "expiration_time"
    enabled        = true
  }

  tags = {
    Name        = "${var.project_name}-cache"
    Environment = var.environment
  }
}
