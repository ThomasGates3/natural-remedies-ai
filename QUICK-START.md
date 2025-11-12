# Quick Start - After Renewing API Key

## Estimated Time: 20 minutes total

### 1️⃣ Renew Gemini API Key (5 min)

```bash
# 1. Open browser and go to:
# https://aistudio.google.com/app/apikeys

# 2. Click "Create API Key"
# 3. Copy the new key
# 4. Run this command:
echo "VITE_GEMINI_API_KEY=paste_your_new_key_here" > .env.local

# Verify it's set:
grep VITE_GEMINI_API_KEY .env.local
```

---

### 2️⃣ Test Locally (5 min)

```bash
# Start dev server
npm run dev

# Opens http://localhost:5173 automatically
# ✓ Should see beautiful landing page
```

**Manual Test Steps:**
1. Type "headache" in search box
2. Click "Search" or press Enter
3. ✓ Should see 3-5 remedy cards appear
4. Click a card to see details
5. Click heart icon to add to favorites
6. Check "Favorites" tab in sidebar
7. Try another search (check "History" tab)

**Expected Result:**
- Remedies load within 3-5 seconds
- Each remedy shows: name, description, ratings (1-5 stars), instructions
- Dark mode toggle works (top right)
- Mobile responsive (shrink window to test)

---

### 3️⃣ Merge to Main (1 min)

```bash
# Verify working tree is clean
git status

# Switch to main branch
git checkout main

# Merge ui branch
git merge ui

# Verify it worked
git log --oneline -3
```

---

### 4️⃣ Deploy to GCP (8 min)

```bash
# Get your GCP Project ID
gcloud config get-value project

# Get your API key again
grep VITE_GEMINI_API_KEY .env.local

# Run deployment (replace values)
chmod +x deploy.sh
./deploy.sh dev <your-project-id> <your-api-key>

# Example:
# ./deploy.sh dev my-gcp-project AIzaSyC5qXJ2EB06z58zT6vbguRskcaU-9E-_MI

# Wait for deployment to complete (~5-8 minutes)
```

**What the script does:**
1. Builds React frontend
2. Builds and pushes Docker image to Artifact Registry
3. Deploys Cloud Run service
4. Uploads frontend to Cloud Storage
5. Configures Cloud CDN

---

### 5️⃣ Test Deployed App (5 min)

After deployment completes, you'll see:
```
✓ Cloud Storage Bucket: natural-remedies-ai-frontend-dev-1234567890
✓ Cloud Run API: https://natural-remedies-ai-api-dev-xxxxx.run.app
```

**Test in browser:**
```bash
# Test API health
curl https://natural-remedies-ai-api-dev-xxxxx.run.app/health
# Should return: {"status":"ok"}

# Test API endpoint
curl -X POST https://natural-remedies-ai-api-dev-xxxxx.run.app/api/remedies \
  -H "Content-Type: application/json" \
  -d '{"symptoms":"headache"}'
# Should return remedies JSON
```

**Test in browser:**
1. Visit Cloud Run URL (from deploy output)
2. Search for "headache"
3. ✓ Remedies should appear
4. ✓ Click favorites to save
5. ✓ Dark mode toggle works
6. ✓ Mobile responsive

---

## If Something Goes Wrong

### "API key expired" error
```bash
# Get new key from: https://aistudio.google.com/app/apikeys
echo "VITE_GEMINI_API_KEY=new_key" > .env.local
npm run dev
```

### "Build fails" error
```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### "Terraform error during deploy"
```bash
# Check Terraform syntax
cd terraform
terraform validate

# Try init again
terraform init -upgrade
```

### "Cloud Run deployment fails"
```bash
# Check GCP credentials
gcloud auth application-default login

# Check APIs are enabled
gcloud services enable run.googleapis.com
gcloud services enable artifactregistry.googleapis.com
gcloud services enable storage.googleapis.com
```

---

## Verification Checklist

After deployment, verify:

- [ ] Dev server runs: `npm run dev` → http://localhost:5173
- [ ] Can search for symptoms locally
- [ ] Remedies appear with ratings
- [ ] Favorites button works
- [ ] Dark mode toggle works
- [ ] Mobile menu works (resize window)
- [ ] Build passes: `npm run build` → No errors
- [ ] Git clean: `git status` → Nothing to commit
- [ ] Cloud Run health: `curl /health` → 200 OK
- [ ] Cloud Run API: `curl /api/remedies` → Remedies JSON
- [ ] Live app works: Visit Cloud Run URL → Can search

---

## Key Files

| File | Purpose | Status |
|------|---------|--------|
| `App.tsx` | Main React component | ✅ Ready |
| `services/geminiService.ts` | Gemini API client | ✅ Ready |
| `lambda/index.js` | Cloud Run backend | ✅ Ready |
| `terraform/` | GCP infrastructure | ✅ Ready |
| `deploy.sh` | Deployment script | ✅ Ready |
| `.env.local` | API key (gitignored) | ⚠️ Needs renewal |
| `PRE-DEPLOYMENT-CHECKLIST.md` | Detailed validation | ✅ Reference |

---

## Next Features (After Deployment)

- [ ] User authentication (Firebase)
- [ ] Server-side favorites (Firestore)
- [ ] Community ratings
- [ ] Multi-language support
- [ ] Mobile app (React Native)
- [ ] Email notifications
- [ ] Export to PDF

See `roadmap.md` for full Phase 4+ plans.

---

## Support

- **Build issues?** → Check `npm run build` output
- **Deploy issues?** → See `deployment.md`
- **API issues?** → See `PRE-DEPLOYMENT-CHECKLIST.md`
- **Features?** → See `README.md`

---

**Good luck! 🚀 The app is ready to go live once you renew the API key.**
