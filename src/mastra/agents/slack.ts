import { Agent } from '@mastra/core/agent';
import { mcp } from '../mcp/slack';
import { model } from '../../utils/constant';
import { slackAgentInstructions } from '../instructions/slack-agent';

export const slackAgent = new Agent({
  name: 'Slack Agent',
  instructions: slackAgentInstructions,
  model,
  tools: await mcp.getTools(), // Tools are fixed at agent creation
});
