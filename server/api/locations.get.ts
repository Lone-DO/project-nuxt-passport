import { findLocations } from '~/lib/db/queries';
import defineAuthenticatedEventHandler from '~/utils/define-authenticated-event-handler';

export default defineAuthenticatedEventHandler(async (_, session) => {
  return findLocations(Number(session.user.id));
});
