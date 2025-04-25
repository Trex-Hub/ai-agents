// MASTRA
import { Mastra } from '@mastra/core/mastra';
// LOGGER
import { createLogger } from '@mastra/core/logger';
// AGENTS
import { slackAgent } from './agents/slack';
import { registerApiRoute } from '@mastra/core/server';
// SERVICES
import { getMeetParticipants } from '../services/meet';

export const mastra = new Mastra({
  server: {
    apiRoutes:[
      registerApiRoute('/meet',{
        method:'GET',
        handler: getMeetParticipants
      }),
    ]
  },
  agents: { slackAgent },
  logger: createLogger({
    name: 'Mastra',
    level: 'info',
  }),
});
