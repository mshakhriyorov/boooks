<template>
  <div v-if="booksByCategoryId.length > 0">
    <h2 class="text-lg mb-4 text-white text-bold">{{ title }}</h2>
    <div class="flex items-center gap-2">
      <div v-for="(book, _index) in booksByCategoryId.slice(0, 3)" :key="`${book.name}_${book.id}`">
        <Book :book="book" :isSlider="true" />
      </div>
    </div>
    <div class="flex justify-end" v-if="booksByCategoryId?.length > 3" @click="handleRoute(`/category/${categoryId}`)"
      aria-hidden="true">
      <span class="p-2 bg-gray-800 rounded-lg text-white backdrop-blur cursor-pointer hover:bg-gray-600">
        {{ $t('BookSlider.more') }}...
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import Book from '@/components/Book/Book.vue';

import './BooksSlider.scss';

import { handleRoute } from '@/utils/handleRoute';
import { useBookStore } from '@/stores/books';

export default defineComponent({
  name: 'BooksSlider',
  props: {
    categoryId: { type: Number, required: true },
    title: { type: String, required: true },
  },
  setup(props) {
    const bookStore = useBookStore();
    const booksByCategoryId = ref(bookStore.getBooksByCategoryId(props.categoryId));

    return { booksByCategoryId, bookStore, handleRoute };
  },
  components: { Book },
  watch: {
    'this.books': {
      async handler() {
        await this.bookStore.fetchAllBooks();
        this.booksByCategoryId = this.bookStore.getBooksByCategoryId(this.categoryId);
      },
      immediate: true
    },
    'booksByCategoryId': {
      handler() {
        this.bookStore.fetchAllBooks();
        this.bookStore.fetchAllSavedBooks();
      },
      immediate: true
    }
  }
});
</script>
