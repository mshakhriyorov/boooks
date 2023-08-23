<template>
    <div>
        <div v-for="(category, _index) in categories" :key="category.id">
            <BooksSlider v-if="books.some(({ categoryId }) => categoryId === category.id)"
                :categoryId="category.id.toString()" :books="books" :title="category.name" isSlider />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

import BooksSlider from '../Slider/BooksSlider.vue';

import type { Book as BOOK } from '../../../types/book';
import type { Category } from '../../../types/category';

export default defineComponent({
    name: 'BooksCategories',
    props: {
        books: { type: Array as PropType<BOOK[]>, required: true },
        categories: {
            type: Array as PropType<Category[]>, required: true,
        },
    },
    components: { BooksSlider }
});
</script>