<script lang='ts' setup>
import type { DropdownItem } from '~/lib/types';

defineProps<{
  items: DropdownItem[];
  listClasses?: string[];
}>();

const dropdown = useTemplateRef('dropdown');

function selectAction(item?: DropdownItem) {
  dropdown.value?.removeAttribute('open');
  return item?.onClick?.();
}
</script>

<template>
  <!-- https://daisyui.com/components/dropdown/#dropdown-using-details-and-summary -->
  <details ref="dropdown" class="dropdown">
    <summary class="btn p-1">
      <slot><Icon name="majesticons:more-menu-vertical" /></slot>
    </summary>
    <ul class="menu dropdown-content bg-base-300 rounded-box z-1 p-2 shadow-sm" :class="listClasses">
      <li v-for="(item, index) in items" :key="index">
        <NuxtLink
          :to="item?.to"
          @click="selectAction(item)"
        >
          <Icon
            :size="item.size || '20'"
            class="text-(--btn-fg)"
            :name="item.icon"
          />
          <span class="text-(--btn-fg)">{{ item.label }}</span>
        </NuxtLink>
      </li>
    </ul>
  </details>
</template>
