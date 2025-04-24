import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';
import { weatherWorkflow } from './workflows';
import { recipeAgent, weatherAgent, slackAgent } from './agents';

export const mastra = new Mastra({
  workflows: { weatherWorkflow },
  agents: { weatherAgent, recipeAgent, slackAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
