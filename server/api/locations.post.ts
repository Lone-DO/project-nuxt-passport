import { auth } from '~/lib/auth';
import db from '~/lib/db';
import { InsertLocation, location } from '~/lib/db/schema';

export default defineEventHandler(async (event) => {
  /**
   * Fetch User Session from AuthClient
   * https://www.better-auth.com/docs/concepts/session-management#get-session
   */
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

    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }

  /**
   * Capture created data instance and return to client
   * TODO: After creating instance, redirect user to location details (/dashboard/:locationID)
   */;
  const [created] = await db.insert(location).values({
    ...result.data,
    slug: result.data.name.replaceAll(' ', '-').toLowerCase(),
    userId: session.user.id as unknown as number,
  }).returning();

  return created;
});
