# Security & Secret Management

This document outlines how API keys and secrets are managed in Natural Remedies AI.

## Overview

- **Frontend**: Uses `VITE_GEMINI_API_KEY` from `.env.local` (dev only)
- **Backend**: Uses `GEMINI_API_KEY` from environment variables
- **GitHub Actions**: Uses encrypted GitHub Secrets (recommended for CI/CD)
- **Git**: All secrets are in `.gitignore` and never committed

## Local Development

### Setup

1. Create `.env.local` file (not tracked in git):
```bash
VITE_GEMINI_API_KEY=your-actual-api-key
```

2. Get your API key from: https://aistudio.google.com/app/apikey

3. Run development server:
```bash
npm run dev
```

### Important
- `.env.local` is in `.gitignore` and will NOT be committed
- Never hardcode keys in source files
- The key is only used client-side for direct Gemini API calls during development

## Production Deployment

### GitHub Actions Secrets (Recommended)

1. **Setup GitHub Secrets** in your repository settings:
   - Go to Settings > Secrets and variables > Actions
   - Add `GEMINI_API_KEY` with your actual API key
   - Add `WIF_PROVIDER` for Workload Identity Federation
   - Add `WIF_SERVICE_ACCOUNT` for GCP authentication

2. **Deployment Process**:
   - Push to `main` branch → deploys to production
   - Push to `polish` branch → deploys to dev
   - Uses `.github/workflows/deploy.yml`
   - GitHub Actions automatically injects `GEMINI_API_KEY`

3. **Workload Identity Federation (WIF)**:
   - No service account keys needed
   - GitHub Actions obtains temporary GCP credentials
   - Most secure option for CI/CD

### Local Deployment

You can also deploy locally using one of these methods:

**Option 1: Command line argument**
```bash
./deploy.sh dev natural-remedies-ai YOUR_API_KEY
```

**Option 2: Environment variable**
```bash
export TF_VAR_gemini_api_key=YOUR_API_KEY
./deploy.sh dev natural-remedies-ai
```

### Security Layers

✅ **Level 1: Git Protection**
- `.env.local` in `.gitignore`
- `.env.*.local` patterns blocked
- `*.key`, `*.pem` files blocked
- `credentials.json`, `secrets.json` blocked

✅ **Level 2: Build Protection**
- `vite.config.ts` does NOT embed API keys in build output
- Frontend uses `VITE_` prefix (optional at runtime)
- Only VITE_ prefixed vars exposed to browser

✅ **Level 3: Deployment Protection**
- Local: API key passed via environment variable
- GitHub Actions: Key stored in encrypted GitHub Secrets
- Terraform: Key injected as variable (not logged)
- Cloud Run: Key stored in environment (only during runtime)

✅ **Level 4: GitHub Actions Protection**
- Secrets encrypted at rest
- Secrets masked in workflow logs
- Expires after workflow completion
- Audit logs available in GitHub

## If You Leak a Key

**IMMEDIATE ACTIONS** (within minutes):

1. **Revoke the compromised key**:
   - Go to Google Cloud Console
   - APIs & Services > Credentials
   - Find and DELETE the exposed API key

2. **Create a new key**:
   - Google AI Studio: https://aistudio.google.com/app/apikey
   - Or GCP Console > APIs & Services > Credentials

3. **Update all deployments**:
   ```bash
   # Update Terraform variable
   terraform apply -var="gemini_api_key=NEW_KEY_HERE"

   # Update local dev file
   echo "VITE_GEMINI_API_KEY=NEW_KEY_HERE" > .env.local
   ```

4. **Monitor for abuse**:
   - Check GCP billing for unexpected charges
   - Check API quota usage for suspicious activity
   - Set up alerts (see next section)

## Monitoring & Alerts

### Enable GCP Billing Alerts

1. Go to GCP Console > Billing
2. Set up budget alerts:
   - Alert when cost exceeds $1/month
   - Alert for any usage if key is only for this project

3. Enable Secret Manager audit logging:
   - Admin Activity Logs: automatically enabled
   - Data Access Logs: enable for sensitive projects
   - Check logs regularly for unauthorized access

### Monitor API Quota Usage

1. Go to APIs & Services > Google Generative AI API
2. Set up quota alerts for usage spikes
3. Suspicious activity indicators:
   - Requests from unknown IP addresses
   - Requests to non-existent models
   - Requests with invalid syntax

## Best Practices Checklist

- [ ] Never hardcode API keys in source code
- [ ] Use `.env.local` for local development (not committed)
- [ ] Use environment variables for deployed applications
- [ ] Use Secret Manager for production backends
- [ ] Use GitHub Actions Secrets for CI/CD pipelines
- [ ] Rotate keys quarterly
- [ ] Enable audit logging for all secret access
- [ ] Set up billing alerts on all cloud services
- [ ] Review `.gitignore` before first commit
- [ ] Never use the same key across projects

## Files to Never Commit

```
.env.local              # Local development secrets
.env                    # Environment variables
.env.prod               # Production environment
.env.production         # Production environment
terraform/terraform.tfvars  # Terraform variables with secrets
*.key                   # Private keys
*.pem                   # Private certificates
credentials.json        # Service account keys
secrets.json           # Any JSON secrets
.docker/config.json    # Docker registry auth
```

## References

- [GCP Secret Manager Docs](https://cloud.google.com/secret-manager/docs)
- [Google AI Studio Security](https://ai.google.dev/docs)
- [OWASP Secret Management](https://owasp.org/www-community/Sensitive_Data_Exposure)
