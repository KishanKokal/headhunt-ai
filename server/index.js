import express from "express";
import bodyParser from "body-parser";
import { booleanSearchGenerator } from "./services/booleanSearchGeneratorService.js";
import { googleSearch } from "./services/google-search-service.js";
import { getProfileDetailsForAllCandidates } from "./services/contact-out-service.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Route to handle job description and generate Boolean search
app.post("/find-candidates", async (req, res) => {
  const { jobDescription } = req.body;

  if (!jobDescription) {
    return res.status(400).json({ error: "Job description is required" });
  }

  try {
    const booleanSearchString = await booleanSearchGenerator(jobDescription);
    const googleSearchResults = await googleSearch(booleanSearchString);
    const candidateDetails = await getProfileDetailsForAllCandidates(
      googleSearchResults.map((element) => element.link)
    );
    res.json({
      booleanSearchString,
      googleSearchResults,
      candidateDetails,
    });
  } catch (error) {
    console.error("Error in generateBooleanSearchQuery:", error);
    res.status(500).json({ error: "Failed to generate boolean search query" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
