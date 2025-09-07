export type NavigationItem = {
  id: number;
  name: string;
  icon: string;
  href?: string;
};

export const useNavigationStore = defineStore('useNavigationStore', () => {
  const items = ref<NavigationItem[]>([]);
  const loading = ref(false);
  /** items are assigned on effect via locationStore */
  return { items, loading };
});
