"use client";

import { useEffect, useState } from "react";

type UseGoogleSignInProps = {
  clientId: string;
  scope: string;
};

export const useGoogleSignIn = ({ clientId, scope }: UseGoogleSignInProps) => {
  const [accessToken, setAccessToken] = useState<string | undefined>();

  useEffect(() => {
    const getClient = () => {
      if (typeof window.google === "undefined") {
        throw new Error("Google API not loaded");
      }

      return window.google.accounts.oauth2.initTokenClient({
        callback: (tokenResponse) => {
          console.debug("tokenResponse", tokenResponse);
          setAccessToken(tokenResponse.access_token);
        },
        // eslint-disable-next-line camelcase -- Google's API uses snake case
        client_id: clientId,
        scope,
      });
    };

    const handleCredentialResponse = (response: any) => {
      const client = getClient();
      const accessTokenObject = client.requestAccessToken();

      if (typeof accessTokenObject !== "undefined") {
        // eslint-disable-next-line camelcase -- Google's API uses snake case
        const { access_token } = accessTokenObject;
        setAccessToken(access_token);
      }
    };

    if (typeof window.gapi === "undefined") {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      window.handleCredentialResponse = handleCredentialResponse;
    }
  }, [clientId, scope]);

  return { accessToken };
};
