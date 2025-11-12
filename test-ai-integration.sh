#!/bin/bash

# AI Integration Test Script
# This script validates that the Gemini API and backend integration work correctly
# before deployment to production

set -e

# Colors for output
BLUE='\033[0;34m'
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Natural Remedies AI - Integration Test Suite ===${NC}\n"

# Test 1: Check environment variables
echo -e "${BLUE}Test 1: Checking environment configuration...${NC}"
if [ -z "$VITE_GEMINI_API_KEY" ]; then
  if [ -f ".env.local" ]; then
    export $(grep VITE_GEMINI_API_KEY .env.local)
    echo -e "${GREEN}✓ Loaded VITE_GEMINI_API_KEY from .env.local${NC}"
  else
    echo -e "${RED}✗ VITE_GEMINI_API_KEY not set and .env.local not found${NC}"
    exit 1
  fi
fi

if [ -z "$VITE_GEMINI_API_KEY" ]; then
  echo -e "${RED}✗ VITE_GEMINI_API_KEY is empty${NC}"
  exit 1
fi

API_KEY_MASKED="${VITE_GEMINI_API_KEY:0:10}...${VITE_GEMINI_API_KEY: -4}"
echo -e "${GREEN}✓ VITE_GEMINI_API_KEY configured: ${API_KEY_MASKED}${NC}\n"

# Test 2: Check Node.js and npm
echo -e "${BLUE}Test 2: Checking Node.js and npm...${NC}"
NODE_VERSION=$(node -v)
NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓ Node.js: ${NODE_VERSION}${NC}"
echo -e "${GREEN}✓ npm: ${NPM_VERSION}${NC}\n"

# Test 3: Check if dependencies are installed
echo -e "${BLUE}Test 3: Checking dependencies...${NC}"
if [ ! -d "node_modules" ]; then
  echo -e "${YELLOW}  Installing dependencies...${NC}"
  npm install --silent
fi

if grep -q "@google/genai" package.json; then
  echo -e "${GREEN}✓ @google/genai package installed${NC}"
else
  echo -e "${RED}✗ @google/genai package not found${NC}"
  exit 1
fi
echo ""

# Test 4: Test direct Gemini API call
echo -e "${BLUE}Test 4: Testing direct Gemini API connectivity...${NC}"
cat > /tmp/test-gemini.js << 'EOF'
const { GoogleGenAI, Type } = require("@google/genai");

const apiKey = process.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  console.error("✗ VITE_GEMINI_API_KEY not found");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function testGemini() {
  try {
    console.log("  Sending test request to Gemini API...");
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Respond with exactly this JSON: {"test":"success","timestamp":"' + new Date().toISOString() + '"}',
      config: {
        responseMimeType: "application/json",
      }
    });

    const result = JSON.parse(response.text);
    if (result.test === "success") {
      console.log("✓ Gemini API connection successful");
      console.log("  Response received at:", result.timestamp);
      process.exit(0);
    } else {
      console.error("✗ Unexpected response format");
      process.exit(1);
    }
  } catch (error) {
    console.error("✗ Gemini API error:", error.message);
    if (error.message.includes("401") || error.message.includes("API key")) {
      console.error("  → Invalid or expired API key");
    }
    process.exit(1);
  }
}

testGemini();
EOF

if VITE_GEMINI_API_KEY="$VITE_GEMINI_API_KEY" node /tmp/test-gemini.js 2>&1; then
  echo -e "${GREEN}✓ Gemini API connectivity verified${NC}\n"
else
  echo -e "${RED}✗ Gemini API test failed${NC}"
  echo -e "${YELLOW}  Possible causes:${NC}"
  echo -e "    - Invalid or expired API key"
  echo -e "    - Network connectivity issue"
  echo -e "    - API quota exceeded"
  exit 1
fi

# Test 5: Test remedy generation
echo -e "${BLUE}Test 5: Testing remedy generation with sample symptom...${NC}"
cat > /tmp/test-remedies.js << 'EOF'
const { GoogleGenAI, Type } = require("@google/genai");

const apiKey = process.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

const remedySchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING },
    description: { type: Type.STRING },
    instructions: { type: Type.STRING },
    timeframe: { type: Type.STRING },
    precautions: { type: Type.STRING },
    background: { type: Type.STRING },
    ratings: {
      type: Type.OBJECT,
      properties: {
        accessibility: { type: Type.INTEGER },
        easeOfUse: { type: Type.INTEGER },
        effectiveness: { type: Type.INTEGER },
        speedOfRelief: { type: Type.INTEGER },
        safetyProfile: { type: Type.INTEGER }
      },
      required: ["accessibility", "easeOfUse", "effectiveness", "speedOfRelief", "safetyProfile"]
    },
    pros: { type: Type.ARRAY, items: { type: Type.STRING } },
    cons: { type: Type.ARRAY, items: { type: Type.STRING } }
  },
  required: ["name", "description", "instructions", "timeframe", "precautions", "background", "ratings", "pros", "cons"]
};

async function testRemedyGeneration() {
  try {
    console.log("  Requesting remedies for: 'headache'");
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: 'Based on the following symptom(s), provide 3 to 5 natural remedy recommendations: "headache".',
      config: {
        systemInstruction: `You are a helpful assistant specializing in natural health remedies. Format your response as valid JSON with remedies array. Include a disclaimer that this is educational only.`,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            remedies: {
              type: Type.ARRAY,
              items: remedySchema
            }
          },
          required: ["remedies"]
        }
      }
    });

    const parsed = JSON.parse(response.text);
    if (Array.isArray(parsed.remedies) && parsed.remedies.length > 0) {
      console.log(`✓ Successfully generated ${parsed.remedies.length} remedies`);
      console.log("  Sample remedy:");
      const remedy = parsed.remedies[0];
      console.log(`    - Name: ${remedy.name}`);
      console.log(`    - Ratings: A:${remedy.ratings.accessibility} E:${remedy.ratings.easeOfUse} F:${remedy.ratings.effectiveness}`);
      process.exit(0);
    } else {
      console.error("✗ No remedies in response");
      process.exit(1);
    }
  } catch (error) {
    console.error("✗ Remedy generation failed:", error.message);
    process.exit(1);
  }
}

testRemedyGeneration();
EOF

if VITE_GEMINI_API_KEY="$VITE_GEMINI_API_KEY" node /tmp/test-remedies.js 2>&1; then
  echo -e "${GREEN}✓ Remedy generation working correctly${NC}\n"
else
  echo -e "${RED}✗ Remedy generation test failed${NC}"
  exit 1
fi

# Test 6: Build validation
echo -e "${BLUE}Test 6: Validating React build...${NC}"
echo "  Running: npm run build"
if npm run build > /tmp/build.log 2>&1; then
  BUILD_SIZE=$(du -sh dist | cut -f1)
  echo -e "${GREEN}✓ Build successful (${BUILD_SIZE})${NC}"
  echo -e "${GREEN}✓ No TypeScript errors${NC}\n"
else
  echo -e "${RED}✗ Build failed${NC}"
  echo "  Error details:"
  tail -20 /tmp/build.log | sed 's/^/    /'
  exit 1
fi

# Summary
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ ALL TESTS PASSED${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}\n"

echo -e "${BLUE}Test Summary:${NC}"
echo -e "  ${GREEN}✓${NC} Environment configuration"
echo -e "  ${GREEN}✓${NC} Node.js & npm"
echo -e "  ${GREEN}✓${NC} Dependencies installed"
echo -e "  ${GREEN}✓${NC} Gemini API connectivity"
echo -e "  ${GREEN}✓${NC} Remedy generation"
echo -e "  ${GREEN}✓${NC} React build\n"

echo -e "${YELLOW}Next Steps:${NC}"
echo -e "  1. Merge 'ui' branch to 'main'"
echo -e "  2. Run deployment: ./deploy.sh dev <project-id> <api-key>"
echo -e "  3. Test deployed app at Cloud Run URL"
echo -e "  4. Monitor Cloud Run logs for errors\n"

# Cleanup
rm -f /tmp/test-gemini.js /tmp/test-remedies.js /tmp/build.log
