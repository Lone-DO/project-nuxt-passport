import type { EventHandlerRequest, H3Event } from 'h3';

import { validateUserSession } from '~/lib/db/validators';

export type authCallback<T> = (callback: H3Event<EventHandlerRequest>, session: Awaited<ReturnType<typeof validateUserSession>>) => T;

export default function defineAuthenticatedEventHandler<T>(callback: authCallback<T>) {
  return defineEventHandler(async (event) => {
    /**
     * Fetch User Session from AuthClient
     * https://www.better-auth.com/docs/concepts/session-management#get-session
     */
    const session = await validateUserSession(event);
    return callback(event, session);
  });
}
