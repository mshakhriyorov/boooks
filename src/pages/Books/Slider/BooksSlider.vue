<template>
    <div>
        <h2 class="text-lg mb-4 text-white text-bold">{{ title }}</h2>
        <div class="flex items-center gap-2">
            <div v-for="(book, _index) in books.slice(0, 3)" :key="`${book.name}_${book.id}`">
                <Book v-if="book.categoryId === categoryId" :book="book" isSlider />
            </div>
        </div>
        <div class="flex justify-end" v-if="books?.length > 3" @click="handleRoute(`/category/${categoryId}`)"
            aria-hidden="true">
            <span class="p-2 bg-gray-800 rounded-lg text-white backdrop-blur cursor-pointer hover:bg-gray-600">
                Ko'proq ko'ring...
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

import Book from '@/components/Book/Book.vue';

import './BooksSlider.scss';

import type { Book as BOOK } from '@/types/book';
import { handleRoute } from '@/utils/handleRoute';

export default defineComponent({
    name: 'BooksSlider',
    props: {
        books: { type: Array as PropType<BOOK[]>, required: true },
        categoryId: { type: String, required: true },
        title: { type: String, required: true }
    },
    setup() {
        return { handleRoute }
    },
    components: { Book }
});
</script>