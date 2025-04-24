import { MCPConfiguration } from '@mastra/mcp';

export const mcp = new MCPConfiguration({
  servers: {
    server: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-slack'],
      env: {
        SLACK_BOT_TOKEN: process.env.SLACK_BOT_TOKEN ?? '',
        SLACK_TEAM_ID: process.env.SLACK_TEAM_ID ?? '',
        SLACK_CHANNEL_IDS: process.env.SLACK_CHANNEL_IDS ?? '',
      },
    },
  },
});
