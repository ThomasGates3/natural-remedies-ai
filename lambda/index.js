import express from "express";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = process.env.PORT || 8080;

console.log(`Starting server on port ${PORT}`);
console.log(`Environment: ${process.env.ENVIRONMENT || 'unknown'}`);
console.log(`API Key configured: ${process.env.GEMINI_API_KEY ? 'yes' : 'no'}`);

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("CRITICAL: GEMINI_API_KEY environment variable not set");
  console.error("Available env vars:", Object.keys(process.env).sort().join(', '));
  process.exit(1);
}

let ai;
try {
  ai = new GoogleGenAI({ apiKey });
  console.log("✓ Gemini AI initialized successfully");
} catch (error) {
  console.error("Failed to initialize Gemini AI:", error);
  process.exit(1);
}

const remedySchema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "The common name of the remedy (e.g., 'Ginger Tea', 'Peppermint Oil')." },
    description: { type: Type.STRING, description: "A brief, one-sentence summary of what the remedy is and what it's used for." },
    instructions: { type: Type.STRING, description: "Clear, step-by-step instructions on how to prepare and use the remedy." },
    timeframe: { type: Type.STRING, description: "Expected timeframe for relief (e.g., 'Within 30 minutes', '2-3 times a day for a week')." },
    precautions: { type: Type.STRING, description: "Important safety precautions, potential side effects, or contraindications (e.g., 'Avoid if pregnant', 'May interact with blood thinners')." },
    background: { type: Type.STRING, description: "A short paragraph on the scientific backing or traditional use background of the remedy." },
    ratings: {
      type: Type.OBJECT,
      properties: {
        accessibility: { type: Type.INTEGER, description: "Rating (1-5) of how easy it is to obtain the ingredients. 1=very difficult, 5=very easy." },
        easeOfUse: { type: Type.INTEGER, description: "Rating (1-5) of the simplicity of preparation and application. 1=very complex, 5=very simple." },
        effectiveness: { type: Type.INTEGER, description: "Rating (1-5) of the remedy's general effectiveness for the symptom. 1=low, 5=high." },
        speedOfRelief: { type: Type.INTEGER, description: "Rating (1-5) of how quickly results can be expected. 1=very slow, 5=very fast." },
        safetyProfile: { type: Type.INTEGER, description: "Rating (1-5) of how safe the remedy is for general use. 1=use with caution, 5=very safe." }
      },
      required: ["accessibility", "easeOfUse", "effectiveness", "speedOfRelief", "safetyProfile"]
    },
    pros: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of 2-3 bullet points listing the pros or key benefits of the remedy." },
    cons: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of 1-2 bullet points listing the cons, drawbacks, or minor side effects." }
  },
  required: ["name", "description", "instructions", "timeframe", "precautions", "background", "ratings", "pros", "cons"]
};

// Middleware
app.use(express.json());

// CORS (public demo, server-side key, no cookies): allow any origin and
// answer preflight requests directly so the bucket-hosted frontend can call us.
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Remedies endpoint
app.post("/api/remedies", async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || !symptoms.trim()) {
      return res.status(400).json({ error: "symptoms parameter is required" });
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Based on the following symptom(s), provide 3 to 5 natural remedy recommendations: "${symptoms}".`,
      config: {
        systemInstruction: `You are a helpful and knowledgeable assistant specializing in natural and traditional health remedies. Your primary goal is to provide safe, evidence-based, and practical information.

IMPORTANT SAFETY RULES:
1. You MUST include a clear disclaimer with every response: "The information provided is for educational purposes only and is not a substitute for professional medical advice. Always consult with a healthcare provider for any health concerns or before starting a new treatment."
2. For serious symptoms (e.g., chest pain, difficulty breathing, severe bleeding, signs of stroke), your ONLY response should be to advise seeking immediate medical attention from a professional healthcare provider or emergency services. Do not provide any remedies in such cases.
3. Prioritize remedies with some level of scientific backing or strong traditional evidence. Avoid making unsubstantiated claims.
4. Always include clear safety precautions, contraindications, and potential side effects for each remedy.
5. Format your response as a valid JSON object according to the provided schema. Do not add any text or markdown formatting before or after the JSON object.`,
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

    const jsonText = response.text.trim();
    const parsedResponse = JSON.parse(jsonText);

    res.status(200).json(parsedResponse);

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch remedies from Gemini API" });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✓ Server listening on 0.0.0.0:${PORT}`);
  console.log(`✓ Health check: GET /health`);
  console.log(`✓ API endpoint: POST /api/remedies`);
});
