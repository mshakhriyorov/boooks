<template>
  <div>
    <h2 class="text-2xl font-bold text-white sm:pr-12 mb-4">{{ name }}</h2>
    <div class="flex gap-2">
      <div class="relative">
        <img :src="image" :alt="name" class="max-w-sm rounded" />
        <div
          class="flex justify-between items-center absolute bottom-2 left-2 gap-2"
        >
          <div
            class="p-2 bg-gray-800 rounded-lg text-white backdrop-blur cursor-pointer"
          >
            Saqlash
          </div>
          <div
            class="p-2 bg-gray-800 rounded-lg text-white backdrop-blur cursor-pointer"
          >
            Yuklab olish
          </div>
        </div>
      </div>
      <div
        class="border border-gray-800 w-full p-10 rounded flex flex-col gap-6"
      >
        <div class="text-xl text-gray-600 flex flex-col">
          Muallif: <span class="text-gray-400">{{ author }}</span>
        </div>
        <div class="text-xl text-gray-600 flex flex-col">
          Nashr etilgan yili: <span class="text-gray-400">{{ year }}</span>
        </div>
        <div class="text-xl text-gray-600 flex flex-col">
          Tavsif: <span class="text-gray-400">{{ description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BookModal',
  props: {
    id: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: '',
    },
    year: {
      type: Number,
      required: true,
    },
  },
};
</script>
