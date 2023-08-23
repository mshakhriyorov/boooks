<template>
  <div @click="handleRoute(`/book/${book.id}`)" class="cursor-pointer" :class="{ 'w-80': isSlider }">
    <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 relative">
      <img :src="book.image" :alt="book.name" class="h-full w-full object-cover object-center group-hover:opacity-75" />
      <div class="flex justify-between items-start absolute top-0 left-0 p-2 gap-2 z-10">
        <div class="p-2 bg-gray-300 rounded-lg text-white backdrop-blur cursor-pointer hover:bg-gray-400">
          <SavedSvg :class="{ 'book__saved': isSaved }" />
        </div>
        <div class="rounded-lg text-white backdrop-blur cursor-pointer flex gap-2">
          <div class="p-2 rounded-lg text-white backdrop-blur cursor-pointer flex bg-gray-300 hover:bg-gray-400">
            <EditSvg />
          </div>
          <div class="p-2 rounded-lg text-white backdrop-blur cursor-pointer flex bg-gray-300 hover:bg-gray-400">
            <DeleteSvg />
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-start justify-between p-4">
      <div class="flex flex-col justify-center gap-2">
        <h3 class="text-sm text-white">{{ book.name }}</h3>
        <p class="text-lg font-medium text-white-900">{{ book.year }}</p>
      </div>
      <div class="text-lg text-white-200">{{ book.author }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

import EditSvg from '@/assets/icons/EditSvg.vue';
import DeleteSvg from '@/assets/icons/DeleteSvg.vue';
import SavedSvg from '@/assets/icons/SavedSvg.vue';

import { handleRoute } from '@/utils/handleRoute';
import type { Book as BOOK } from '@/types/book';

export default defineComponent({
  name: 'Book',
  props: {
    book: { type: Object as PropType<BOOK>, required: true },
    isSlider: { type: Boolean, default: false }
  },
  setup() {
    const isSaved = true;

    return { handleRoute, isSaved }
  },
  components: { SavedSvg, EditSvg, DeleteSvg },
});
</script>

<style scoped lang="scss">
.book__saved {
  color: blue;
}
</style>
