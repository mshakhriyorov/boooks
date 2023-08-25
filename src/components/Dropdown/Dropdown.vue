<template>
  <div class="dropdown relative w-full">
    <button
      class="relative z-10 overflow-hidden focus:outline-none w-full mb-2 flex items-center justify-between leading-loose align-middle px-4 py-1 rounded cursor-pointer text-sm bg-blue-600 text-white"
      @click="isOpenDropdown = !isOpenDropdown">
      {{ title }}
      <DropdownSvg />
    </button>
    <button v-if="isOpenDropdown" @click="isOpenDropdown = false" tabindex="-1"
      class="fixed top-0 inset-0 h-full w-full bg-black opacity-0 cursor-default" />
    <transition enter-active-class="transform transition duration-500 ease-custom"
      enter-class="-translate-y-1/2 scale-y-0 opacity-0" enter-to-class="translate-y-0 scale-y-100 opacity-100"
      leave-active-class="transform transition duration-300 ease-custom"
      leave-class="translate-y-0 scale-y-100 opacity-100" leave-to-class="-translate-y-1/2 scale-y-0 opacity-0">
      <ul v-show="isOpenDropdown"
        class="absolute left-0 right-0 mb-4 bg-gray-800 divide-y rounded-lg shadow-lg overflow-hidden z-20 capitalize">
        <li v-if="options?.length > 0" v-for="(option, _index) in options" :key="option.id.toString()"
          class="px-3 py-2 transition-colors text-gray-400 duration-300 hover:bg-gray-600 cursor-pointer flex justify-between dropdown__item"
          @click.prevent="setOption(option.id.toString())">
          <span>{{ option.name }}</span>
          <span class="dropdown__item-actions">
            <div class="rounded-lg text-white backdrop-blur cursor-pointer flex gap-2">
              <div @click.stop.prevent="() => handleOpenEditor(option.id)"
                class="p-1 rounded-lg text-white backdrop-blur cursor-pointer flex bg-gray-300 hover:bg-gray-400">
                <EditSvg />
              </div>
              <div @click.stop.prevent="handleDeleteCategory(option.id)"
                class="p-1 rounded-lg text-white backdrop-blur cursor-pointer flex bg-gray-300 hover:bg-gray-400">
                <DeleteSvg2 />
              </div>
            </div>
          </span>
        </li>
        <li v-if="options?.length === 0"
          class="px-3 py-2 transition-colors text-gray-400 duration-300 hover:bg-gray-600 cursor-pointer flex justify-between dropdown__item">
          Hali kategoriyalar yo'q. Iltimos, birorta yarating.</li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import { ref, type PropType, defineComponent } from 'vue';

import './Dropdown.scss';

import DropdownSvg from '@/assets/icons/DropdownSvg.vue';
import DeleteSvg2 from '@/assets/icons/DeleteSvg2.vue';
import EditSvg from '@/assets/icons/EditSvg.vue';

import type { Category } from '@/types/category';
import { handleRoute } from '@/utils/handleRoute';

import { router } from '@/router';
import { useCategoryStore } from '@/stores/category';

import type { TranslateResult } from "vue-i18n";

export default defineComponent({
  name: 'Dropdown',
  props: {
    options: {
      type: Array as PropType<Category[]>,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const categoryStore = useCategoryStore();
    const isOpenDropdown = ref(false);

    return { isOpenDropdown, categoryStore };
  },
  methods: {
    setOption(id: string) {
      handleRoute(`/category/${id}`);
      this.isOpenDropdown = false;
    },
    handleOpenEditor(id: number) {
      this.categoryStore.fetchCategory(id);
      const stringId = id.toString()
      if (router.currentRoute.query.id !== stringId) {
        router.push({ path: '/category/editor/edit', query: { id: stringId } })
      }
    },
    handleDeleteCategory(id: number) {
      this.categoryStore.removeCategory(id);
    }
  },
  components: { DropdownSvg, EditSvg, DeleteSvg2 },
})
</script>
