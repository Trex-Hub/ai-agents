// SERVICES
import { ApiService } from '../services';
// LOGGER
import logger from '../utils/logger';
// CONSTANTS
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, GOOGLE_OAUTH_TOKEN_URL, GOOGLE_CALENDAR_API_URL } from '../utils/constants';

const googleCalendarApi = new ApiService(GOOGLE_CALENDAR_API_URL);

/**
 * Fetches a fresh access token using OAuth2 refresh token.
 */
const fetchAccessToken = async (): Promise<string> => {
  try {
    const response = await fetch(GOOGLE_OAUTH_TOKEN_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        refresh_token: GOOGLE_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Failed to refresh token: ${errText}`);
    }

    const { access_token } = await response.json();
    return access_token;
  } catch (err) {
    logger.error('❌ Error fetching access token:', err);
    throw err;
  }
};

/**
 * Retrieves invited attendees and meeting details for a Google Meet.
 */
export const getMeetParticipants = async (
  meetingId: string
): Promise<{
  title: string;
  organizer: string;
  startTime: string;
  endTime: string;
  invitedAttendees: Array<{ email: string; name: string; status: string; optional: boolean }>;
  currentParticipantsNote: string;
} | null> => {
  try {
    if (!meetingId.trim()) {
      throw new Error('Meeting ID is required');
    }

    const accessToken = await fetchAccessToken();

    const { data, isError, error } = await googleCalendarApi.get<any>(
      `/events?q=${encodeURIComponent(meetingId)}&singleEvents=true`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (isError || !data) {
      throw error || new Error('Error retrieving meeting data');
    }

    const meetEvent = data.items?.find((evt: any) =>
      evt.conferenceData?.conferenceId === meetingId ||
      (evt.hangoutLink && evt.hangoutLink.includes(meetingId))
    );

    if (!meetEvent) {
      throw new Error(`No meeting found with ID: ${meetingId}`);
    }

    const attendees = meetEvent.attendees || [];

    return {
      title: meetEvent.summary || 'Untitled Meeting',
      organizer: meetEvent.organizer?.email || 'Unknown',
      startTime: meetEvent.start?.dateTime || meetEvent.start?.date || 'Unknown',
      endTime: meetEvent.end?.dateTime || meetEvent.end?.date || 'Unknown',
      invitedAttendees: attendees.map((a: any) => ({
        email: a.email,
        name: a.displayName || a.email,
        status: a.responseStatus || 'unknown',
        optional: a.optional || false,
      })),
      currentParticipantsNote:
        'Google does not provide a public API to retrieve real-time participant information.',
    };
  } catch (err) {
    logger.error('❌ Error in getMeetParticipants:', err);
    return null;
  }
};
