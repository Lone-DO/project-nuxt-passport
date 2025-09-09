import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import db from './db';
import env from './env';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite',
    debugLogs: false,
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
  socialProviders: {
    /** TODO: Add more Social Providers Google/Github/Gitlab */
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
    },
  },
});

export type authSession = Awaited<ReturnType<typeof auth.api.getSession>>;
export type authSessionValidated = Exclude<authSession, null>;
