# Service Account for Cloud Run
resource "google_service_account" "cloudrun" {
  account_id   = "${var.project_name}-cloudrun-${var.environment}"
  display_name = "Cloud Run Service Account"
}

# IAM Role: Cloud Run can access Firestore
resource "google_project_iam_member" "cloudrun_firestore" {
  project = var.gcp_project_id
  role    = "roles/datastore.user"
  member  = "serviceAccount:${google_service_account.cloudrun.email}"
}

# Cloud Run Service
resource "google_cloud_run_service" "api" {
  name     = "${var.project_name}-api-${var.environment}"
  location = var.gcp_region

  template {
    spec {
      service_account_name = google_service_account.cloudrun.email
      timeout_seconds      = 60
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

        env {
          name  = "GCP_PROJECT_ID"
          value = var.gcp_project_id
        }

        resources {
          limits = {
            cpu    = "2"
            memory = "512Mi"
          }
        }
      }

      # Auto-scaling configuration
      max_instances = var.environment == "prod" ? 10 : 3
    }

    metadata {
      annotations = {
        "autoscaling.knative.dev/maxScale" = var.environment == "prod" ? "10" : "3"
        "autoscaling.knative.dev/minScale" = var.environment == "prod" ? "1" : "0"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }

  depends_on = [google_service_account.cloudrun]
}

# Make Cloud Run publicly accessible
resource "google_cloud_run_service_iam_member" "public_access" {
  service       = google_cloud_run_service.api.name
  location      = google_cloud_run_service.api.location
  role          = "roles/run.invoker"
  member        = "allUsers"
  depends_on    = [google_cloud_run_service.api]
}

# Output the service URL
output "cloud_run_service_url" {
  value       = google_cloud_run_service.api.status[0].url
  description = "The URL of the Cloud Run service"
}
