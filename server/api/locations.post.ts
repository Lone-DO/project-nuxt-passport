import slugify from 'slug';

import type { InsertLocation } from '~/lib/db/schema';

import { findUniqueSlug, injectLocation } from '~/lib/db/queries';
import { validateLocationPayload, validateUniqueLocationName } from '~/lib/db/validators';
import defineAuthenticatedEventHandler from '~/utils/define-authenticated-event-handler';

export default defineAuthenticatedEventHandler(async (event, session) => {
  const result = await validateLocationPayload(event) as InsertLocation;
  await validateUniqueLocationName(result.name, Number(session.user.id));
  /** Verify that location.slug is UNIQUE */
  const slug = await findUniqueSlug(slugify(result.name));

  /**
   * Capture created data instance and return to client
   * TODO: After creating instance, redirect user to location details (/dashboard/:locationID)
   */;
  return injectLocation(result, slug, (session.user.id as unknown as number));
});
