"use client";

import { eventsService } from "libs/events/data-access/src";
import { googleClientID } from "@/google-sign-in/data-access";
import { useGoogleSignIn } from "./useGoogleSignIn";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEventHandler,
  useState,
} from "react";

declare global {
  interface Window {
    gapi?: any;
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (options: {
            callback: (response: any) => void;
            client_id: string;
            scope: string;
          }) => {
            requestAccessToken: () => { access_token: string };
          };
        };
      };
    };
    handleCredentialResponse?: (response: any) => void;
  }
}

export const GoogleSignInButton = () => {
  if (typeof googleClientID === "undefined") {
    throw new Error("Can not sign in with Google. Application misconfigured");
  }

  const { accessToken } = useGoogleSignIn({
    clientId: googleClientID,
    scope: "https://www.googleapis.com/auth/calendar.events",
  });

  const [startDateTime, setStartDateTime] = useState<string>("");

  const handleCreateEvent: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      if (!accessToken) {
        throw new Error("Can not create event. User not signed in");
      }

      console.log(process.env.TZ);

      await eventsService.insertEvent({
        accessToken,
        event: {
          end: {
            dateTime: "2023-10-07T18:00:00-07:00",
            timeZone: process.env.TZ ?? "America/Sao_Paulo",
          },
          start: {
            dateTime: "2023-10-07T17:00:00-07:00",
            timeZone: process.env.TZ ?? "America/Sao_Paulo",
          },
        },
      });
    } catch (error) {
      // eslint-disable-next-line no-console -- For debugging purposes
      console.error(error);
    }
  };

  const handleStartDateTimeChange: ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const { value } = event.target;
    // eslint-disable-next-line no-console -- For debugging purposes
    console.debug(value);
    setStartDateTime(event.target.value);
  };

  if (!accessToken) {
    return (
      <article>
        <div
          data-callback="handleCredentialResponse"
          data-client_id={googleClientID}
          id="g_id_onload"
        />
        <div className="g_id_signin" data-type="standard" />
      </article>
    );
  }

  return (
    <article>
      <h1>Criar evento no Google Agenda</h1>
      <form onSubmit={handleCreateEvent}>
        <label htmlFor="startDateTime">Data e hora de início</label>
        <input
          id="startDateTime"
          name="start.dateTime"
          onChange={handleStartDateTimeChange}
          required
          type="datetime-local"
          value={startDateTime}
        />
        <button type="submit">Criar evento</button>
      </form>
    </article>
  );
};
