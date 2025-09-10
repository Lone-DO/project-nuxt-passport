/** https://raw.githubusercontent.com/w3cj/nuxt-travel-log/33af03ac274544851b9652319ec0d257cbab8449/lib/try-parse-env.ts */

/* eslint-disable node/no-process-env */
import type { ZodObject, ZodRawShape } from 'zod';

import { ZodError } from 'zod';
/** Pretties ZOD Errors after validating .env keys */
export default function tryParseEnv<T extends ZodRawShape>(
  EnvSchema: ZodObject<T>,
  buildEnv: Record<string, string | undefined> = process.env,
) {
  try {
    EnvSchema.parse(buildEnv);
  }
  catch (error) {
    if (error instanceof ZodError) {
      let message = 'Missing required values in .env:\n';
      error.issues.forEach((issue) => {
        message += `${String(issue.path[0])}\n`;
      });
      const e = new Error(message);
      e.stack = '';
      throw e;
    }
    else {
      console.error(error);
    }
  }
}
