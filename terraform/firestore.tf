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

# Note: Firestore indexes are not needed for Datastore Mode
# TTL Policy: Firestore handles via client-side deletion or Cloud Tasks scheduled cleanup
