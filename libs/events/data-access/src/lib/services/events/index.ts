type DateTimeFragment = {
  dateTime: string;
  timeZone: string;
};

type DateFragment = {
  date: string;
};

type Time = DateTimeFragment | DateFragment;

type Attendee = {
  email: string;
};

type Reminder = {
  method: "email" | "popup";
  minutes: number;
};

type Event = {
  summary: string;
  location: string;
  description: string;
  /**
   * É o horário de início (inclusivo) do evento. Para um evento recorrente, este é o horário de início da primeira instância.
   */
  start: Time;
  /**
   * É o horário de término (exclusivo) do evento. Para um evento recorrente, este é o horário de término da primeira instância.
   */
  end: Time;
  recurrence: string[];
  attendees: Attendee[];
  reminders: {
    useDefault: boolean;
    overrides?: Reminder[];
  };
};

type InsertEventArgs = {
  accessToken: string;
  event: Event;
};
type InsertEvent = (args: InsertEventArgs) => Promise<any>;
type EventsService = {
  insertEvent: InsertEvent;
};

export const eventsService: EventsService = {
  insertEvent: async ({ accessToken, event }) => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          body: JSON.stringify(event),
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          method: "POST",
        },
      );
      return await response.json();
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
