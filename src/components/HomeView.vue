<template>
  <div class="grid grid-cols-5 grid-flow-row gap-4 mt-5">
    <div class="col-span-1">
      <Sidebar />
    </div>
    <div v-if="isCurrentPath(`/book/${bookData.id}`)" class="col-span-4">
      <BookModal
        :id="1"
        :categoryId="bookData.id"
        :image="bookData.image"
        :name="bookData.name"
        :year="bookData.year"
        :author="bookData.author"
        :description="bookData.description"
      />
    </div>
    <div v-else class="col-span-4">
      <BooksCategory
        :pagination="{
          per_page: 10,
          total: 187,
          total_pages: 19,
        }"
        :currentPage="currentPage"
        @pagechanged="onPageChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref, watch } from 'vue';
import { router } from '@/router';

import BooksCategory from '@/pages/Books/Category/BooksCategory.vue';
import BookModal from '@/pages/Books/Modal/BookModal.vue';
import Sidebar from './Sidebar/Sidebar.vue';

export default {
  name: 'HomeView',
  setup() {
    const currentPage = ref(1);
    const bookData = reactive({
      id: 1,
      categoryId: 3,
      image:
        'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      name: 'The Scorpion',
      year: 2002,
      author: 'John Doyle',
      description:
        'lorem ipsum dolor set lorem ipsum dolor set lorem ipsum dolor set lorem ipsum dolor set',
    });

    return { currentPage, bookData };
  },
  methods: {
    onPageChange(page: any) {
      console.log(page);
      this.currentPage = page;
    },
    isCurrentPath(currentPath: string) {
      return router.currentRoute.fullPath === currentPath;
    },
  },
  watch: {
    $route() {
      this.isCurrentPath(`/book/${this.bookData.id}`);
    },
  },
  components: { Sidebar, BooksCategory, BookModal },
};
</script>
