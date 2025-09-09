import type { NavigationItem } from '~/lib/types';

export const useNavigationStore = defineStore('useNavigationStore', () => {
  const items = ref<NavigationItem[]>([]);
  const loading = ref(false);
  /** items are assigned on effect via locationStore */
  return { items, loading };
});
