<template>
  <div class="grid grid-rows-3 grid-flow-col gap-4 mt-5">
    <div class="row-span-3">
      <Sidebar />
    </div>
    <div class="row-span-2">
      <BooksCategory />
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar/Sidebar.vue';
import BooksCategory from '../pages/Books/Category/BooksCategory.vue';
</script>


