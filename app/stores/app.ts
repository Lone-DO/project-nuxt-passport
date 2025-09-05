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

  return {
    icons,
  };
});
