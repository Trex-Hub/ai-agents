// MCP
import { MCPConfiguration } from '@mastra/mcp';
// CONSTANTS
import { 
  SLACK_BOT_TOKEN, 
  SLACK_TEAM_ID, 
  SLACK_CHANNEL_IDS
} from '../../utils/constants';

export const mcp = new MCPConfiguration({
  servers: {
    server: {
      command: 'npx',
      args: ['-y', '@modelcontextprotocol/server-slack'],
      env: {
        SLACK_BOT_TOKEN,
        SLACK_TEAM_ID,
        SLACK_CHANNEL_IDS,
      },
    },
  },
});
