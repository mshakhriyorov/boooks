<template>
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="sr-only">Books</h2>

        <div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <a v-for="book in books" :key="book.id" :href="book.href" class="group">
                <Book :id="book.id" :categoryId="book.categoryId" :image="book.image" :name="book.name" :year="book.year" />
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'

import Book from '../../../components/Book/Book.vue';

const products = [
    {
        id: 1,
        categoryId: 3,
        name: 'The Scorpion',
        author: 'John Doyle',
        description: 'lorem ipsum dolor set..',
        href: '#',
        year: 2002,
        image: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    },
    {
        id: 2,
        categoryId: 3,
        name: 'The Scorpion',
        author: 'John Doyle',
        description: 'lorem ipsum dolor set..',
        href: '#',
        year: 2002,
        image: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    },
    {
        id: 3,
        categoryId: 3,
        name: 'The Scorpion',
        author: 'John Doyle',
        description: 'lorem ipsum dolor set..',
        href: '#',
        year: 2002,
        image: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    },
    {
        id: 4,
        categoryId: 3,
        name: 'The Scorpion',
        author: 'John Doyle',
        description: 'lorem ipsum dolor set..',
        href: '#',
        year: 2002,
        image: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    },
    {
        id: 5,
        categoryId: 3,
        name: 'The Scorpion',
        author: 'John Doyle',
        description: 'lorem ipsum dolor set..',
        href: '#',
        year: 2002,
        image: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    },
    {
        id: 6,
        categoryId: 3,
        name: 'The Scorpion',
        author: 'John Doyle',
        description: 'lorem ipsum dolor set..',
        href: '#',
        year: 2002,
        image: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    },
]

export default {
    name: 'BooksCategory',
    setup() {
        const books = ref(products);

        return { books }
    },
    components: { Book }
}
</script>