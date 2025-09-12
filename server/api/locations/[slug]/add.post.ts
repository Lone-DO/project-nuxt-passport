import type { InsertLocationLog } from '~/lib/db/schema';

import { injectLocationLog } from '~/lib/db/queries';
import { validateLocationLogPayload, validateLocationOwnership, validateUniqueLocationLogName } from '~/lib/db/validators';
// import { getDelayedResponse } from '~/lib/get-delayed-response';
import defineAuthenticatedEventHandler from '~/utils/define-authenticated-event-handler';

export default defineAuthenticatedEventHandler(async (event, session) => {
  // await getDelayedResponse();
  const slug = getRouterParam(event, 'slug') as string;
  const location = await validateLocationOwnership(slug, Number(session.user.id));
  const result = await validateLocationLogPayload(event) as InsertLocationLog;
  await validateUniqueLocationLogName(result.name, Number(session.user.id), location.id);

  /**
   * Capture created data instance and return to client
   * TODO: After creating instance, redirect user to location details (/dashboard/:locationID)
   */
  return injectLocationLog(result, location.id, (session.user.id as unknown as number));
});
