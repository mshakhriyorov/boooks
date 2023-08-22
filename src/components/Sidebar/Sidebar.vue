<template>
  <div class="sidebar">
    <Dropdown :options="categories" title="Kategoriyalar" />
  </div>
</template>

<script lang="ts">

import Dropdown from '@/components/Dropdown/Dropdown.vue';

import { categories } from '@/testData/categories.json';

export default {
  name: 'Sidebar',
  setup() {
    return { categories };
  },
  components: { Dropdown },
};
</script>
