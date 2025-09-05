<script lang='ts' setup>
const appStore = useAppStore();
const navStore = useNavigationStore();

const { icons } = storeToRefs(appStore);

const collapsed = ref(false);
const collapseIcon = computed(() => collapsed.value ? 'uil:arrow-to-right' : 'uil:left-arrow-to-left');

function toggleNav() {
  collapsed.value = !collapsed.value;
  localStorage.setItem('nav-collapsed', String(collapsed.value));
}

onMounted(() => {
  collapsed.value = localStorage.getItem('nav-collapsed') === 'true';
});
</script>

<template>
  <aside
    class="p-1 flex flex-col border-r-2 border-(--custom-divider-color) transition-all duration-200"
    :class="{ 'w-16': collapsed, 'w-40': !collapsed }"
  >
    <button
      :class="{ 'justify-end': !collapsed, 'justify-center': collapsed }"
      class="mb-1 flex hover:bg-base-300 hover:cursor-pointer"
      :title="`${!collapsed ? 'collapse' : 'expand'} navigation panel`"
      @click="toggleNav"
    >
      <Icon :name="collapseIcon" size="24" />
    </button>
    <nav class="flex flex-col gap-1">
      <NavigationButton
        :name="icons.map"
        label="Locations"
        href="/dashboard"
        :show-label="!collapsed"
      />
      <NavigationButton
        :name="icons.add"
        label="Add Location"
        href="/dashboard/new"
        :show-label="!collapsed"
      />
      <client-only>
        <div v-if="navStore.loading || navStore.items.length" class="divider" />
        <div v-if="navStore.loading" class="skeleton h-10 w-full" />
        <template v-else-if="navStore.items.length">
          <NavigationButton
            v-for="location in navStore.items"
            :key="location.id"
            :name="location.icon || icons.pin"
            :label="location.name"
            :href="location.href"
            :show-label="!collapsed"
          />
        </template>
      </client-only>
      <div class="divider" />
      <NavigationButton
        :name="icons.logout"
        label="Sign Out"
        href="/signout"
        :show-label="!collapsed"
      />
    </nav>
  </aside>
</template>
