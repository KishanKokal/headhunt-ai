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
    console.log(booleanSearchQuery);
    return booleanSearchQuery;
  } catch (error) {
    throw error;
    console.error("Error generating boolean search:", error.message);
  }
};

await booleanSearchGenerator(`The Role

We build large-scale transaction processing systems that can work with many current and future payment networks. We build applications that help banks realise the value of this new approach early. We help banks to rapidly deliver the value of these applications to their customers.

What would you do here? 

Building highly-scalable and secure payments platform
Working with various product teams gathering requirements and adding capabilities 
Using cutting-edge cryptography to secure payments beyond industry standards.
Deriving actionable insights by mining TBs of data.
Building low-level infrastructure that aims to push the boundaries of network performance.
Identify patterns and provide solutions to class of problems
Research, evaluate and socialize new tools, technologies, and techniques to improve the value of the system 

What are we looking for?

Bachelor’s/Master’s degree in engineering with 1+ years of experience building enterprise systems
Worked on one or more large scale java applications
Good understanding of nuances of distributed systems, scalability, and availability
Good knowledge of one or more relational and NoSQL databases and transactions
Shrewd focus on latency and throughput of services
In-depth understanding of concurrency, synchronization, NIO, memory allocation and GC
Experience with IaaS clouds like AWS/Google Cloud, Azure, OpenStack etc.
Experience in working with Message Brokers and Application Containers`);
