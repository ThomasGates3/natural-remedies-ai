resource "google_storage_bucket" "frontend" {
  name          = "${var.project_name}-frontend-${var.environment}-${data.google_project.project.number}"
  location      = var.gcp_region
  force_destroy = false

  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }

  website {
    main_page_suffix = "index.html"
    not_found_page   = "index.html"
  }

  labels = {
    environment = var.environment
    app         = var.project_name
  }
}

resource "google_storage_bucket_iam_member" "public_access" {
  bucket = google_storage_bucket.frontend.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

resource "google_compute_backend_bucket" "frontend_backend" {
  name            = "${var.project_name}-backend-${var.environment}"
  bucket_name     = google_storage_bucket.frontend.name
  enable_cdn      = true

  cdn_policy {
    cache_mode        = "CACHE_ALL_STATIC"
    default_ttl       = 3600
    max_ttl           = 86400
    negative_caching  = true
  }
}
