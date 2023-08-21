<template>
    <div>
        <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img :src="image" :alt="name" class="h-full w-full object-cover object-center group-hover:opacity-75" />
        </div>
        <h3 class="mt-4 text-sm text-gray-700">{{ name }}</h3>
        <p class="mt-1 text-lg font-medium text-gray-900">{{ year }}</p>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Book',
    props: {
        id: {
            type: Number,
            required: true
        },
        categoryId: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: ""
        },
        description: {
            type: String,
            default: ""
        },
        author: {
            type: String,
            default: ""
        },
        year: {
            type: Number,
            required: true
        },
    },
    // setup() {
    //     return {}
    // }
}
</script>