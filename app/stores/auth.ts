import { createAuthClient } from 'better-auth/client';

const authClient = createAuthClient();

export const useAuthStore = defineStore('useAuthStore', () => {
  const loading = ref(false);
  const isLoggedIn = ref(false);
  async function signIn() {
    loading.value = true;
    try {
      await authClient.signIn.social({
        provider: 'github',
        callbackURL: '/dashboard',
        errorCallbackURL: '/error',
      });
      isLoggedIn.value = true;
    }
    catch (err) {
      console.error(err);
    }
    finally {
      loading.value = false;
    }
  }
  return {
    loading,
    isLoggedIn,
    signIn,
  };
});
