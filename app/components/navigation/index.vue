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
    class="dashboard-navigation p-1 flex flex-col border-r-2 border-(--custom-divider-color) transition-all duration-200"
    :class="{ 'w-16': collapsed, 'w-40': !collapsed }"
  >
    <NavigationToggle v-model="collapsed" />
    <nav>
      <ul class="flex flex-col gap-1">
        <li>
          <NavigationButton
            :name="icons.map"
            label="Locations"
            href="/dashboard"
            :show-label="!collapsed"
          />
        </li>
        <li>
          <NavigationButton
            :name="icons.add"
            label="Add Location"
            href="/dashboard/new"
            :show-label="!collapsed"
          />
        </li>
        <client-only>
          <li v-if="navStore.loading || navStore.items.length" class="divider" />
          <li v-if="navStore.loading" class="skeleton h-10 w-full" />
          <template v-else-if="navStore.items.length">
            <NavigationLocationItem
              v-for="location in navStore.items"
              :key="location.id"
              :location
              :collapsed
            />
          </template>
          <li class="divider" />
          <li>
            <NavigationButton
              :name="icons.logout"
              label="Sign Out"
              href="/signout"
              :show-label="!collapsed"
            />
          </li>
        </client-only>
      </ul>
    </nav>
  </aside>
</template>
