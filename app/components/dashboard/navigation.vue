<script lang='ts' setup>
const appStore = useAppStore();
const navStore = useNavigationStore();

const { icons } = storeToRefs(appStore);

const collapsed = ref(false);

function syncToggle(evt: any) {
  localStorage.setItem('nav-collapsed', String(evt.target._modelValue));
}

onMounted(() => {
  collapsed.value = localStorage.getItem('nav-collapsed') === 'true';
});
</script>

<template>
  <aside
    class="dashboard-navigation p-1 flex flex-col border-r-2 border-(--custom-divider-color) transition-all duration-200"
    :class="{ 'w-16': collapsed, 'w-40': !collapsed }"
  >
    <label
      id="dashboard-navigation-toggle"
      class="swap swap-rotate w-full hover:bg-base-300"
      :title="`${!collapsed ? 'collapse' : 'expand'} navigation panel`"
      :class="{ 'justify-end': !collapsed, 'justify-center': collapsed, 'pr-2': !collapsed }"
    >
      <input
        v-model="collapsed"
        name="toggle"
        type="checkbox"
        @input="syncToggle"
      >
      <Icon
        class="swap-on"
        :name="icons.navToggle.right"
        size="24"
      />
      <Icon
        class="swap-off"
        :name="icons.navToggle.left"
        size="24"
      />
    </label>
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
