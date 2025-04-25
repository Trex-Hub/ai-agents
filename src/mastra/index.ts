// MASTRA
import { Mastra } from '@mastra/core/mastra';
// LOGGER
import { createLogger } from '@mastra/core/logger';
// AGENTS
import { slackAgent } from './agents/slack';

export const mastra = new Mastra({
  workflows: {},
  agents: { slackAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
