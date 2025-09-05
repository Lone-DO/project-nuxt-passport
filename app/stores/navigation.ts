export type NavigationItem = {
  id: string;
  name: string;
  icon: string;
  href?: string;
};

export const useNavigationStore = defineStore('useNavigationStore', () => {
  const items = ref<NavigationItem[]>([]);
  const loading = ref(false);

  return { items, loading };
});
