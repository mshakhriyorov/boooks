<template>
  <div class="mx-auto max-w-2xl px-4 sm:px-2 lg:max-w-7xl lg:px-8">
    <h2 class="text-white text-xl mb-2 capitalize" v-if="title">{{ title }}</h2>
    <h2 class="text-white text-xl mb-2 capitalize" v-else>
      {{ categoryName }}
    </h2>
    <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      <div v-for="book in books" :key="`${book.name}_${book.id}`" class="group">
        <Book :book="book" />
      </div>
    </div>
    <!-- pagination buttons -->
    <div class="w-full mt-8">
      <ul v-if="total_pages > 1" class="flex pl-0 list-none rounded my-2">
        <li class="leading-tight bg-stone-600 border border-gray-300 border-r-0 ml-0 rounded-l hover:bg-gray-400"
          :class="{ 'bg-gray-200': isInFirstPage }">
          <button type="button" class="py-2 px-3" :class="{ 'cursor-not-allowed': isInFirstPage }"
            :disabled="isInFirstPage" @click="gotoFirst">
            &laquo;
          </button>
        </li>

        <li class="leading-tight bg-stone-600 border border-gray-300 border-r-0 hover:bg-gray-400"
          :class="{ 'bg-gray-200': isInFirstPage }">
          <button type="button" class="py-2 px-3" :class="{ 'cursor-not-allowed': isInFirstPage }"
            :disabled="isInFirstPage" @click="gotoPrevious">
            &lsaquo;
          </button>
        </li>

        <template v-if="showDots('left')">
          <li class="leading-tight bg-stone-600 border border-gray-300 border-r-0 hover:bg-gray-400"
            :class="{ 'bg-gray-600': isInFirstPage }">
            <button type="button" class="py-2 px-3" :class="{ 'cursor-not-allowed': isInFirstPage }"
              :disabled="isInFirstPage" @click="gotoPageNumber(1)">
              1
            </button>
          </li>

          <li class="leading-tight bg-stone-600 border border-gray-300 border-r-0 hover:bg-gray-400">
            <button type="button" class="py-2 px-3" :disabled="true">
              ...
            </button>
          </li>
        </template>

        <li class="leading-tight bg-stone-600 border border-gray-300 border-r-0 hover:bg-gray-400"
          v-for="(page, index) in pages" :key="`pages_${index}`" :class="{ 'bg-gray-600': page === currentPage }">
          <button type="button" class="py-2 px-3" :class="{ 'cursor-not-allowed bg-gray-400': page === currentPage }"
            :disabled="page === currentPage" @click="gotoPageNumber(page)">
            {{ page }}
          </button>
        </li>

        <template v-if="showDots('right')">
          <li class="leading-tight bg-stone-600 border border-gray-300 border-r-0 hover:bg-gray-400">
            <button type="button" class="py-2 px-3" :disabled="true">
              ...
            </button>
          </li>

          <li class="leading-tight bg-stone-600 border border-gray-300 border-r-0 hover:bg-gray-400"
            :class="{ 'bg-gray-600': isInLastPage }">
            <button type="button" class="py-2 px-3" :class="{ 'cursor-not-allowed': isInLastPage }"
              :disabled="isInLastPage" @click="gotoPageNumber(total_pages)">
              {{ total_pages }}
            </button>
          </li>
        </template>

        <li class="leading-tight bg-stone-600 border border-gray-300 border-r-0 hover:bg-gray-400"
          :class="{ 'bg-gray-200': isInLastPage }">
          <button type="button" class="py-2 px-3" :class="{ 'cursor-not-allowed': isInLastPage }" :disabled="isInLastPage"
            @click="gotoNext">
            &rsaquo;
          </button>
        </li>

        <li class="leading-tight bg-stone-600 border border-gray-300 border-r-0 rounded-r border-r hover:bg-gray-400"
          :class="{ 'bg-gray-200': isInLastPage }">
          <button type="button" class="py-2 px-3" :class="{ 'cursor-not-allowed': isInLastPage }" :disabled="isInLastPage"
            @click="gotoLast">
            &raquo;
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, type PropType, defineComponent } from 'vue';
import { router } from '@/router';

import Book from '@/components/Book/Book.vue';

import type { Book as BOOK } from '@/types/book';

import { useBookStore } from '@/stores/books';
import { useCategoryStore } from '@/stores/category';

export default defineComponent({
  name: 'Books',
  props: {
    currentPage: { type: Number, required: true },
    pagination: { type: Object, required: true },
    maxVisibleButtons: { type: Number, required: false, default: 5 },
    books: { type: Array as PropType<BOOK[]>, required: true },
    title: { type: String, default: '' },
  },
  setup() {
    const bookStore = useBookStore();
    const categoryStore = useCategoryStore();
    const per_page = ref(10);
    const total = ref(0);
    const total_pages = ref(0);
    const id = parseInt(router.currentRoute.params.id);
    const category = categoryStore.getCategoryById(id);
    const categoryName = ref(category?.name);


    return {
      per_page,
      total,
      total_pages,
      categoryName,
      categoryStore,
      bookStore,
      id,
    };
  },
  watch: {
    pagination: {
      handler(pagination: {
        per_page: number;
        total: number;
        total_pages: number;
      }) {
        this.per_page = pagination.per_page || 10;
        this.total = pagination.total || 0;
        this.total_pages = pagination.total_pages || 0;
      },
      immediate: true,
    },
    $route(to, _from) {
      const category = this.categoryStore.getCategoryById(to.params.id);
      if (category) {
        this.categoryName = category.name;
      }
    },
  },
  computed: {
    isInFirstPage() {
      return this.currentPage === 1;
    },

    isInLastPage() {
      return this.currentPage === this.total_pages;
    },
    pages() {
      const range = [];

      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push(i);
      }

      return range;
    },
    startPage() {
      if (this.currentPage === 1) {
        return 1;
      }

      if (this.currentPage === this.total_pages) {
        return this.total_pages - this.maxVisibleButtons + 1;
      }

      return this.currentPage - 1;
    },
    endPage() {
      return Math.min(
        this.startPage + this.maxVisibleButtons - 1,
        this.total_pages,
      );
    },
  },
  methods: {
    showDots(position = 'left') {
      const number = position === 'left' ? 1 : this.total_pages;
      const nextNumber = position === 'left' ? 2 : this.total_pages - 1;

      return !this.pages.includes(number) || !this.pages.includes(nextNumber);
    },
    gotoFirst() {
      this.gotoPageNumber(1);
    },

    gotoLast() {
      this.gotoPageNumber(this.total_pages);
    },

    gotoPrevious() {
      this.gotoPageNumber(this.currentPage - 1);
    },

    gotoNext() {
      this.gotoPageNumber(this.currentPage + 1);
    },

    gotoPageNumber(pageNumber: number) {
      this.$emit('pagechanged', pageNumber);
    },
    onPageChange() {
      console.log(this.currentPage);
    },
  },
  mounted() {
    this.bookStore.fetchAllBooks();
    this.categoryStore.fetchCategory(this.id);
  },
  components: { Book },
});
</script>
