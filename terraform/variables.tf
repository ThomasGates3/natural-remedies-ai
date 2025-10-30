variable "gcp_project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "gcp_region" {
  description = "GCP Region"
  type        = string
  default     = "us-east1"
}

variable "project_name" {
  description = "Project name for resource naming"
  type        = string
  default     = "natural-remedies-ai"
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "dev"
  validation {
    condition     = contains(["dev", "staging", "prod"], var.environment)
    error_message = "Environment must be dev, staging, or prod."
  }
}

variable "gemini_api_key" {
  description = "Google Gemini API Key"
  type        = string
  sensitive   = true
}

variable "container_image" {
  description = "Container image for Cloud Run"
  type        = string
  default     = "gcr.io/cloud-builders/gke-deploy"
}

variable "domain_name" {
  description = "Custom domain name (optional)"
  type        = string
  default     = ""
}
