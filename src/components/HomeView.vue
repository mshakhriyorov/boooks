<template>
  <div class="grid grid-cols-5 grid-flow-row gap-4 mt-5">
    <div class="col-span-1">
      <Sidebar />
    </div>
    <div class="col-span-4">
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
