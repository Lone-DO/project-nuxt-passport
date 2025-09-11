import { deleteLocationBySlug } from '~/lib/db/queries';
import { validateLocationOwnership } from '~/lib/db/validators';
// import { getDelayedResponse } from '~/lib/get-delayed-response';
import defineAuthenticatedEventHandler from '~/utils/define-authenticated-event-handler';

export default defineAuthenticatedEventHandler(async (event, session) => {
  // await getDelayedResponse();
  const slug = getRouterParam(event, 'slug') as string;
  await validateLocationOwnership(slug, Number(session.user.id));
  return deleteLocationBySlug(slug, (session.user.id as unknown as number));
});
