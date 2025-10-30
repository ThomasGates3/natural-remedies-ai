# Enable Secret Manager API
resource "google_project_service" "secret_manager" {
  project = var.gcp_project_id
  service = "secretmanager.googleapis.com"
  disable_on_destroy = false
}

# Store GEMINI_API_KEY in Secret Manager
resource "google_secret_manager_secret" "gemini_api_key" {
  secret_id = "gemini-api-key"
  project   = var.gcp_project_id

  replication {
    automatic = true
  }

  depends_on = [google_project_service.secret_manager]
}

# Secret version (stores the actual key)
resource "google_secret_manager_secret_version" "gemini_api_key" {
  secret      = google_secret_manager_secret.gemini_api_key.id
  secret_data = var.gemini_api_key
}

# Grant Cloud Run service account access to the secret
resource "google_secret_manager_secret_iam_member" "cloudrun_access" {
  secret_id = google_secret_manager_secret.gemini_api_key.id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.cloudrun.email}"
  depends_on = [google_secret_manager_secret.gemini_api_key]
}

output "secret_manager_id" {
  description = "Secret Manager secret ID for GEMINI_API_KEY"
  value       = google_secret_manager_secret.gemini_api_key.id
}
