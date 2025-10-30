#!/bin/bash

set -e

PROJECT_NAME="natural-remedies-ai"
TERRAFORM_DIR="terraform"
DIST_DIR="dist"

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Natural Remedies AI Deployment ===${NC}\n"

# 1. Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"
command -v npm >/dev/null 2>&1 || { echo -e "${RED}npm not found${NC}"; exit 1; }
command -v terraform >/dev/null 2>&1 || { echo -e "${RED}terraform not found${NC}"; exit 1; }
command -v aws >/dev/null 2>&1 || { echo -e "${RED}aws-cli not found${NC}"; exit 1; }
echo -e "${GREEN}✓ All prerequisites installed${NC}\n"

# 2. Build React app
echo -e "${BLUE}1. Building React application...${NC}"
npm run build >/dev/null 2>&1
echo -e "${GREEN}✓ React app built successfully${NC}\n"

# 3. Package Lambda function
echo -e "${BLUE}2. Packaging Lambda function...${NC}"
cd lambda
npm install >/dev/null 2>&1
cd ..
cd lambda && zip -r ../lambda.zip . -x "node_modules/*/test/*" "node_modules/*/.git/*" "*.md" >/dev/null 2>&1 && cd ..
echo -e "${GREEN}✓ Lambda function packaged: lambda.zip${NC}\n"

# 4. Initialize Terraform
echo -e "${BLUE}3. Initializing Terraform...${NC}"
cd terraform
terraform init >/dev/null 2>&1
echo -e "${GREEN}✓ Terraform initialized${NC}\n"

# 5. Plan Terraform deployment
echo -e "${BLUE}4. Planning Terraform deployment...${NC}"
terraform plan -out=tfplan >/dev/null 2>&1
echo -e "${GREEN}✓ Terraform plan created${NC}\n"

# 6. Apply Terraform
echo -e "${BLUE}5. Applying Terraform configuration...${NC}"
terraform apply -auto-approve tfplan >/dev/null 2>&1
BUCKET_NAME=$(terraform output -raw s3_bucket_name)
CLOUDFRONT_ID=$(terraform output -raw cloudfront_distribution_id)
CLOUDFRONT_URL=$(terraform output -raw cloudfront_domain_name)
API_ENDPOINT=$(terraform output -raw api_gateway_url)
echo -e "${GREEN}✓ Infrastructure deployed${NC}"
echo -e "${GREEN}  S3 Bucket: ${BUCKET_NAME}${NC}"
echo -e "${GREEN}  CloudFront Distribution: ${CLOUDFRONT_ID}${NC}\n"

# 7. Upload frontend to S3
echo -e "${BLUE}6. Uploading frontend to S3...${NC}"
cd ..
aws s3 sync "$DIST_DIR" "s3://$BUCKET_NAME" --delete >/dev/null 2>&1
echo -e "${GREEN}✓ Frontend uploaded to S3${NC}\n"

# 8. Invalidate CloudFront cache
echo -e "${BLUE}7. Invalidating CloudFront cache...${NC}"
INVALIDATION_ID=$(aws cloudfront create-invalidation --distribution-id "$CLOUDFRONT_ID" --paths "/*" --query 'Invalidation.Id' --output text)
echo -e "${GREEN}✓ CloudFront invalidation created: ${INVALIDATION_ID}${NC}\n"

# 9. Final summary
echo -e "${GREEN}=== Deployment Complete ===${NC}"
echo -e "${GREEN}Application URL: https://${CLOUDFRONT_URL}${NC}"
echo -e "${GREEN}API Endpoint: ${API_ENDPOINT}${NC}\n"

rm -f terraform/tfplan
echo -e "${BLUE}Deployment finished successfully!${NC}"
