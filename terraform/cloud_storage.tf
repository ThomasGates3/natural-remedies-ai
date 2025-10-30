resource "google_storage_bucket" "frontend" {
  name          = "${var.project_name}-frontend-${var.environment}-${data.google_project.project.number}"
  location      = var.gcp_region
  force_destroy = false

  uniform_bucket_level_access = true

  versioning {
    enabled = true
  }

  encryption {
    default_kms_key_name = null
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

resource "google_compute_url_map" "frontend" {
  name            = "${var.project_name}-frontend-${var.environment}"
  default_service = google_compute_backend_bucket.frontend_backend.id

  host_rule {
    hosts        = ["*"]
    path_matcher = "api"
  }

  path_matcher {
    name            = "api"
    default_service = google_compute_backend_service.api.id

    path_rule {
      paths   = ["/api/*"]
      service = google_compute_backend_service.api.id
    }
  }
}

resource "google_compute_target_https_proxy" "frontend" {
  name             = "${var.project_name}-frontend-proxy-${var.environment}"
  url_map          = google_compute_url_map.frontend.id
  ssl_certificates = [google_compute_ssl_certificate.frontend.id]
}

resource "google_compute_ssl_certificate" "frontend" {
  name = "${var.project_name}-ssl-${var.environment}"

  managed {
    domains = [google_compute_global_address.frontend.address]
  }

  lifecycle {
    create_before_destroy = true
  }
}

resource "google_compute_global_address" "frontend" {
  name = "${var.project_name}-ip-${var.environment}"
}

resource "google_compute_global_forwarding_rule" "frontend" {
  name                  = "${var.project_name}-lb-${var.environment}"
  ip_protocol           = "TCP"
  load_balancing_scheme = "EXTERNAL"
  port_range            = "443"
  target                = google_compute_target_https_proxy.frontend.id
  address               = google_compute_global_address.frontend.id
}

resource "google_compute_backend_service" "api" {
  name            = "${var.project_name}-api-backend-${var.environment}"
  protocol        = "HTTPS"
  timeout_sec     = 30
  enable_cdn      = false

  backend {
    group = google_compute_network_endpoint_group.cloudrun_neg.id
  }

  health_checks = [google_compute_health_check.cloudrun.id]

  log_config {
    enable = true
  }

  iap {
    enabled = false
  }
}

resource "google_compute_health_check" "cloudrun" {
  name = "${var.project_name}-hc-${var.environment}"

  https_health_check {
    port = 443
    request_path = "/health"
  }

  check_interval_sec  = 10
  timeout_sec         = 5
  healthy_threshold   = 2
  unhealthy_threshold = 3
}

resource "google_compute_network_endpoint_group" "cloudrun_neg" {
  name                  = "${var.project_name}-neg-${var.environment}"
  network_endpoint_type = "SERVERLESS"
  region                = var.gcp_region

  cloud_run {
    service = google_cloud_run_service.api.name
  }
}
