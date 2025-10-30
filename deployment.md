# Deployment Guide

Complete step-by-step instructions for deploying Natural Remedies AI to AWS.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Automated AWS Deployment](#automated-aws-deployment)
4. [Manual AWS Deployment](#manual-aws-deployment)
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

# Install AWS CLI if missing
# macOS: brew install awscli
# Linux: apt-get install awscli
# Windows: Download from https://aws.amazon.com/cli/

# Install Terraform if missing
# macOS: brew install terraform
# Linux: Download from https://www.terraform.io/downloads
# Windows: Download from https://www.terraform.io/downloads

# Verify installation
aws --version
terraform --version
```

### AWS Account Setup

1. **Create AWS Account** at https://aws.amazon.com/
2. **Create IAM User** with programmatic access:
   - Go to IAM → Users → Add User
   - Name: `natural-remedies-ai-deploy`
   - Permissions: Attach `AdministratorAccess` (or custom policy below)
   - Download CSV with Access Key and Secret

3. **Configure AWS CLI**:
   ```bash
   aws configure
   # Enter: Access Key ID
   # Enter: Secret Access Key
   # Default region: us-east-1
   # Default output format: json
   ```

4. **Verify Configuration**:
   ```bash
   aws sts get-caller-identity
   # Should return your account ID and ARN
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

## Automated AWS Deployment

**Recommended for quick deployment (5 minutes)**

### Step 1: Verify Prerequisites

```bash
# Check all tools are installed
aws sts get-caller-identity
terraform --version
npm --version

# Ensure you're in the project root
pwd
# Should end with: /Users/tg3/dev/natural-remedies-ai
```

### Step 2: Update Terraform Configuration

Edit `terraform/terraform.tfvars`:

```hcl
environment       = "dev"      # Change to "prod" for production
region            = "us-east-1"
project_name      = "natural-remedies-ai"
gemini_api_key    = "AIzaSy..."  # Your API key
```

### Step 3: Run Deployment Script

```bash
chmod +x deploy.sh
./deploy.sh
```

**Output will show:**

```
=== Natural Remedies AI Deployment ===

Checking prerequisites...
✓ All prerequisites installed

1. Building React application...
✓ React app built successfully

2. Packaging Lambda function...
✓ Lambda function packaged: lambda.zip

3. Initializing Terraform...
✓ Terraform initialized

4. Planning Terraform deployment...
✓ Terraform plan created

5. Applying Terraform configuration...
✓ Infrastructure deployed
  S3 Bucket: natural-remedies-ai-frontend-dev-049475639513
  CloudFront Distribution: E1234ABCD567E8F

6. Uploading frontend to S3...
✓ Frontend uploaded to S3

7. Invalidating CloudFront cache...
✓ CloudFront invalidation created: ABCDEFG1234567

=== Deployment Complete ===
Application URL: https://d1234567890abc.cloudfront.net
API Endpoint: https://abc123def456.execute-api.us-east-1.amazonaws.com/dev/remedies

Deployment finished successfully!
```

### Step 4: Save Your URLs

Copy these URLs to a safe place:
- **Application**: `https://d1234567890abc.cloudfront.net`
- **API**: `https://abc123def456.execute-api.us-east-1.amazonaws.com/dev/remedies`

## Manual AWS Deployment

**For detailed control over each step**

### Step 1: Build Frontend

```bash
npm run build
```

### Step 2: Package Lambda

```bash
cd lambda
npm install
cd ..
zip -r lambda.zip lambda/ -x "lambda/node_modules/*/test/*" "lambda/node_modules/*/.git/*"
```

### Step 3: Initialize Terraform State

```bash
cd terraform

# Initialize with local state first
terraform init

# Verify
terraform version
```

### Step 4: Plan Infrastructure

```bash
terraform plan -out=tfplan
# Review the changes
# Should show: ~15 resources to be created
```

### Step 5: Deploy Infrastructure

```bash
terraform apply tfplan

# Saves outputs for next steps
export S3_BUCKET=$(terraform output -raw s3_bucket_name)
export CLOUDFRONT_ID=$(terraform output -raw cloudfront_distribution_id)
export API_ENDPOINT=$(terraform output -raw api_gateway_url)
```

### Step 6: Upload Frontend to S3

```bash
cd ..
aws s3 sync dist "s3://${S3_BUCKET}" --delete
```

### Step 7: Invalidate CloudFront Cache

```bash
aws cloudfront create-invalidation \
  --distribution-id "${CLOUDFRONT_ID}" \
  --paths "/*"
```

### Step 8: Get Deployment URLs

```bash
cd terraform
terraform output

# Shows:
# api_gateway_url = "https://..."
# cloudfront_domain_name = "d....cloudfront.net"
# s3_bucket_name = "natural-remedies-ai-..."
```

## Verification

### Test 1: Frontend Access

```bash
# Replace with your CloudFront URL
curl -I https://d1234567890abc.cloudfront.net

# Expected: HTTP/2 200
```

### Test 2: API Endpoint

```bash
curl -X POST https://abc123def456.execute-api.us-east-1.amazonaws.com/dev/remedies \
  -H "Content-Type: application/json" \
  -d '{"symptoms":"headache"}'

# Expected: JSON response with remedies array
```

### Test 3: In Browser

1. Open your CloudFront URL
2. Enter "headache" in symptom input
3. Wait 3-5 seconds for AI response
4. Verify remedies appear
5. Test favorites (heart icon)
6. Verify history panel shows query
7. Toggle dark mode

### Test 4: Check AWS Resources

```bash
# Verify S3 bucket
aws s3 ls | grep natural-remedies-ai

# Verify CloudFront distribution
aws cloudfront list-distributions \
  --query 'DistributionList.Items[?Origins.Items[0].DomainName]'

# Verify Lambda function
aws lambda list-functions \
  --query 'Functions[?FunctionName==`natural-remedies-ai-api-dev`]'

# Check DynamoDB table
aws dynamodb list-tables
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

### Issue: "aws: command not found"

**Solution:**
```bash
# Install AWS CLI
brew install awscli  # macOS
# Or download from: https://aws.amazon.com/cli/

# Verify installation
aws --version

# Configure credentials
aws configure
```

### Issue: "AWS credentials not configured"

**Solution:**
```bash
# Configure AWS
aws configure

# Or set environment variables
export AWS_ACCESS_KEY_ID=your_key
export AWS_SECRET_ACCESS_KEY=your_secret
export AWS_DEFAULT_REGION=us-east-1

# Verify
aws sts get-caller-identity
```

### Issue: API returns 502 Bad Gateway

**Possible causes:**
- Lambda function not deployed correctly
- Environment variable not set
- Gemini API key invalid

**Solution:**
```bash
# Check Lambda logs
aws logs tail /aws/lambda/natural-remedies-ai-api-dev --follow

# Check Lambda environment
aws lambda get-function-configuration \
  --function-name natural-remedies-ai-api-dev \
  --query 'Environment.Variables'

# Redeploy Lambda
./deploy.sh
```

### Issue: "Gemini API key invalid" in Lambda logs

**Solution:**
1. Get new API key from https://ai.google.dev/
2. Update `terraform/terraform.tfvars` with new key
3. Run `./deploy.sh` again

### Issue: CloudFront still showing old version

**Solution:**
```bash
# Clear CloudFront cache manually
aws cloudfront create-invalidation \
  --distribution-id E1234ABCD567E8F \
  --paths "/*"

# Or redeploy
./deploy.sh
```

### Issue: Terraform state errors

**Solution:**
```bash
# Clean up local state and redeploy
cd terraform
rm -rf .terraform terraform.tfstate*
terraform init
cd ..
./deploy.sh
```

## Environment Switching

### From "dev" to "prod"

When ready to go production:

```bash
# Edit terraform/terraform.tfvars
# Change: environment = "dev"
# To:     environment = "prod"

# Run deployment
./deploy.sh
```

This creates separate resources:
- Bucket: `natural-remedies-ai-frontend-prod-...`
- Lambda: `natural-remedies-ai-api-prod`
- API: `.../prod/remedies`

Keep "dev" running for testing new features.

## Cleanup

### Remove Specific Environment

```bash
cd terraform

# For dev
export TF_VARS="-var-file=terraform.tfvars"
terraform destroy -auto-approve

# Or for prod (if different tfvars file)
rm terraform.tfstate*
terraform init
terraform destroy -auto-approve
```

### Full Cleanup

```bash
# Delete S3 buckets
aws s3 ls | grep natural-remedies-ai | awk '{print $3}' | \
  xargs -I {} aws s3 rm s3://{} --recursive

# Delete Lambda functions
aws lambda delete-function --function-name natural-remedies-ai-api-dev
aws lambda delete-function --function-name natural-remedies-ai-api-prod

# Delete DynamoDB tables
aws dynamodb delete-table --table-name natural-remedies-ai-cache-dev
aws dynamodb delete-table --table-name natural-remedies-ai-cache-prod

# Delete IAM roles
aws iam delete-role-policy --role-name natural-remedies-ai-lambda-role-dev \
  --policy-name lambda-policy
aws iam delete-role --role-name natural-remedies-ai-lambda-role-dev
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
2. Review CloudWatch Logs: `aws logs tail /aws/lambda/natural-remedies-ai-api-dev --follow`
3. Check Terraform output: `terraform output -json | jq .`
4. Review AWS Console for service health

---

**Cost Estimate (USD/month)**
- Lambda: $0.20 (free tier covers 1M requests)
- S3: $0.023 (first 50GB)
- CloudFront: $0.085 (free tier covers 50GB)
- DynamoDB: ~$0 (pay-per-request, very cheap)

**Total: ~$1-2/month for typical usage**
