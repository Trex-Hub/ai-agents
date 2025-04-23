import { groq } from '@ai-sdk/groq';
import { Agent } from '@mastra/core/agent';
import { weatherTool } from '../tools';
import { recipeAgentInstructions } from '../instructions/recipe-agent';
import {
  ingredientSearchTool,
  getMealDetailsTool,
  listCategoriesTools,
  filterByCategoryTool,
} from '../tools/recipe-tools';
import { Memory } from '@mastra/memory';

const memory = new Memory();

export const weatherAgent = new Agent({
  name: 'Weather Agent',
  instructions: `
      You are a helpful weather assistant that provides accurate weather information.

      Your primary function is to help users get weather details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn’t in English, please translate it
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative

      Use the weatherTool to fetch current weather data.
`,
  model: groq('llama-3.3-70b-versatile'),
  tools: { weatherTool },
});

export const recipeAgent = new Agent({
  name: 'Recipe Agent',
  instructions: recipeAgentInstructions,
  model: groq('llama-3.3-70b-versatile'),
  tools: {
    ingredientSearchTool,
    getMealDetailsTool,
    listCategoriesTools,
    filterByCategoryTool,
  },
  memory,
});
