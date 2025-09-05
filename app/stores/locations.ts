export const useLocationStore = defineStore('useLocationStore', () => {
  const {
    data,
    status,
    refresh: refreshLocations,
  } = useFetch('/api/locations', {
    lazy: true,
  });

  const items = computed(() => data.value?.sort((a, b) => a.name.localeCompare(b.name)));

  const navigationStore = useNavigationStore();
  effect(() => {
    if (items.value) {
      navigationStore.loading = true;
      const parsed: NavigationItem[] = [];
      items.value.forEach((location) => {
        parsed.push({
          id: `location-${location?.id}`,
          name: location.name,
          icon: 'uil:map-pin',
          href: '#',
        });
      });
      navigationStore.items = parsed;
      navigationStore.loading = false;
    }
  });

  return { items, status, refreshLocations };
});
