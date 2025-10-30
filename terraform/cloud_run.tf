# Service Account for Cloud Run
resource "google_service_account" "cloudrun" {
  account_id   = "${var.project_name}-cloudrun-${var.environment}"
  display_name = "Cloud Run Service Account"
}

# Cloud Run Service
resource "google_cloud_run_v2_service" "api" {
  name     = "${var.project_name}-api-${var.environment}"
  location = var.gcp_region

  template {
    service_account = google_service_account.cloudrun.email
    timeout         = "60s"

    containers {
      image = var.container_image

      ports {
        container_port = 8080
      }

      env {
        name  = "GEMINI_API_KEY"
        value = var.gemini_api_key
      }

      env {
        name  = "ENVIRONMENT"
        value = var.environment
      }
    }

    scaling {
      max_instance_count = var.environment == "prod" ? 10 : 3
      min_instance_count = var.environment == "prod" ? 1 : 0
    }
  }

  traffic {
    type            = "TRAFFIC_TARGET_ALLOCATION_TYPE_LATEST"
    percent         = 100
  }

  depends_on = [google_service_account.cloudrun]
}

# Make Cloud Run publicly accessible
resource "google_cloud_run_service_iam_member" "public_access" {
  service    = google_cloud_run_v2_service.api.name
  location   = google_cloud_run_v2_service.api.location
  role       = "roles/run.invoker"
  member     = "allUsers"
  depends_on = [google_cloud_run_v2_service.api]
}
