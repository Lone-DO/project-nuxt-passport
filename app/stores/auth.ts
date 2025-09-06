import { createAuthClient } from 'better-auth/vue';

import getCsrfHeaders from '~/lib/get-csrf-headers';

const authClient = createAuthClient();

export const useAuthStore = defineStore('useAuthStore', () => {
  const session = ref<Awaited<ReturnType<typeof authClient.useSession>> | null>(null);

  async function init() {
    session.value = await authClient.useSession(useFetch);
  }

  const user = computed(() => session.value?.data?.user);
  const loading = computed(() => session.value?.isPending);

  async function signIn() {
    /** TODO: Allow user to choose between Google/Github/Gitlab */
    await authClient.signIn.social({
      ...getCsrfHeaders(),
      provider: 'github',
      callbackURL: '/dashboard',
      errorCallbackURL: '/error',
    });
  }

  async function signOut() {
    await authClient.signOut(getCsrfHeaders());
    setTimeout(() => navigateTo('/'), 1000);
  }
  return {
    loading,
    user,
    init,
    signIn,
    signOut,
  };
});
