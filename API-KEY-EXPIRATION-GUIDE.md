# API Key Expiration Guide - Gemini API

## Quick Answer

**Google Gemini API keys DO NOT have an automatic expiration date.**

However, your key **expired unexpectedly**, which is unusual. This guide explains why and how to prevent it.

---

## Why Your Current Key Expired (Unusual Case)

Your key: `AIzaSyC5qXJ2EB06z58zT6vbguRskcaU-9E-_MI`

**Possible reasons for early expiration:**
1. ❌ **API Quota exceeded** - Your free tier quota was used up
2. ❌ **Project deleted or suspended** - GCP project was deleted
3. ❌ **Billing issues** - Account flagged for non-payment
4. ❌ **Security flag** - Google detected suspicious activity
5. ❌ **Manual deletion** - Someone deleted the key (check GCP history)
6. ✅ **Unused key timeout** - Some orgs auto-expire unused keys (your case?)

**Most likely:** Your API key ran out of quota OR wasn't used for a long time.

---

## Official Google Gemini API Key Expiration Policy

### For Free/Development Keys

| Policy | Details |
|--------|---------|
| **Standard Lifespan** | Indefinite (no automatic expiration) |
| **Quota** | Free tier: 15 requests/minute, 1.5M requests/month |
| **Inactivity Timeout** | Some orgs: 90 days of no usage |
| **Deletion** | Manual only (unless quota exceeded) |
| **Quota Reset** | Monthly (on creation date) |

### When Keys Stop Working

| Reason | Recovery Time | Prevention |
|--------|---------------|-----------|
| **Quota exceeded** | ~24-30 days or upgrade to paid | Monitor usage, set alerts |
| **Billing issue** | When payment resolved | Keep billing current |
| **Inactivity** | Renew key | Use key regularly |
| **Manual deletion** | Create new key | Audit key access logs |
| **Project suspended** | When issue fixed | Keep project in good standing |

---

## How to Check Your Key Status

### 1. Check in Google AI Studio (Easiest)
```bash
# Visit: https://aistudio.google.com/app/apikeys

# You'll see:
✓ Active keys (green)
⚠️ Restricted keys (yellow)
✗ Revoked/Deleted keys (red)
```

### 2. Check in GCP Console
```bash
# Visit: https://console.cloud.google.com/apis/credentials

# Look for:
- API key status (Enabled/Disabled)
- Creation date
- Last used date
- Restrictions applied
```

### 3. Check Quota Usage (Most Important)
```bash
# Visit: https://console.cloud.google.com/iam-admin/quotas

# Look for:
- Generative Language API
- Current usage vs. quota
- Quota reset date
```

---

## Preventing Future Expiration (Best Practices)

### 1. Monitor Your Quota ✅

**Set up billing alerts:**
```
GCP Console → Billing → Budgets and Alerts
├─ Set alert at 75% quota usage
├─ Set alert at 90% quota usage
└─ Set alert at 100% quota usage
```

**Check monthly:**
```bash
# View quota dashboard
https://console.cloud.google.com/iam-admin/quotas?service=generativelanguage.googleapis.com
```

### 2. Use Multiple Keys (Recommended for Production)

```bash
# Production Key (high quota, monitored)
VITE_GEMINI_API_KEY_PROD=AIzaSy...

# Backup Key (in case primary fails)
VITE_GEMINI_API_KEY_BACKUP=AIzaSy...

# Development Key (for testing)
VITE_GEMINI_API_KEY_DEV=AIzaSy...
```

### 3. Upgrade to Paid Plan (If Using Heavily)

**Free Tier Limits:**
- 15 requests/minute
- 1.5M requests/month (about 50k/day)

**Paid Plan Benefits:**
- Unlimited requests/minute
- Higher monthly quota
- Priority support
- SLA guarantees

**Cost Estimate:**
- $0.075 per 1,000 input tokens
- $0.30 per 1,000 output tokens
- Average remedy: ~100 input tokens, 500 output tokens
- **Cost per search: ~$0.02**
- **At 100 searches/day: ~$0.70/month**
- **At 1,000 searches/day: ~$7/month**

### 4. Set Key Restrictions (Security)

```bash
# In GCP Console → APIs & Services → Credentials

Restrict by:
✓ Application (choose "Cloud Run" or "None")
✓ API (select "Generative Language API")
✓ IP address (optional, for backend)

This prevents key misuse if compromised
```

### 5. Key Rotation Schedule

**Recommended rotation:**
- Development: Monthly
- Staging: Every 3 months
- Production: Every 6 months (or quarterly)

**Rotation Process:**
```bash
# 1. Create new key
https://aistudio.google.com/app/apikeys
# Click "Create API Key"

# 2. Update GitHub Secrets
# Settings → Secrets and variables → Actions
# Update GEMINI_API_KEY with new key

# 3. Update .env.local (local development)
echo "VITE_GEMINI_API_KEY=new_key_here" > .env.local

# 4. Test deployment
npm run dev  # Local test
./deploy.sh dev ...  # Staging test

# 5. Delete old key
https://aistudio.google.com/app/apikeys
# Click delete on old key
```

---

## Your Setup Recommendations

### For GitHub Actions (CI/CD)

If you're using GitHub Secrets for CI/CD deployment:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GCP

on:
  push:
    branches: [main]

env:
  GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
  GCP_PROJECT_ID: ${{ secrets.GCP_PROJECT_ID }}

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Deploy to GCP
        run: |
          chmod +x deploy.sh
          ./deploy.sh dev $GCP_PROJECT_ID $GEMINI_API_KEY
```

**To set up:**
1. Go to GitHub repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Name: `GEMINI_API_KEY`
4. Value: Your API key from Google AI Studio
5. Save

---

## What Happens If Key Expires (Emergency Plan)

### Immediate Actions (Minutes)

```bash
# 1. Get new key
# Visit: https://aistudio.google.com/app/apikeys
# Create new key

# 2. Update local .env.local
echo "VITE_GEMINI_API_KEY=new_key" > .env.local

# 3. Update GitHub Secrets
# Settings → Secrets → Update GEMINI_API_KEY

# 4. Update Cloud Run deployment
gcloud run deploy natural-remedies-ai-api-dev \
  --set-env-vars GEMINI_API_KEY=new_key \
  --region us-east1

# 5. Test
npm run dev  # Should work within 5 minutes
```

### Post-Incident Review

```bash
# 1. Check what happened
# GCP Console → APIs & Services → Quotas
# GCP Console → Billing → Reports

# 2. Document the incident
# Add to troubleshooting guide

# 3. Prevent recurrence
# Set up monitoring alerts
# Upgrade plan if quota too low
```

---

## Monitoring Setup (For Peace of Mind)

### Option 1: Simple Email Alerts

```
GCP Console → Billing → Budgets and Alerts

Create Budget:
- Amount: $10/month (or your limit)
- Alert at: 50%, 75%, 90%, 100%
- Receive: Email notifications
```

### Option 2: Cloud Monitoring (Advanced)

```
GCP Console → Monitoring → Alerting Policies

Create Alert:
- Metric: Generative Language API - Requests
- Condition: > 1,000,000 requests/month
- Notification: Slack webhook
```

### Option 3: Automated Key Rotation

```bash
# Schedule with cron (your local machine)
0 0 1 * *  /path/to/rotate-api-key.sh

# Or use Google Cloud Tasks for automated rotation
```

---

## API Key Expiration by Provider

For reference, here's how other AI providers handle expiration:

| Provider | Expiration | Notes |
|----------|-----------|-------|
| **Google Gemini** | None (indefinite) | Stops if quota exceeded |
| **OpenAI** | None (indefinite) | Stops if quota exceeded |
| **Anthropic Claude** | None (indefinite) | Requires active billing |
| **AWS** | None (indefinite) | IAM key rotation recommended |
| **Azure** | 2 years (configurable) | Can set custom expiration |
| **GitHub** | 1 year default | Can set custom duration |

---

## Your Action Plan

### Immediate (Today)

- [ ] Create new API key from Google AI Studio
- [ ] Update .env.local
- [ ] Test locally: `npm run dev`
- [ ] Update GitHub Secrets (if using CI/CD)

### This Week

- [ ] Set up quota monitoring alerts
- [ ] Document key management procedure
- [ ] Create runbook for key rotation

### This Month

- [ ] Implement automated alerts in GCP
- [ ] Schedule quarterly key rotation
- [ ] Review usage patterns
- [ ] Consider paid plan if needed

### Ongoing

- [ ] Monitor quota monthly
- [ ] Check key access logs quarterly
- [ ] Rotate keys per schedule
- [ ] Update team documentation

---

## Summary

| Question | Answer |
|----------|--------|
| **Do Gemini API keys expire?** | No automatic expiration, but can fail if quota exceeded or project suspended |
| **How long do they last?** | Indefinite until manually deleted or quota issues |
| **How often should I rotate?** | Every 3-6 months for security best practices |
| **What happened to mine?** | Likely quota exceeded or inactivity timeout |
| **How to prevent future issues?** | Monitor quota, set up alerts, have backup keys |
| **What if it expires in production?** | Update secrets/environment variables and redeploy (15 min downtime) |

---

## Quick Links

- 📌 **Google AI Studio:** https://aistudio.google.com/app/apikeys
- 📌 **GCP Console:** https://console.cloud.google.com
- 📌 **Gemini API Docs:** https://ai.google.dev/docs
- 📌 **Pricing:** https://ai.google.dev/pricing
- 📌 **Quotas:** https://console.cloud.google.com/iam-admin/quotas

---

**Last Updated:** 2025-11-12
**Next Review:** When key is renewed
