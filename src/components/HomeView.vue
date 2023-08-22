<template>
  <div class="grid grid-cols-5 grid-flow-row gap-4 mt-5">
    <div class="col-span-1">
      <Sidebar />
    </div>
    <div class="col-span-4">
      <!-- <Books :pagination="{
        per_page: 10,
        total: 187,
        total_pages: 19,
      }" :currentPage="currentPage" @pagechanged="onPageChange" :books="books" :title="title" />

      <BooksCategories :books="books" :categories="categories" />

      <BookModal :book="bookData" /> -->
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Sidebar from './Sidebar/Sidebar.vue';

export default {
  name: 'HomeView',
  // methods: {
  //   // onPageChange(page: any) {
  //   //   this.currentPage = page;
  //   // },
  //   isCurrentPath(currentPath: string) {
  //     return router.currentRoute.fullPath === currentPath;
  //   },
  // },
  components: { Sidebar },
};
</script>
