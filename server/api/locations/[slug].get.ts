import { findLocation } from '~/lib/db/queries';
// import { getDelayedResponse } from '~/lib/get-delayed-response';
import defineAuthenticatedEventHandler from '~/utils/define-authenticated-event-handler';

export default defineAuthenticatedEventHandler(async (event, session) => {
  // await getDelayedResponse();
  const slug = getRouterParam(event, 'slug') as string;
  const location = await findLocation(Number(session.user.id), slug);

  if (!location) {
    return sendError(event, createError({
      status: 404,
      statusMessage: 'Location Not Found',
    }));
  }
  return location;
});
