import dotenv from 'dotenv';
dotenv.config();

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID ?? '';
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET ?? '';
export const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN ?? '';
export const GOOGLE_OAUTH_TOKEN_URL = process.env.GOOGLE_OAUTH_TOKEN_URL ?? '';
export const GOOGLE_CALENDAR_API_URL = process.env.GOOGLE_CALENDAR_API_URL;

export const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN ?? '';
export const SLACK_TEAM_ID = process.env.SLACK_TEAM_ID ?? '';
export const SLACK_CHANNEL_IDS = process.env.SLACK_CHANNEL_IDS ?? '';