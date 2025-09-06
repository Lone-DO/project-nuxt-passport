import { DARK_MODE_ICONS, LIGHT_MODE_ICONS } from '~/lib/constants';

export const useAppStore = defineStore('useAppStore', () => {
  const colorMode = useColorMode();
  const icons = ref(LIGHT_MODE_ICONS);
  function update() {
    if ((colorMode.value) === 'dark') {
      icons.value = DARK_MODE_ICONS;
    }
    else {
      icons.value = LIGHT_MODE_ICONS;
    }
  }
  effect(update);
  onMounted(update);
  /**
   * Dev Note: `update` triggers 3x during initial page load due to SSR and Client staging
   * Must propagate onMounted due to SSR not having access to localStorage cache
   * Prevents initial page load from having incorrect icons
   */

  return {
    icons,
  };
});
