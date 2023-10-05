/* eslint-disable no-unused-vars -- needed for extending NodeJS.ProcessEnv */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GOOGLE_CLIENT_ID: string | undefined;
    }
  }
}

export const googleClientID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
