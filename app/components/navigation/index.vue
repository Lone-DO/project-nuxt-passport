<script lang='ts' setup>
const appStore = useAppStore();
const navStore = useNavigationStore();

const { icons } = storeToRefs(appStore);

const collapsed = ref(false);

onMounted(() => {
  collapsed.value = localStorage.getItem('nav-collapsed') === 'true';
});
</script>

<template>
  <aside
    class="dashboard-navigation p-1 flex flex-col border-r-2 border-(--custom-divider-color) transition-all duration-200 gap-1"
    :class="{ 'w-16': collapsed, 'w-48': !collapsed }"
  >
    <NavigationToggle v-model="collapsed" />
    <nav class="flex flex-col gap-1">
      <NavigationButton
        v-for="nav in navStore.topItems"
        :key="nav.id"
        :icon-name="nav.icon"
        :name="nav.name"
        :href="nav.href"
        :to="nav.to"
        :show-label="!collapsed"
      />
      <template v-if="navStore.loading || navStore.items.length">
        <li class="divider" />
        <!-- TODO: Add Mobile/Tablet Max Height adjustments -->
        <ul class="flex flex-col gap-1 ">
          <client-only>
            <li v-if="navStore.loading" class="skeleton h-10 w-full" />
            <template v-else-if="navStore.items.length">
              <NavigationLocationItem
                v-for="location in navStore.items"
                :key="location.id"
                :location
                :collapsed
              />
            </template>
          </client-only>
        </ul>
      </template>
      <div class="divider" />
      <NavigationButton
        :icon-name="icons.logout"
        name="Sign Out"
        href="/signout"
        :show-label="!collapsed"
      />
    </nav>
  </aside>
</template>
