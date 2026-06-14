import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { generateText } from 'ai';
import dotenv from "dotenv";


dotenv.config();

export function getAgentModel(){

const provider = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const modelID = process.env.OPENROUTER_DEFAULT_MODEL || "anthropic/claude-3-haiku"

return provider(modelID);

}





