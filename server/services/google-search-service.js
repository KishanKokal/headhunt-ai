import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const SEARCH_ENGINE_ID = process.env.SEARCH_ENGINE_ID;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export const googleSearch = async (booleanSearchString) => {
  let url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${booleanSearchString} -intitle:"profiles" -inurl:"dir/+"+site:in.linkedin.com/in/+OR+site:in.linkedin.com/pub/`;
  let results = await axios.get(url);
  console;
  results = results.data.items.map((item) => {
    return { link: item.link, title: item.title };
  });
  console.log(results);
  return results;
};

googleSearch("Mandar Kulkarni Customer Engineering");
