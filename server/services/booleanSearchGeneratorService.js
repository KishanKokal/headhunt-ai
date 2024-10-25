import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const booleanSearchGenerator = async (jobDescription) => {
  try {
    if (!jobDescription) {
      console.log("Job description is required");
      return;
    }

    // Call OpenAI API with the job description
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Create a boolean search query based on the following job description in JSON format (do not provide the markdown) and dont provide breakdown of query:\n\n${jobDescription}`,
        },
      ],
      temperature: 0.9,
    });

    // Extract generated boolean search query from response
    const booleanSearchQuery = JSON.parse(response.choices[0].message.content);
    // console.log(booleanSearchQuery);
    return booleanSearchQuery;
  } catch (error) {
    throw error;
    console.error("Error generating boolean search:", error.message);
  }
};

await booleanSearchGenerator();
