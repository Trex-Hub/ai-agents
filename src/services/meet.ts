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
 * @returns {Promise<Array<{ participantId: string; joinTime: string; leaveTime: string }> | null>} A promise that resolves with an array of participant session details, or null if an error occurs.
 * @throws {Error} If there's an issue with authentication or API request.
 */
export const getMeetParticipants = async (c: any) => {
  const meetingId = c.req.query('meetingId');
  logger.info(`Getting participant sessions for meeting ${meetingId}`);
  try {
    const oauth2Client = new google.auth.OAuth2(
        GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET
    );

    oauth2Client.setCredentials({
        refresh_token: GOOGLE_REFRESH_TOKEN
    });

    const meet = google.meet({ version: 'v2', auth: oauth2Client });

    // 1. List participants to get their IDs
    const participantsResponse = await meet.conferenceRecords.participants.list({
      parent: `conferenceRecords/${meetingId}`,
    });

    const participants = participantsResponse?.data?.participants || [];

    const participantSessions = [];

    // 2. For each participant, list their sessions
    for (const participant of participants) {
      const participantId = participant.name?.split('/').pop();
      if (!participantId) continue;

      const sessionsResponse = await meet.conferenceRecords.participants.participantSessions.list({
        parent: `conferenceRecords/${meetingId}/participants/${participantId}`,
      });

      const sessions = sessionsResponse?.data?.participantSessions || [];

      for (const session of sessions) {
        participantSessions.push({
          participantId,
          joinTime: session.startTime,
          leaveTime: session.endTime,
        });
      }
    }

    return participantSessions;
  } catch (error) {
    logger.error('Error getting participant sessions:', error);
    throw error;
  }
};
