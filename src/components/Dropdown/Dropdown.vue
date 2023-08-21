<template>
    <div class="dropdown relative">
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
                class="absolute left-0 right-0 mb-4 bg-gray-800 divide-y rounded-lg shadow-lg overflow-hidden z-20">
                <li v-for="(option, _index) in options" :key="option"
                    class="px-3 py-2 transition-colors text-gray-400 duration-300 hover:bg-gray-600 cursor-pointer"
                    @mousedown.prevent="setOption()">
                    {{ option }}
                </li>

            </ul>
        </transition>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';

import './Dropdown.scss';

import DropdownSvg from '@/assets/icons/DropdownSvg.vue';

export default {
    name: 'Dropdown',
    props: {
        options: {
            type: Array as () => string[],
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    setup() {
        const isOpenDropdown = ref(false);

        return { isOpenDropdown }
    },
    methods: {
        setOption() {
            this.isOpenDropdown = false;
        },
    },
    components: { DropdownSvg }
}
</script>