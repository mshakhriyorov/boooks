<template>
  <div class="sidebar flex flex-col">
    <button @click="handleRoute('/book/editor/create')" type="button"
      class="relative z-10 overflow-hidden focus:outline-none mb-2 flex items-center justify-between leading-loose align-middle px-4 py-1 rounded cursor-pointer text-sm bg-indigo-800 hover:bg-indigo-600 text-white">
      Add a book
    </button>
    <button @click="handleRoute('/category/editor/create')" type="button"
      class="relative z-10 overflow-hidden focus:outline-none mb-2 flex items-center justify-between leading-loose align-middle px-4 py-1 rounded cursor-pointer text-sm bg-indigo-800 hover:bg-indigo-600 text-white">
      Create a category
    </button>
    <Dropdown class="mt-4" :options="categoryStore.categories" title="Kategoriyalar" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Dropdown from '../Dropdown/Dropdown.vue';

import { useCategoryStore } from '@/stores/category';
import { handleRoute } from '@/utils/handleRoute';



export default defineComponent({
  name: 'Sidebar',
  setup() {
    const categoryStore = useCategoryStore();

    return { categoryStore, handleRoute };
  },
  mounted() {
    this.categoryStore.fetchAllCategories();
  },
  components: { Dropdown },
});
</script>
