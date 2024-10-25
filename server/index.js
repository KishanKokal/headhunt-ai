import express from "express";
import bodyParser from "body-parser";
import { booleanSearchGenerator } from "./services/booleanSearchGeneratorService.js";
import dotenv from "dotenv";


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Route to handle job description and generate Boolean search
app.post("/generate-boolean-search", async (req, res) => {
  const { jobDescription } = req.body;

  if (!jobDescription) {
    return res.status(400).json({ error: "Job description is required" });
  }

  try {
    const booleanSearch = await booleanSearchGenerator(jobDescription);
    res.json({ booleanSearch });
  } catch (error) {
    console.error("Error in generateBooleanSearchQuery:", error);
    res.status(500).json({ error: "Failed to generate boolean search query" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
