import type { EventHandlerRequest, H3Event } from 'h3';

import sendZodError from '~/utils/send-zod-error';

import { auth } from '../auth';
import { findLocationByName } from './queries';
import { InsertLocation } from './schema';

export async function validateUserSession(event: H3Event<EventHandlerRequest>) {
  try {
    const session = await auth.api.getSession({
      headers: event.headers,
    });
    /** IF User is NOT logged in, throw unauth error */
    if (!session?.user) {
      return sendError(event, createError({
        statusCode: 401,
        statusMessage: 'Unauthorized',
      }));
    }
    /** Else return session data */
    return session;
  }
  catch (error) {
    console.error(error);
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    }));
  }
}

export async function validateLocationPayload(event: H3Event<EventHandlerRequest>) {
/** Validate submitted Data matches location SCHEMA */
  const result = await readValidatedBody(event, InsertLocation.safeParse);
  /** IF submitted Data is invalid, return errors to form */
  if (!result.success) {
    return sendZodError(event, result.error);
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
