const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

dotenv.config();

dotenv.config();

const app = express();
app.use(cors({
  origin: "https://neura-ai-gpt-app.vercel.app", // Vercel frontend URL
  methods: ["GET", "POST"],
}));
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/generate", async (req, res) => {
  try {
    const { prompt } = req.body;

    const model = "gemini-flash-lite-latest"; // or another model
    const contents = [
      {
        role: "user",
        parts: [{ text: prompt }],
      },
    ];

    const config = { responseModalities: ["TEXT"] };

    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    res.json({ result: response.output_text || response.text || response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
