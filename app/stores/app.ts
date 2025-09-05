export const useAppStore = defineStore('useAppStore', () => {
  const colorMode = useColorMode();
  const icons = computed<{ map: string; logout: string; add: string; pin: string }>(() => {
    if (colorMode.value === 'dark') {
      return {
        add: 'majesticons:map-marker-plus-line',
        map: 'majesticons:map-line',
        pin: 'majesticons:map-simple-marker-line',
        logout: 'majesticons:logout-line',
      };
    }
    return {
      add: 'majesticons:map-marker-plus',
      map: 'majesticons:map',
      pin: 'majesticons:map-simple-marker',
      logout: 'majesticons:logout',
    };
  });
  return {
    icons,
  };
});
