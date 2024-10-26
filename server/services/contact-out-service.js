import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const CONTACT_OUT_API_KEY = process.env.CONTACT_OUT_API_KEY;

export const getProfileDetailsForAllCandidates = async (
  candidateProfileUrls
) => {
  let result = [];
  console.log(JSON.stringify(candidateProfileUrls, null, 2));
  await candidateProfileUrls.forEach(async (url) => {
    url = url.replace("?trk=public_profile_browsemap", "");
    const response = await axios.get(
      `https://api.contactout.com/v1/linkedin/enrich?profile=${url}&profile_only=true`,
      {
        headers: {
          token: CONTACT_OUT_API_KEY,
        },
      }
    );
    console.log(response);
    result.push(response);
  });

  return result;
};
