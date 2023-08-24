<template>
    <div>
        <div v-if="savedBooks?.length > 0" class="mx-auto max-w-2xl px-4 sm:px-2 lg:max-w-7xl lg:px-8">
            <h2 class="text-white text-xl mb-2 capitalize">Saqlanganlar</h2>
            <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                <div v-for="book in savedBooks" :key="`${book.name}_${book.id}`" class="group">
                    <Book :book="book" />
                </div>
            </div>
            <!-- pagination buttons -->
            <div class="w-full mt-8" v-if="savedBooks?.length > 0">
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
                        v-for="(page, index) in pages" :key="`pages_${index}`"
                        :class="{ 'bg-gray-600': page === currentPage }">
                        <button type="button" class="py-2 px-3"
                            :class="{ 'cursor-not-allowed bg-gray-400': page === currentPage }"
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
                        <button type="button" class="py-2 px-3" :class="{ 'cursor-not-allowed': isInLastPage }"
                            :disabled="isInLastPage" @click="gotoNext">
                            &rsaquo;
                        </button>
                    </li>

                    <li class="leading-tight bg-stone-600 border border-gray-300 border-r-0 rounded-r border-r hover:bg-gray-400"
                        :class="{ 'bg-gray-200': isInLastPage }">
                        <button type="button" class="py-2 px-3" :class="{ 'cursor-not-allowed': isInLastPage }"
                            :disabled="isInLastPage" @click="gotoLast">
                            &raquo;
                        </button>
                    </li>
                </ul>
            </div>
        </div>
        <h2 v-else class="text-center flex flex-col items-center gap-2">
            Saqlangan kitoblar yo'q!
        </h2>
    </div>
</template>
  
<script lang="ts">
import { ref, defineComponent } from 'vue';
import { router } from '@/router';

import Book from '@/components/Book/Book.vue';

import { useBookStore } from '@/stores/books';
import { useCategoryStore } from '@/stores/category';

import { handleRoute } from '@/utils/handleRoute';

export default defineComponent({
    name: 'SavedBooks',
    setup() {
        const bookStore = useBookStore();
        const per_page = ref(bookStore.pagination.per_page);
        const total = ref(bookStore.pagination.total);
        const total_pages = ref(bookStore.pagination.total_pages);
        const currentPage = ref(bookStore.pagination.currentPage)
        const maxVisibleButtons = ref(10)
        const savedBooks = ref(bookStore.booksWithSavedStatus);

        console.log(savedBooks);


        return {
            per_page,
            total,
            total_pages,
            bookStore,
            savedBooks,
            currentPage,
            maxVisibleButtons,
            handleRoute
        };
    },
    watch: {
        $route(to, _from) {
            this.bookStore.fetchAllSavedBooks();
        },
        'rhis.bookStore.savedBooks': {
            async handler() {
                await this.bookStore.fetchAllSavedBooks();
                this.savedBooks = this.bookStore.booksWithSavedStatus;
            },
            immediate: true
        },
    },
    computed: {
        isInFirstPage() {
            return this.currentPage === 1;
        },

        isInLastPage() {
            return this.currentPage === this.total_pages;
        },
        startPage() {
            const minPage = 1;
            const maxPage = Math.max(this.total_pages - this.maxVisibleButtons + 1, minPage);
            return Math.max(Math.min(this.currentPage - Math.floor(this.maxVisibleButtons / 2), maxPage), minPage);
        },
        endPage() {
            return Math.min(this.startPage + this.maxVisibleButtons - 1, this.total_pages);
        },
        pages() {
            return Array.from({ length: this.endPage - this.startPage + 1 }, (_, index) => this.startPage + index);
        }
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
            if (pageNumber >= 1 && pageNumber <= this.total_pages) {
                this.$emit('pagechanged', pageNumber);
                this.currentPage = pageNumber;
            }
        },
        onPageChange() {
            console.log(this.currentPage);
        },
    },
    mounted() {
        this.bookStore.fetchAllSavedBooks();
    },
    components: { Book },
});
</script>
  