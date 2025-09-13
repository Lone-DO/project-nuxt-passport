import { deleteLocationLogById } from '~/lib/db/queries';
import { validateLocationOwnership } from '~/lib/db/validators';
// import { getDelayedResponse } from '~/lib/get-delayed-response';
import defineAuthenticatedEventHandler from '~/utils/define-authenticated-event-handler';

export default defineAuthenticatedEventHandler(async (event, session) => {
  // await getDelayedResponse();
  const slug = getRouterParam(event, 'slug') as string;
  const logId = getRouterParam(event, 'id') as unknown as number;
  const location = await validateLocationOwnership(slug, Number(session.user.id));
  return deleteLocationLogById(logId, (location.id as unknown as number), (session.user.id as unknown as number));
});
