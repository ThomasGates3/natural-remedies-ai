output "storage_bucket_name" {
  description = "Cloud Storage bucket name for frontend"
  value       = google_storage_bucket.frontend.name
}

output "load_balancer_ip" {
  description = "Load balancer static IP address"
  value       = google_compute_global_address.frontend.address
}

output "load_balancer_url" {
  description = "Load balancer HTTPS URL"
  value       = "https://${google_compute_global_address.frontend.address}"
}

output "cloud_run_service_url" {
  description = "Cloud Run API service URL"
  value       = google_cloud_run_service.api.status[0].url
}

output "firestore_database_id" {
  description = "Firestore database identifier"
  value       = google_firestore_database.default.name
}

output "frontend_website_url" {
  description = "Frontend website URL (once DNS is configured)"
  value       = "https://${google_compute_global_address.frontend.address}"
}
