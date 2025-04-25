// GOOGLE MEET APIs
import { google } from 'googleapis';
// LOGGER
import logger from '../utils/logger';
// CONSTANTS
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
} from '../utils/constants';

/**
 * Retrieves the participant session details for a specific meeting.
 *
 * @param {any} c - The context object containing the request.
 * @returns {Promise<Array<{ participantId: string; joinTime: string; leaveTime: string }> | null>}
 *   An array of session details or null if no participants found.
 * @throws {Error} If there's an issue with authentication or API requests.
 */
export const getMeetParticipants = async (c: any) => {
  const meetingCode = c.req.query('meetingId');
  logger.info(`Getting participant sessions for meeting code ${meetingCode}`);

  try {
    // 1. Set up OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET
    );
    oauth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN });

    // 2. Initialize Google Meet API client (v2)
    const meet = google.meet({ version: 'v2', auth: oauth2Client });

    // 3. List conference records filtered by meeting code
    const { data: { conferenceRecords = [] } } = 
      await meet.conferenceRecords.list({
        filter: `space.meeting_code="${meetingCode}"`,
      });

    if (conferenceRecords.length === 0) {
      logger.info(`No conference record found for code ${meetingCode}`);
      return null;
    }

    // 4. Extract the actual conference record name
    const [{ name = '' }] = conferenceRecords ?? {};
    // 5. List participants for that conference record
    const response = await meet.conferenceRecords.participants.list({
        parent: name ?? "",
    });
    const participants = response.data?.participants || [];

    if (participants.length === 0) {
      logger.info('No participants found for this meeting.');
      return [];
    };

    return c.json({
        participants,
        recordName: name,
    });
  } catch (error) {
    logger.error('Error getting participant sessions:', error);
    throw error;
  }
};
