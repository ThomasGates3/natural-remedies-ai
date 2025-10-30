#!/bin/bash

set -e

PROJECT_NAME="natural-remedies-ai"
ENVIRONMENT="${1:-dev}"
GCP_PROJECT_ID="${2:-$(gcloud config get-value project)}"
GCP_REGION="us-east1"
TERRAFORM_DIR="terraform"
DIST_DIR="dist"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Natural Remedies AI GCP Deployment ===${NC}\n"

# 1. Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"
command -v npm >/dev/null 2>&1 || { echo -e "${RED}npm not found${NC}"; exit 1; }
command -v terraform >/dev/null 2>&1 || { echo -e "${RED}terraform not found${NC}"; exit 1; }
command -v gcloud >/dev/null 2>&1 || { echo -e "${RED}gcloud CLI not found${NC}"; exit 1; }
command -v docker >/dev/null 2>&1 || { echo -e "${RED}docker not found${NC}"; exit 1; }
echo -e "${GREEN}✓ All prerequisites installed${NC}\n"

# 2. Build React app
echo -e "${BLUE}1. Building React application...${NC}"
npm run build >/dev/null 2>&1
echo -e "${GREEN}✓ React app built successfully${NC}\n"

# 3. Build and push Docker image
echo -e "${BLUE}2. Building Docker image and pushing to Artifact Registry...${NC}"
REGISTRY="us-east1-docker.pkg.dev"
IMAGE_NAME="${REGISTRY}/${GCP_PROJECT_ID}/docker-repo/${PROJECT_NAME}-api:latest"

# Enable required GCP APIs
gcloud services enable artifactregistry.googleapis.com compute.googleapis.com run.googleapis.com --quiet 2>/dev/null || true

# Create Artifact Registry repository if it doesn't exist
gcloud artifacts repositories describe docker-repo --location=${GCP_REGION} 2>/dev/null || \
  gcloud artifacts repositories create docker-repo --repository-format=docker --location=${GCP_REGION} --quiet

# Configure Docker authentication
gcloud auth configure-docker ${REGISTRY} --quiet

# Build and push Docker image
docker build -t ${IMAGE_NAME} . >/dev/null 2>&1
docker push ${IMAGE_NAME} >/dev/null 2>&1
echo -e "${GREEN}✓ Docker image built and pushed: ${IMAGE_NAME}${NC}\n"

# 4. Initialize Terraform
echo -e "${BLUE}3. Initializing Terraform...${NC}"
cd terraform
terraform init >/dev/null 2>&1
echo -e "${GREEN}✓ Terraform initialized${NC}\n"

# 5. Plan Terraform deployment
echo -e "${BLUE}4. Planning Terraform deployment...${NC}"
terraform plan \
  -var="gcp_project_id=${GCP_PROJECT_ID}" \
  -var="gcp_region=${GCP_REGION}" \
  -var="environment=${ENVIRONMENT}" \
  -var="container_image=${IMAGE_NAME}" \
  -out=tfplan >/dev/null 2>&1
echo -e "${GREEN}✓ Terraform plan created${NC}\n"

# 6. Apply Terraform
echo -e "${BLUE}5. Applying Terraform configuration...${NC}"
terraform apply -auto-approve tfplan >/dev/null 2>&1
BUCKET_NAME=$(terraform output -raw storage_bucket_name)
LOAD_BALANCER_IP=$(terraform output -raw load_balancer_ip)
CLOUD_RUN_URL=$(terraform output -raw cloud_run_service_url)
echo -e "${GREEN}✓ Infrastructure deployed${NC}"
echo -e "${GREEN}  Cloud Storage Bucket: ${BUCKET_NAME}${NC}"
echo -e "${GREEN}  Load Balancer IP: ${LOAD_BALANCER_IP}${NC}\n"

# 7. Upload frontend to Cloud Storage
echo -e "${BLUE}6. Uploading frontend to Cloud Storage...${NC}"
cd ..
gsutil -m rsync -r -d "$DIST_DIR" "gs://$BUCKET_NAME" >/dev/null 2>&1
echo -e "${GREEN}✓ Frontend uploaded to Cloud Storage${NC}\n"

# 8. Output endpoints
echo -e "${BLUE}7. Deployment Complete${NC}\n"
STORAGE_BUCKET=$(terraform output -raw storage_bucket_name)
echo -e "${GREEN}=== Deployment Complete ===${NC}"
echo -e "${GREEN}Frontend Bucket: ${STORAGE_BUCKET}${NC}"
echo -e "${GREEN}Frontend URL: https://storage.googleapis.com/${STORAGE_BUCKET}/index.html${NC}"
echo -e "${GREEN}Cloud Run API: ${CLOUD_RUN_URL}${NC}\n"
echo -e "${BLUE}Next steps:${NC}"
echo -e "${BLUE}1. Point your domain to Cloud Storage: gs://${STORAGE_BUCKET}${NC}"
echo -e "${BLUE}2. Access Cloud Run API at: ${CLOUD_RUN_URL}/api/remedies${NC}\n"

rm -f terraform/tfplan
echo -e "${BLUE}Deployment finished successfully!${NC}"
