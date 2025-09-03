import { findUniqueSlug, injectLocation } from '~/lib/db/queries';
import { validateLocationPayload, validateUniqueLocationName, validateUserSession } from '~/lib/db/validators';

export default defineEventHandler(async (event) => {
  /**
   * Fetch User Session from AuthClient
   * https://www.better-auth.com/docs/concepts/session-management#get-session
   */
  const session = await validateUserSession(event);
  const result = await validateLocationPayload(event);
  await validateUniqueLocationName(result.name, Number(session.user.id));
  /** Verify that location.slug is UNIQUE */
  const slug = await findUniqueSlug(result.name);

  /**
   * Capture created data instance and return to client
   * TODO: After creating instance, redirect user to location details (/dashboard/:locationID)
   */;
  return injectLocation(result, slug, (session.user.id as unknown as number));
});
