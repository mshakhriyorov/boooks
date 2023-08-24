<template>
  <div>
    <div v-for="(category, _index) in categories" :key="category.id">
      <BooksSlider :categoryId="category.id" :books="books" :title="category.name" />
    </div>
  </div>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia';
import { defineComponent, ref } from 'vue';

import BooksSlider from '../Slider/BooksSlider.vue';

import { useBookStore } from '@/stores/books';
import { useCategoryStore } from '@/stores/category';

export default defineComponent({
  name: 'BooksCategories',
  setup() {
    const bookStore = useBookStore();
    const categoryStore = useCategoryStore();
    const { books } = storeToRefs(bookStore);
    const { categories } = storeToRefs(categoryStore);

    return { bookStore, categoryStore, books, categories };
  },
  mounted() {
    this.bookStore.fetchAllBooks();
  },
  components: { BooksSlider },
});
</script>
