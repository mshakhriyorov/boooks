<template>
  <div>
    <div v-if="books?.length > 0">
      <div v-for="(category, _index) in categories" :key="category.id">
        <BooksSlider :categoryId="category.id" :books="books" :title="category.name" />
      </div>
    </div>
    <h2 v-else class="text-center flex flex-col items-center gap-2">
      <span> {{ $t('BooksCategories.empty') }} </span>
      <span @click="handleRoute('/book/editor/create')"
        class="bg-gray-800 w-20 p-1 rounded cursor-pointer hover:bg-gray-600">{{ $t('BooksCategories.add') }}</span>
    </h2>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent } from 'vue';

import BooksSlider from '../Slider/BooksSlider.vue';

import { useBookStore } from '@/stores/books';
import { useCategoryStore } from '@/stores/category';

import { handleRoute } from '@/utils/handleRoute';

export default defineComponent({
  name: 'BooksCategories',
  setup() {
    const bookStore = useBookStore();
    const categoryStore = useCategoryStore();
    const { books } = storeToRefs(bookStore);
    const { categories } = storeToRefs(categoryStore);

    return { bookStore, categoryStore, books, categories, handleRoute };
  },
  mounted() {
    this.bookStore.fetchAllBooks();
    this.bookStore.fetchAllSavedBooks();
  },
  components: { BooksSlider },
});
</script>
