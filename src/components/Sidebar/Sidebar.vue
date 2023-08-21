

<template>
    <div class="sidebar">
        <Dropdown :options="categoryOptions" :title="booksTitle" />
        <Dropdown :options="categoryOptions" :title="audioBooksTitle" />

    </div>
</template>

<script lang="ts">
import { ref } from 'vue'

import Dropdown from "@/components/Dropdown/Dropdown.vue";

export default {
    name: 'Sidebar',
    setup() {
        const categoryOptions = ref(['Category1', 'Category2', 'Category3']);
        const booksTitle = ref('Kitoblar');
        const audioBooksTitle = ref('Audio kitoblar');


        return { categoryOptions, booksTitle, audioBooksTitle }
    },
    components: { Dropdown }
}
</script>