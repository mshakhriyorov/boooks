<template>
  <div class="sidebar flex flex-col">
    <button @click="handleRoute('/book/editor')" type="button"
      class="relative z-10 overflow-hidden focus:outline-none mb-2 flex items-center justify-between leading-loose align-middle px-4 py-1 rounded cursor-pointer text-sm bg-indigo-800 hover:bg-indigo-600 text-white">
      Add a book</button>
    <button @click="handleRoute('/category/editor')" type="button"
      class="relative z-10 overflow-hidden focus:outline-none mb-2 flex items-center justify-between leading-loose align-middle px-4 py-1 rounded cursor-pointer text-sm bg-indigo-800 hover:bg-indigo-600 text-white">
      Create a category</button>
    <Dropdown class="mt-4" :options="categories" title="Kategoriyalar" />
  </div>
</template>

<script lang="ts">

import Dropdown from '@/components/Dropdown/Dropdown.vue';

import { categories } from '@/testData/categories.json';
import { handleRoute } from '@/utils/handleRoute';

export default {
  name: 'Sidebar',
  setup() {
    return { categories, handleRoute };
  },
  components: { Dropdown },
};
</script>
