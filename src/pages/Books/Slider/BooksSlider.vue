<template>
    <div>
        <h2 class="text-lg mb-4 text-white text-bold">{{ title }}</h2>
        <div class="flex items-center gap-2">
            <div v-for="(book, _index) in books.slice(0, 3)" :key="book.id">
                <Book v-if="book.categoryId === id" :book="book" isSlider />
            </div>
        </div>
        <div class="flex justify-end" v-if="books?.length > 3" @click="handleRoute(`/category/${id}`)" aria-hidden="true">
            <span class="p-2 bg-gray-800 rounded-lg text-white backdrop-blur cursor-pointer hover:bg-gray-600">
                Ko'proq ko'ring...
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import type { PropType } from 'vue';

import Book from '@/components/Book/Book.vue';

import './BooksSlider.scss';

import type { Book as BOOK } from '@/types/book';
import { handleRoute } from '@/utils/handleRoute';

export default {
    name: 'BooksSlider',
    props: {
        books: { type: Array as PropType<BOOK[]>, required: true },
        id: { type: Number, required: true },
        title: { type: String, required: true }
    },
    setup() {
        return { handleRoute }
    },
    components: { Book }
}
</script>