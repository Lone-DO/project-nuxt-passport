import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import db from './db'; // your drizzle instance
import env from './env';

const url = new URL(env.BETTER_AUTH_URL!);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'sqlite', // or "mysql", "sqlite"
  }),
  advanced: {
    database: {
      generateId: false,
    },
  },
  socialProviders: {
    github: {
      clientId: env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: env.AUTH_GITHUB_CLIENT_SECRET,
    },
  },
  trustedOrigins: [url.href],
});
