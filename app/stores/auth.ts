import { createAuthClient } from 'better-auth/vue';

export const useAuthStore = defineStore('useAuthStore', () => {
  const authClient = createAuthClient();
  const session = authClient.useSession();
  const user = computed(() => session.value.data?.user);
  const loading = computed(() => session.value.isPending);
  async function signIn() {
    await authClient.signIn.social({
      provider: 'github',
      callbackURL: '/dashboard',
      errorCallbackURL: '/error',
    });
  }

  async function signOut() {
    await authClient.signOut();
    setTimeout(() => navigateTo('/'), 1000);
  }
  return {
    loading,
    user,
    signIn,
    signOut,
  };
});
