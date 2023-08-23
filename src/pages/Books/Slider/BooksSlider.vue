<template>
  <div>
    <h2 class="text-lg mb-4 text-white text-bold">{{ title }}</h2>
    <div class="flex items-center gap-2">
      <div
        v-for="(book, _index) in booksByCategoryId.slice(0, 3)"
        :key="`${book.name}_${book.id}`"
      >
        <Book :book="book" :isSlider="true" />
      </div>
    </div>
    <div
      class="flex justify-end"
      v-if="booksByCategoryId?.length > 3"
      @click="handleRoute(`/category/${categoryId}`)"
      aria-hidden="true"
    >
      <span
        class="p-2 bg-gray-800 rounded-lg text-white backdrop-blur cursor-pointer hover:bg-gray-600"
      >
        Ko'proq ko'ring...
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import Book from '@/components/Book/Book.vue';

import './BooksSlider.scss';

import { handleRoute } from '@/utils/handleRoute';
import { useBookStore } from '@/stores/books';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'BooksSlider',
  props: {
    categoryId: { type: String, required: true },
    title: { type: String, required: true },
  },
  setup(props) {
    const bookStore = useBookStore();
    const { books } = storeToRefs(bookStore);
    const booksByCategoryId = bookStore.getBooksByCategoryId(props.categoryId);
    
    return { booksByCategoryId, books, bookStore, handleRoute };
  },
  components: { Book },
});
</script>
