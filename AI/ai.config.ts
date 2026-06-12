import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateText } from 'ai';
import dotenv from "dotenv";

dotenv.config();

export function getAgentModel(){
console.log("API KEY:", process.env.OPENROUTER_API_KEY?.slice(0, 10));
console.log("MODEL:", process.env.OPENROUTER_DEFAULT_MODEL);
const provider = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const modelID = process.env.OPENROUTER_DEFAULT_MODEL || "anthropic/claude-3-haiku"

return provider(modelID);

}





