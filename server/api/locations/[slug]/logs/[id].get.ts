import { findLocation, findLocationLog } from '~/lib/db/queries';
// import { getDelayedResponse } from '~/lib/get-delayed-response';
import defineAuthenticatedEventHandler from '~/utils/define-authenticated-event-handler';

export default defineAuthenticatedEventHandler(async (event, session) => {
  // await getDelayedResponse();
  const slug = getRouterParam(event, 'slug') as string;
  const logId = getRouterParam(event, 'id') as unknown as number;
  const location = await findLocation(Number(session.user.id), slug);
  const locationLog = await findLocationLog(session.user.id as unknown as number, location?.id as unknown as number, logId);

  if (!locationLog) {
    return sendError(event, createError({
      status: 404,
      statusMessage: 'Location Not Found',
    }));
  }
  return locationLog;
});
