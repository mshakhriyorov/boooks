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
import { defineComponent } from 'vue';
import Sidebar from './Sidebar/Sidebar.vue';

export default defineComponent({
  name: 'HomeView',
  components: { Sidebar },
});
</script>
