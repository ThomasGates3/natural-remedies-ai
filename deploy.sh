#!/bin/bash

set -e

PROJECT_NAME="natural-remedies-ai"
ENVIRONMENT="${1:-dev}"
GCP_PROJECT_ID="${2:-$(gcloud config get-value project)}"
GEMINI_API_KEY="${3:-${TF_VAR_gemini_api_key}}"
GCP_REGION="us-east1"
TERRAFORM_DIR="terraform"
DIST_DIR="dist"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Error handler
error_exit() {
  echo -e "${RED}✗ $1${NC}"
  exit 1
}

echo -e "${BLUE}=== Natural Remedies AI GCP Deployment ===${NC}\n"

# 1. Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"
command -v npm >/dev/null 2>&1 || error_exit "npm not found"
command -v terraform >/dev/null 2>&1 || error_exit "terraform not found"
command -v gcloud >/dev/null 2>&1 || error_exit "gcloud CLI not found"
command -v docker >/dev/null 2>&1 || error_exit "docker not found"
echo -e "${GREEN}✓ All prerequisites installed${NC}\n"

# 2. Check for API key
echo -e "${BLUE}Checking API key...${NC}"
if [ -z "$GEMINI_API_KEY" ]; then
  error_exit "GEMINI_API_KEY not set. Use one of:
  1. Pass as argument: ./deploy.sh dev natural-remedies-ai YOUR_API_KEY
  2. Set environment variable: export TF_VAR_gemini_api_key=YOUR_API_KEY
  3. For GitHub Actions: Set GitHub Secret GEMINI_API_KEY"
fi
echo -e "${GREEN}✓ API key configured${NC}\n"

# 2. Build React app
echo -e "${BLUE}1. Building React application...${NC}"
if ! npm run build; then
  error_exit "React build failed. Check npm output above."
fi
echo -e "${GREEN}✓ React app built successfully${NC}\n"

# 3. Build and push Docker image
echo -e "${BLUE}2. Building Docker image and pushing to Artifact Registry...${NC}"
REGISTRY="us-east1-docker.pkg.dev"
IMAGE_NAME="${REGISTRY}/${GCP_PROJECT_ID}/docker-repo/${PROJECT_NAME}-api:latest"

echo -e "${YELLOW}  Enabling GCP APIs...${NC}"
gcloud services enable artifactregistry.googleapis.com compute.googleapis.com run.googleapis.com secretmanager.googleapis.com firestore.googleapis.com --quiet 2>/dev/null || true

echo -e "${YELLOW}  Creating Artifact Registry repository...${NC}"
gcloud artifacts repositories describe docker-repo --location=${GCP_REGION} 2>/dev/null || \
  gcloud artifacts repositories create docker-repo --repository-format=docker --location=${GCP_REGION} --quiet

echo -e "${YELLOW}  Configuring Docker authentication...${NC}"
gcloud auth configure-docker ${REGISTRY} --quiet

echo -e "${YELLOW}  Building Docker image for linux/amd64 (this may take 1-2 minutes)...${NC}"
if ! docker buildx build --platform linux/amd64 -t ${IMAGE_NAME} --push .; then
  error_exit "Docker build/push failed. Check error messages above."
fi
echo -e "${GREEN}✓ Docker image built and pushed: ${IMAGE_NAME}${NC}\n"

# 4. Initialize Terraform
echo -e "${BLUE}3. Initializing Terraform...${NC}"
cd terraform
if ! terraform init -upgrade; then
  error_exit "Terraform init failed"
fi
echo -e "${GREEN}✓ Terraform initialized${NC}\n"

# 5. Plan Terraform deployment
echo -e "${BLUE}4. Planning Terraform deployment...${NC}"
echo -e "${YELLOW}  Variables:${NC}"
echo -e "${YELLOW}    GCP Project: ${GCP_PROJECT_ID}${NC}"
echo -e "${YELLOW}    Region: ${GCP_REGION}${NC}"
echo -e "${YELLOW}    Environment: ${ENVIRONMENT}${NC}"
echo -e "${YELLOW}    Docker Image: ${IMAGE_NAME}${NC}\n"

if ! terraform plan \
  -var="gcp_project_id=${GCP_PROJECT_ID}" \
  -var="gcp_region=${GCP_REGION}" \
  -var="environment=${ENVIRONMENT}" \
  -var="container_image=${IMAGE_NAME}" \
  -var="gemini_api_key=${GEMINI_API_KEY}" \
  -out=tfplan; then
  error_exit "Terraform plan failed. Check error messages above."
fi
echo -e "${GREEN}✓ Terraform plan created${NC}\n"

# 6. Apply Terraform
echo -e "${BLUE}5. Applying Terraform configuration (this may take 2-3 minutes)...${NC}"
if ! terraform apply -auto-approve tfplan; then
  error_exit "Terraform apply failed. Check error messages above."
fi

echo -e "${YELLOW}  Retrieving deployment outputs...${NC}"
BUCKET_NAME=$(terraform output -raw storage_bucket_name 2>/dev/null || echo "unknown")
CLOUD_RUN_URL=$(terraform output -raw cloud_run_service_url 2>/dev/null || echo "unknown")
FIRESTORE_ID=$(terraform output -raw firestore_database_id 2>/dev/null || echo "unknown")

echo -e "${GREEN}✓ Infrastructure deployed${NC}"
echo -e "${GREEN}  Cloud Storage Bucket: ${BUCKET_NAME}${NC}"
echo -e "${GREEN}  Cloud Run API: ${CLOUD_RUN_URL}${NC}"
echo -e "${GREEN}  Firestore Database: ${FIRESTORE_ID}${NC}\n"

# 7. Upload frontend to Cloud Storage
echo -e "${BLUE}6. Uploading frontend to Cloud Storage...${NC}"
cd ..
if [ ! -d "$DIST_DIR" ]; then
  error_exit "Build directory '$DIST_DIR' not found. Did npm run build succeed?"
fi

echo -e "${YELLOW}  Syncing files to gs://${BUCKET_NAME}${NC}"
if ! gsutil -m rsync -r -d "$DIST_DIR/" "gs://$BUCKET_NAME"; then
  error_exit "Frontend upload failed. Check error messages above."
fi
echo -e "${GREEN}✓ Frontend uploaded to Cloud Storage${NC}\n"

# 8. Final summary
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ DEPLOYMENT COMPLETE${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}\n"

echo -e "${BLUE}Deployment Details:${NC}"
echo -e "${GREEN}  Environment: ${ENVIRONMENT}${NC}"
echo -e "${GREEN}  GCP Project: ${GCP_PROJECT_ID}${NC}"
echo -e "${GREEN}  Region: ${GCP_REGION}${NC}\n"

echo -e "${BLUE}Access Points:${NC}"
echo -e "${GREEN}  Frontend Bucket:${NC} gs://${BUCKET_NAME}"
echo -e "${GREEN}  Frontend URL:${NC} https://storage.googleapis.com/${BUCKET_NAME}/index.html"
echo -e "${GREEN}  Cloud Run API:${NC} ${CLOUD_RUN_URL}"
echo -e "${GREEN}  API Endpoint:${NC} ${CLOUD_RUN_URL}/api/remedies\n"

echo -e "${BLUE}Next Steps:${NC}"
echo -e "${YELLOW}1. Test the application:${NC}"
echo -e "   ${YELLOW}curl ${CLOUD_RUN_URL}/health${NC}"
echo -e "${YELLOW}2. Test the API:${NC}"
echo -e "   ${YELLOW}curl -X POST ${CLOUD_RUN_URL}/api/remedies -H 'Content-Type: application/json' -d '{\"symptoms\": \"headache\"}'${NC}"
echo -e "${YELLOW}3. Set up custom domain (optional):${NC}"
echo -e "   ${YELLOW}Configure DNS to point to: gs://${BUCKET_NAME}${NC}\n"

rm -f terraform/tfplan
echo -e "${GREEN}✓ Deployment script finished!${NC}"
