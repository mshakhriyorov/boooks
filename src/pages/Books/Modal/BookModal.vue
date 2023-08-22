<template>
  <div>
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-white sm:pr-12 mb-4">{{ book.name }}</h2>
      <div
        class="p-2 rounded-md bg-indigo-900 text-white cursor-pointer flex items-center flex-row gap-2 hover:bg-indigo-700"
        @click="handleBack">
        <ArrowLeftSvg /> Orqaga
      </div>
    </div>
    <div class="flex gap-2">
      <div class="relative">
        <img :src="book.image" :alt="book.name" class="max-w-sm rounded" />
        <div class="flex justify-between items-center absolute bottom-2 left-2 gap-2">
          <div class="p-2 bg-gray-800 rounded-lg text-white backdrop-blur cursor-pointer hover:bg-gray-600">
            Saqlash
          </div>
          <div class="p-2 bg-gray-800 rounded-lg text-white backdrop-blur cursor-pointer hover:bg-gray-600">
            Yuklab olish
          </div>
        </div>
      </div>
      <div class="border border-gray-800 w-full p-10 rounded flex flex-col gap-6">
        <div class="text-xl text-gray-600 flex flex-col">
          Muallif: <span class="text-gray-400">{{ book.author }}</span>
        </div>
        <div class="text-xl text-gray-600 flex flex-col">
          Nashr etilgan yili: <span class="text-gray-400">{{ book.year }}</span>
        </div>
        <div class="text-xl text-gray-600 flex flex-col">
          Tavsif: <span class="text-gray-400">{{ book.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';

import ArrowLeftSvg from '@/assets/icons/ArrowLeftSvg.vue';

import type { Book } from '@/types/book';


export default {
  name: 'BookModal',
  props: {
    book: { type: Object as PropType<Book>, required: true },
  },
  methods: {
    handleBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  },
  components: { ArrowLeftSvg }
};
</script>
