# Enable Firestore API
resource "google_project_service" "firestore" {
  project = var.gcp_project_id
  service = "firestore.googleapis.com"
  disable_on_destroy = false
}

# Firestore Database (Datastore mode for backward compatibility)
resource "google_firestore_database" "default" {
  project     = var.gcp_project_id
  name        = "(default)"
  location_id = var.gcp_region
  type        = "DATASTORE_MODE"
  depends_on  = [google_project_service.firestore]
}

# Firestore Index for remedies_cache collection
resource "google_firestore_index" "remedies_cache" {
  project    = var.gcp_project_id
  collection = "remedies_cache"

  fields {
    field_path = "symptom_hash"
    order      = "ASCENDING"
  }

  fields {
    field_path = "timestamp"
    order      = "ASCENDING"
  }

  depends_on = [google_firestore_database.default]
}

# TTL Policy for auto-deletion (Cloud Firestore handles TTL via client-side deletion)
# Note: Firestore doesn't have automatic TTL like DynamoDB, but we can use document timestamp
# and implement deletion in the Lambda function or via Cloud Tasks
