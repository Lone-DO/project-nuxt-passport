import slugify from 'slug';

import type { InsertLocation } from '~/lib/db/schema';

import { findUniqueSlug, updateLocationBySlug } from '~/lib/db/queries';
import { validateLocationPayload, validateUniqueLocationName } from '~/lib/db/validators';
// import { getDelayedResponse } from '~/lib/get-delayed-response';
import defineAuthenticatedEventHandler from '~/utils/define-authenticated-event-handler';

export default defineAuthenticatedEventHandler(async (event, session) => {
  // await getDelayedResponse();
  const result = await validateLocationPayload(event) as InsertLocation;
  const currentSlug = getRouterParam(event, 'slug') as string;
  await validateUniqueLocationName(result.name, Number(session.user.id), currentSlug);
  const slug = await findUniqueSlug(slugify(result.name));

  /**
   * Capture created data instance and return to client
   * TODO: After creating instance, redirect user to location details (/dashboard/:locationID)
   */;
  return updateLocationBySlug(result, currentSlug, slug, (session.user.id as unknown as number));
});
