<script lang='ts' setup>
const collapsed = ref(true);
const iconName = computed(() => collapsed.value ? 'uil:arrow-to-right' : 'uil:left-arrow-to-left');

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
    class="bg-base-100 p-1 flex flex-col align-center gap-2 border-r-2 border-(--custom-divider-color) transition-all duration-200 shrink-0"
    :class="{ 'w-16': collapsed, 'w-40': !collapsed }"
  >
    <button
      :class="{ 'justify-end': !collapsed, 'justify-center': collapsed }"
      class="flex hover:bg-base-300 hover:cursor-pointer w-full"
      :title="`${!collapsed ? 'collapse' : 'expand'} navigation panel`"
      @click="toggleNav"
    >
      <Icon :name="iconName" size="24" />
    </button>
    <nav class="flex flex-col gap-1">
      <NavButton
        name="uil:map"
        label="Locations"
        href="/dashboard"
        :show-label="!collapsed"
      />
      <NavButton
        name="uil:map-marker-plus"
        label="Add Location"
        href="/dashboard/new"
        :show-label="!collapsed"
      />
      <div class="divider" />
      <NavButton
        name="uil:signout"
        label="Sign Out"
        href="/signout"
        :show-label="!collapsed"
      />
    </nav>
  </aside>
</template>
