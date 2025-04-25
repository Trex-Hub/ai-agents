import { groq } from '@ai-sdk/groq';
import { Agent } from '@mastra/core/agent';
import { mcp } from '../mcp/slack';

export const slackAgent = new Agent({
  name: 'Slack Agent',
  instructions: `
      You are a helpful slack assistant that provides accurate slack information.

      Your primary function is to help users get slack details for specific locations. When responding:
      - Always ask for a location if none is provided
      - If the location name isn't in English, please translate it
      - If giving a location with multiple parts (e.g. "New York, NY"), use the most relevant part (e.g. "New York")
      - Include relevant details like humidity, wind conditions, and precipitation
      - Keep responses concise but informative`,
  model: groq('llama-3.3-70b-versatile'),
  tools: await mcp.getTools(), // Tools are fixed at agent creation
});
