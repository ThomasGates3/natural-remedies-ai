# Pre-Deployment Validation Checklist

## Critical Issues Found

### 🚨 **ISSUE #1: Gemini API Key Expired**
**Status:** ❌ BLOCKING
**Severity:** CRITICAL

Your current Gemini API key (`AIzaSyC5qXJ2EB06z58zT6vbguRskcaU-9E-_MI`) has expired and returns:
```
Error: API key expired. Please renew the API key.
```

**Action Required:**
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikeys)
2. Delete the expired key
3. Create a new API key
4. Update `.env.local` with the new key:
   ```bash
   echo "VITE_GEMINI_API_KEY=your_new_key_here" > .env.local
   ```
5. Re-run this checklist to verify

---

## Pre-Deployment Validation Tests

### Test 1: API Key Validation ✓ or ❌

**Command to verify:**
```bash
node -e "
const key = require('fs').readFileSync('.env.local', 'utf8').match(/VITE_GEMINI_API_KEY=(.+)/)?.[1];
console.log('API Key present:', !!key ? 'YES (masked: ' + key.substring(0,10) + '...' + key.substring(key.length-4) + ')' : 'NO');
"
```

**Expected:** API key present and not expired
**Status:** ❌ EXPIRED - Action required above

---

### Test 2: Gemini API Connectivity

**What it tests:** Whether the API key can authenticate and reach Google's Gemini API

**Test script:**
```bash
export VITE_GEMINI_API_KEY=$(grep VITE_GEMINI_API_KEY .env.local | cut -d= -f2)
node << 'EOTEST'
import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({ apiKey: process.env.VITE_GEMINI_API_KEY });
(async () => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say: working"
    });
    console.log("✓ API Connection: SUCCESS");
  } catch(e) {
    console.log("✗ API Connection:", e.message);
  }
})();
EOTEST
```

**Expected:** `✓ API Connection: SUCCESS`
**Status:** ❌ FAILED (API key expired)

---

### Test 3: Remedy Generation (Structured JSON)

**What it tests:** Whether Gemini returns properly structured remedy JSON

**Code being tested:**
```typescript
// services/geminiService.ts
export const getRemediesDirectFromGemini = async (symptoms: string): Promise<Remedy[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: `Based on the following symptom(s), provide 3 to 5 natural remedy recommendations: "${symptoms}".`,
    config: {
      systemInstruction: "You are a natural health remedy expert...",
      responseMimeType: "application/json",
      responseSchema: { /* remedy schema */ }
    }
  });
  return JSON.parse(response.text).remedies;
};
```

**Manual test:**
```bash
export VITE_GEMINI_API_KEY=$(grep VITE_GEMINI_API_KEY .env.local | cut -d= -f2)
npm run dev
# Then in browser:
# 1. Navigate to http://localhost:5173
# 2. Type "headache" in search box
# 3. Check if remedies appear with ratings
```

**Expected:**
- 3-5 remedy objects returned
- Each has: name, description, instructions, ratings (1-5 stars), pros/cons
- No parsing errors

**Status:** 🟡 UNTESTABLE (waiting for new API key)

---

### Test 4: Frontend Build

**What it tests:** TypeScript compilation and bundle creation

**Command:**
```bash
npm run build
```

**Expected output:**
```
✓ 52 modules transformed.
dist/index.html                  1.93 kB
dist/assets/index-*.js          446 kB
✓ built in 564ms
```

**Status:** ✅ PASSING

---

### Test 5: Backend Lambda/Cloud Run Container

**What it tests:** Express.js API endpoint responds correctly

**File:** `lambda/index.js`

**Manual test (after deployment):**
```bash
# Test health endpoint
curl https://your-cloud-run-url.run.app/health

# Expected response:
{ "status": "ok" }

# Test API endpoint
curl -X POST https://your-cloud-run-url.run.app/api/remedies \
  -H "Content-Type: application/json" \
  -d '{"symptoms":"headache"}'

# Expected response:
{
  "remedies": [
    { "name": "...", "description": "...", ... }
  ]
}
```

**Status:** 🟡 PENDING DEPLOYMENT

---

### Test 6: Terraform Infrastructure

**What it tests:** GCP resources can be provisioned

**Command:**
```bash
cd terraform
terraform plan \
  -var="gcp_project_id=your-project" \
  -var="gcp_region=us-east1" \
  -var="environment=dev" \
  -var="container_image=us-east1-docker.pkg.dev/PROJECT/docker-repo/natural-remedies-ai-api:latest" \
  -var="gemini_api_key=your-new-key"
```

**Status:** 🟡 PENDING (blocked by API key)

---

## Testing Workflow

### Phase 1: Local Development ✓
- [x] Environment variables configured
- [x] Dependencies installed (`npm install`)
- [x] Build passes (`npm run build`)
- [ ] Gemini API key valid and works
- [ ] Local dev server runs (`npm run dev`)
- [ ] Can search for remedies

### Phase 2: Pre-Deployment ⏳
- [ ] API key renewed and verified
- [ ] All local tests pass
- [ ] Git branch merged to main
- [ ] No uncommitted changes

### Phase 3: Deployment 🚫
- [ ] Cloud Run image built and pushed
- [ ] Terraform infrastructure deployed
- [ ] Frontend uploaded to Cloud Storage
- [ ] Cloud CDN configured

### Phase 4: Post-Deployment 🚫
- [ ] Health check passes
- [ ] API endpoint responds
- [ ] Cloud Run logs show no errors
- [ ] Test searches return remedies

---

## Troubleshooting Guide

### "API key expired"
**Error:** `Error: API key expired. Please renew the API key.`

**Solution:**
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikeys)
2. Delete old key
3. Create new key
4. Update `.env.local`
5. Restart `npm run dev`

### "Invalid API key"
**Error:** `Error: API key invalid or revoked`

**Solution:**
1. Verify API key in `.env.local` has no extra spaces
2. Check it's the correct key from AI Studio
3. Ensure Generative Language API is enabled in GCP console

### "Module not found: @google/genai"
**Error:** `Cannot find module '@google/genai'`

**Solution:**
```bash
npm install @google/genai
```

### "Cannot parse JSON response"
**Error:** `SyntaxError: Unexpected token in JSON`

**Solution:**
- Check Gemini system instruction has `responseMimeType: "application/json"`
- Verify responseSchema is properly defined
- Test with simpler prompt first

### "Build fails with TypeScript errors"
**Error:** `error TS2322: Type 'any' is not assignable to type 'Remedy'`

**Solution:**
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

---

## API Key Management Checklist

Before going live:

- [ ] API key is fresh (created recently, not expired)
- [ ] Key is stored in `.env.local` (NOT committed to git)
- [ ] `.env.local` is in `.gitignore`
- [ ] `.env.example` has placeholder (no real key)
- [ ] For production: Use GCP Secret Manager
- [ ] Enable audit logging on API key usage
- [ ] Set up billing alerts in GCP Console
- [ ] Document key rotation schedule (quarterly minimum)
- [ ] Have emergency key revocation procedure

---

## Next Steps

1. **IMMEDIATE:** Renew Gemini API key
   - Go to https://aistudio.google.com/app/apikeys
   - Create new key
   - Update `.env.local`

2. **VERIFY:** Run local tests
   ```bash
   npm run dev
   # Test searching for "headache"
   ```

3. **COMMIT:** Update version in roadmap
   ```bash
   git add README.md roadmap.md
   git commit -m "Fix API key expiration issue"
   ```

4. **MERGE:** Merge ui branch to main
   ```bash
   git checkout main
   git merge ui
   ```

5. **DEPLOY:** Run deployment script
   ```bash
   ./deploy.sh dev your-gcp-project-id your-new-api-key
   ```

6. **TEST:** Verify deployed app works
   - Visit Cloud Run URL
   - Search for a symptom
   - Verify remedies appear

---

**Last Updated:** 2025-11-12
**Status:** Requires API Key Renewal
