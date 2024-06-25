import  {GoogleGenerativeAI}  from "@google/generative-ai";
import { prompt } from "./constants.js";

// Access your API key as an environment variable (see "Set up your API key" above)
const api_key = "AIzaSyClwczniGRKrboMoOgP-aL6l9r_Y8bDa4g"
const genAI = new GoogleGenerativeAI(api_key);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export async function official_country_maker(countries) {
  prompt.push({text:`input: following the format from the above examples give official country names of [${countries}].the output must contain an array of the official names of the countries.the output must not contain any explaination`})
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text().trim();

  const t = text.slice(1,-1);
  const cout = array_giver(t);
  return cout;
}
  
function array_giver(cout){
  var countries = [];
  while (true){
    var index = cout.indexOf(',');
    if (index == -1){
      var c = cout.slice(0,index).trim();
      var d = c.slice(1,c.length);
      countries.push(d);
      break;
    }
    var c = cout.slice(0,index).trim();
    var d = c.slice(1,c.length-1)
    countries.push(d);
    cout = cout.slice(index+1,cout.length);
  }
  return countries;
}


var r = await official_country_maker(['india']);
console.log(r);
