import type { EventHandlerRequest, H3Event } from 'h3';

import { auth } from '../auth';
import { findLocationByName } from './queries';
import { InsertLocation } from './schema';

export async function validateUserSession(event: H3Event<EventHandlerRequest>) {
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  /** IF User is NOT logged in, throw unauth error */
  if (!session?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }
  /** Else return session data */
  return session;
}

export async function validateLocationPayload(event: H3Event<EventHandlerRequest>) {
/** Validate submitted Data matches location SCHEMA */
  const result = await readValidatedBody(event, InsertLocation.safeParse);
  /** IF submitted Data is invalid, return errors to form */
  if (!result.success) {
    /** Pretty Errors messages as Key/value pairs */
    let statusMessage: string[] | string = [];
    const data: Record<string, string> = {};
    for (const issue of result.error.issues) {
      /** expected example("name: required") */
      statusMessage.push(`${issue.path.join('')}: ${issue.message}`);
      data[issue.path.join('')] = issue.message;
    }
    statusMessage = statusMessage.join('; ');

    throw createError({
      statusCode: 422,
      statusMessage,
      data,
    });
  }
  /** Else continue */
  return result.data;
}

export async function validateUniqueLocationName(name: string, id: number) {
  /** Verify that location.name is UNIQUE */
  if (await findLocationByName(name, Number(id))) {
    throw createError({
      status: 409,
      statusMessage: 'Invalid Location Name',
      data: { name: 'A location with that name already exist' },
    });
  }
  return true;
}
