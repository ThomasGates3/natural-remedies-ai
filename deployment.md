# Deployment Guide

Complete step-by-step instructions for deploying Natural Remedies AI to Google Cloud Platform (GCP).

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Automated GCP Deployment](#automated-gcp-deployment)
4. [Manual GCP Deployment](#manual-gcp-deployment)
5. [Verification](#verification)
6. [Troubleshooting](#troubleshooting)
7. [Cleanup](#cleanup)

## Prerequisites

### Required Tools

```bash
# Check Node.js (18+)
node --version

# Check npm
npm --version

# Install Google Cloud SDK if missing
# macOS: brew install google-cloud-sdk
# Linux: curl https://sdk.cloud.google.com | bash
# Windows: Download from https://cloud.google.com/sdk/docs/install

# Install Terraform if missing
# macOS: brew install terraform
# Linux: Download from https://www.terraform.io/downloads
# Windows: Download from https://www.terraform.io/downloads

# Verify installation
gcloud --version
terraform --version
docker --version
```

### GCP Project Setup

1. **Create GCP Project** at https://console.cloud.google.com/
   - Create new project or select existing
   - Note your Project ID (e.g., `natural-remedies-ai`)

2. **Enable Required APIs**:
   ```bash
   gcloud services enable \
     cloudbuild.googleapis.com \
     cloudrun.googleapis.com \
     artifactregistry.googleapis.com \
     storage.googleapis.com \
     compute.googleapis.com \
     --project=your-project-id
   ```

3. **Create Service Account**:
   ```bash
   gcloud iam service-accounts create natural-remedies-ai-deploy \
     --display-name="Natural Remedies AI Deployment" \
     --project=your-project-id

   gcloud projects add-iam-policy-binding your-project-id \
     --member=serviceAccount:natural-remedies-ai-deploy@your-project-id.iam.gserviceaccount.com \
     --role=roles/editor
   ```

4. **Configure gcloud CLI**:
   ```bash
   gcloud auth application-default login
   gcloud config set project your-project-id
   ```

5. **Verify Configuration**:
   ```bash
   gcloud projects describe your-project-id
   # Should return your project details
   ```

### Get Gemini API Key

1. Visit https://ai.google.dev/
2. Click "Get API Key"
3. Create new project or select existing
4. Copy your API key (starts with "AIzaSy...")
5. Keep this secure

## Local Development Setup

### Step 1: Clone & Install

```bash
cd natural-remedies-ai
npm install
```

### Step 2: Configure Environment

```bash
# Create .env.local with your Gemini API key
echo "VITE_GEMINI_API_KEY=your_api_key_here" > .env.local

# Verify (should not output your key)
cat .env.local
```

### Step 3: Start Dev Server

```bash
npm run dev
# Output: VITE v6.4.1 ready in 123 ms
# → Local: http://localhost:5173/
```

### Step 4: Test Features

- ✅ Search for "headache"
- ✅ Add remedy to favorites
- ✅ Check history panel
- ✅ Toggle dark mode
- ✅ Try discovery suggestions

### Step 5: Build for Production

```bash
npm run build
# Output: ✓ built in 492ms
# Creates: dist/ folder with optimized assets
```

## Automated GCP Deployment

**Recommended for quick deployment (8-10 minutes)**

### Step 1: Verify Prerequisites

```bash
# Check all tools are installed
gcloud projects describe your-project-id
terraform --version
npm --version
docker --version

# Ensure you're in the project root
pwd
# Should end with: /Users/tg3/dev/natural-remedies-ai
```

### Step 2: Update Configuration Files

Edit `terraform/terraform.tfvars`:

```hcl
project_id        = "natural-remedies-ai"
region             = "us-east1"
environment        = "dev"      # Change to "prod" for production
```

Update your `.env.local` with your Gemini API key:

```bash
echo "VITE_GEMINI_API_KEY=AIzaSy..." > .env.local
```

### Step 3: Set GitHub Secrets (for CI/CD)

Add to your GitHub repository Settings → Secrets:
- `GEMINI_API_KEY`: Your Gemini API key
- `WIF_PROVIDER`: Workload Identity Provider
- `WIF_SERVICE_ACCOUNT`: Service account email

### Step 4: Run Deployment Script

```bash
chmod +x deploy.sh
./deploy.sh dev your-project-id your-gemini-api-key
```

**Output will show:**

```
=== Natural Remedies AI GCP Deployment ===

1. Building React application...
✓ React app built successfully

2. Configuring Docker authentication...
✓ Docker authenticated to Artifact Registry

3. Building and pushing Docker image...
✓ Docker image built and pushed:
  us-east1-docker.pkg.dev/natural-remedies-ai/docker-repo/natural-remedies-ai-api:latest

4. Initializing Terraform...
✓ Terraform initialized

5. Planning infrastructure...
✓ Terraform plan created

6. Applying Terraform configuration...
✓ Infrastructure deployed
  Cloud Run Service: natural-remedies-ai-api-dev
  Cloud Storage Bucket: natural-remedies-ai-frontend-dev-807828955289

7. Uploading frontend to Cloud Storage...
✓ Frontend uploaded to Cloud Storage

8. Configuring Cloud CDN...
✓ Cloud CDN enabled on Cloud Storage bucket

=== Deployment Complete ===
Frontend URL: https://natural-remedies-ai-frontend-dev-807828955289.web.app
API Endpoint: https://natural-remedies-ai-api-dev-xxxxx.run.app

Deployment finished successfully!
```

### Step 4: Save Your URLs

Copy these URLs to a safe place:
- **Frontend**: `https://natural-remedies-ai-frontend-dev-807828955289.web.app`
- **API**: `https://natural-remedies-ai-api-dev-xxxxx.run.app`

## Manual GCP Deployment

**For detailed control over each step**

### Step 1: Build Frontend

```bash
npm run build
```

### Step 2: Build and Push Docker Image

```bash
# Configure Docker authentication
gcloud auth configure-docker us-east1-docker.pkg.dev

# Build Docker image
REGISTRY="us-east1-docker.pkg.dev"
PROJECT_ID="natural-remedies-ai"
IMAGE_NAME="${REGISTRY}/${PROJECT_ID}/docker-repo/natural-remedies-ai-api:latest"

docker build -t ${IMAGE_NAME} .
docker push ${IMAGE_NAME}
```

### Step 3: Initialize Terraform State

```bash
cd terraform

# Initialize Terraform
terraform init

# Verify
terraform version
```

### Step 4: Plan Infrastructure

```bash
terraform plan -out=tfplan
# Review the changes
# Should show: ~10-12 resources to be created (Cloud Run, Cloud Storage, IAM, etc.)
```

### Step 5: Deploy Infrastructure

```bash
terraform apply tfplan

# Saves outputs for next steps
export CLOUD_RUN_URL=$(terraform output -raw cloud_run_url)
export BUCKET_NAME=$(terraform output -raw storage_bucket_name)
export API_ENDPOINT=$(terraform output -raw api_endpoint)
```

### Step 6: Upload Frontend to Cloud Storage

```bash
cd ..
gsutil -m rsync -r -d dist/ gs://${BUCKET_NAME}/
```

### Step 7: Enable Cloud CDN (optional)

```bash
# Enable Cloud CDN on the bucket
gsutil cors set - gs://${BUCKET_NAME}/ <<EOF
[{"origin": ["*"], "method": ["GET", "HEAD"], "responseHeader": ["Content-Type"]}]
EOF
```

### Step 8: Get Deployment URLs

```bash
cd terraform
terraform output

# Shows:
# cloud_run_url = "https://natural-remedies-ai-api-dev-xxxxx.run.app"
# storage_bucket_name = "natural-remedies-ai-frontend-dev-..."
# frontend_url = "https://...storage.googleapis.com"
```

## Verification

### Test 1: Frontend Access

```bash
# Replace with your Cloud Storage URL
curl -I https://natural-remedies-ai-frontend-dev-807828955289.web.app

# Expected: HTTP/2 200
```

### Test 2: Cloud Run API Endpoint

```bash
curl -X POST https://natural-remedies-ai-api-dev-xxxxx.run.app/remedies \
  -H "Content-Type: application/json" \
  -d '{"symptoms":"headache"}'

# Expected: JSON response with remedies array
```

### Test 3: In Browser

1. Open your Cloud Storage URL
2. Enter "headache" in symptom input
3. Wait 3-5 seconds for AI response
4. Verify remedies appear
5. Test favorites (heart icon)
6. Verify history panel shows query
7. Toggle dark mode

### Test 4: Check GCP Resources

```bash
# Verify Cloud Storage bucket
gsutil ls -b gs://natural-remedies-ai-frontend-dev-*

# Verify Cloud Run service
gcloud run services describe natural-remedies-ai-api-dev --region us-east1 --project natural-remedies-ai

# Check Cloud Run logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=natural-remedies-ai-api-dev" \
  --limit 50 \
  --project natural-remedies-ai

# Verify Artifact Registry image
gcloud artifacts docker images list us-east1-docker.pkg.dev/natural-remedies-ai/docker-repo
```

## Troubleshooting

### Issue: "VITE_GEMINI_API_KEY not set"

**Solution:**
```bash
# Verify .env.local exists and has API key
cat .env.local

# If not, create it
echo "VITE_GEMINI_API_KEY=AIzaSy..." > .env.local
```

### Issue: "terraform not found"

**Solution:**
```bash
# Install Terraform
brew install terraform  # macOS
# Or download from: https://www.terraform.io/downloads
```

### Issue: "gcloud: command not found"

**Solution:**
```bash
# Install Google Cloud SDK
brew install google-cloud-sdk  # macOS
# Or download from: https://cloud.google.com/sdk/docs/install

# Verify installation
gcloud --version

# Configure credentials
gcloud auth application-default login
gcloud config set project natural-remedies-ai
```

### Issue: "GCP credentials not configured"

**Solution:**
```bash
# Authenticate with Google Cloud
gcloud auth application-default login

# Set project
gcloud config set project natural-remedies-ai

# Verify
gcloud projects describe natural-remedies-ai
```

### Issue: "Cloud Resource Manager API not enabled"

**Possible causes:**
- Required GCP APIs not enabled
- Insufficient permissions

**Solution:**
```bash
# Enable required APIs
gcloud services enable \
  cloudbuild.googleapis.com \
  cloudrun.googleapis.com \
  artifactregistry.googleapis.com \
  storage.googleapis.com \
  compute.googleapis.com \
  --project=natural-remedies-ai

# Verify
gcloud services list --enabled --project=natural-remedies-ai
```

### Issue: "Cloud Run service returns 403/500 error"

**Possible causes:**
- Docker image not pushed to Artifact Registry
- Environment variable not set
- Gemini API key invalid

**Solution:**
```bash
# Check Cloud Run service details
gcloud run services describe natural-remedies-ai-api-dev --region us-east1 --project natural-remedies-ai

# Check Cloud Run logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=natural-remedies-ai-api-dev" \
  --limit 50 \
  --project natural-remedies-ai

# Check Artifact Registry image
gcloud artifacts docker images list us-east1-docker.pkg.dev/natural-remedies-ai/docker-repo

# Redeploy service
./deploy.sh
```

### Issue: "Gemini API key invalid" in Cloud Run logs

**Solution:**
1. Get new API key from https://ai.google.dev/
2. Update GitHub Secrets with new key: `GEMINI_API_KEY`
3. Update `.env.local` with new key
4. Push to main branch to trigger redeployment

### Issue: "The specified bucket does not exist" (NoSuchBucket)

**Possible causes:**
- Cloud Storage bucket not created
- GCP project billing disabled
- Insufficient permissions

**Solution:**
```bash
# Create Cloud Storage bucket if missing
gsutil mb -l us-east1 gs://natural-remedies-ai-frontend-dev-807828955289

# Enable billing for the project
# Go to: https://console.cloud.google.com/billing/projects

# Check bucket contents
gsutil ls -R gs://natural-remedies-ai-frontend-dev-807828955289/

# Reupload frontend files
gsutil -m rsync -r -d dist/ gs://natural-remedies-ai-frontend-dev-807828955289/
```

### Issue: Terraform state errors

**Solution:**
```bash
# Clean up local state and redeploy
cd terraform
rm -rf .terraform terraform.tfstate*
terraform init
cd ..
./deploy.sh dev natural-remedies-ai your-gemini-api-key
```

## Environment Switching

### From "dev" to "prod"

When ready to go production:

```bash
# Edit terraform/terraform.tfvars
# Change: environment = "dev"
# To:     environment = "prod"

# Run deployment
./deploy.sh prod natural-remedies-ai your-gemini-api-key
```

This creates separate resources:
- Bucket: `natural-remedies-ai-frontend-prod-...`
- Cloud Run Service: `natural-remedies-ai-api-prod`
- API: `https://natural-remedies-ai-api-prod-xxxxx.run.app`

Keep "dev" running for testing new features.

## Cleanup

### Remove Specific Environment

```bash
cd terraform

# For dev environment
terraform destroy -auto-approve

# Or clean up manually
rm terraform.tfstate*
terraform init
terraform destroy -auto-approve
```

### Full Cleanup

```bash
# Delete Cloud Storage buckets
gsutil -m rm -r gs://natural-remedies-ai-frontend-dev-*
gsutil -m rm -r gs://natural-remedies-ai-frontend-prod-*

# Delete Cloud Run services
gcloud run services delete natural-remedies-ai-api-dev --region us-east1 --project natural-remedies-ai
gcloud run services delete natural-remedies-ai-api-prod --region us-east1 --project natural-remedies-ai

# Delete Artifact Registry images
gcloud artifacts docker images delete us-east1-docker.pkg.dev/natural-remedies-ai/docker-repo/natural-remedies-ai-api --project natural-remedies-ai

# Delete service accounts
gcloud iam service-accounts delete natural-remedies-ai-deploy@natural-remedies-ai.iam.gserviceaccount.com --project natural-remedies-ai
```

Or use Terraform:

```bash
cd terraform
terraform destroy -auto-approve
rm -rf .terraform terraform.tfstate*
```

## Support

For issues:

1. Check **Troubleshooting** section above
2. Review Cloud Run Logs: `gcloud logging read "resource.type=cloud_run_revision" --limit 50 --project natural-remedies-ai`
3. Check Terraform output: `terraform output -json | jq .`
4. Review GCP Console for service health and billing

---

**Cost Estimate (USD/month)**
- Cloud Run: $0.00-2.40 (free tier: 180,000 vCPU-seconds/month)
- Cloud Storage: $0.02-0.05 (first 5GB free, then $0.020/GB)
- Cloud CDN: $0.085/GB (after 50GB free tier)
- Artifact Registry: $0.40/GB storage
- Gemini API: $0.075 per 1K input tokens, $0.30 per 1K output tokens

**Total: ~$2-10/month for typical usage** (within free tier if usage stays low)
