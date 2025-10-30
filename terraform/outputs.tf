output "storage_bucket_name" {
  description = "Cloud Storage bucket name for frontend"
  value       = google_storage_bucket.frontend.name
}

output "cloud_run_service_url" {
  description = "Cloud Run API service URL"
  value       = google_cloud_run_v2_service.api.uri
}

output "firestore_database_id" {
  description = "Firestore database identifier"
  value       = google_firestore_database.default.name
}

output "frontend_storage_url" {
  description = "Cloud Storage frontend bucket public URL"
  value       = "gs://${google_storage_bucket.frontend.name}"
}

output "backend_cdn_url" {
  description = "Cloud CDN enabled backend bucket"
  value       = google_compute_backend_bucket.frontend_backend.self_link
}
