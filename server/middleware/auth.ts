import { auth } from '~/lib/auth';

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });
  if (event.path.startsWith('/dashboard') && !session?.user) {
    /** TODO: Create Banner Alert component that watches for errors in AppStore */
    console.warn(`Unauthorized access to path ${event.path}, redirecting to home page`);
    await sendRedirect(event, '/', 302);
  }
});
