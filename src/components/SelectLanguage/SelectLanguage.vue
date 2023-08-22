<template>
  <div class="relative text-lg w-48">
    <button
      class="flex items-center justify-between px-3 py-2 w-full border border-gray-500 text-gray-400 rounded-lg"
      @click="isOptionsExpanded = !isOptionsExpanded"
      @blur="isOptionsExpanded = false"
    >
      <span>{{ selectedOption }}</span>
      <svg
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        class="h-4 w-4 transform transition-transform duration-200 ease-in-out"
        :class="isOptionsExpanded ? 'rotate-180' : 'rotate-0'"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>
    <transition
      enter-active-class="transform transition duration-500 ease-custom"
      enter-class="-translate-y-1/2 scale-y-0 opacity-0"
      enter-to-class="translate-y-0 scale-y-100 opacity-100"
      leave-active-class="transform transition duration-300 ease-custom"
      leave-class="translate-y-0 scale-y-100 opacity-100"
      leave-to-class="-translate-y-1/2 scale-y-0 opacity-0"
    >
      <ul
        v-show="isOptionsExpanded"
        class="absolute left-0 right-0 mb-4 bg-gray-800 divide-y rounded-lg shadow-lg overflow-hidden z-20"
      >
        <li class="px-3 py-2 text-sm">Select a language</li>
        <li
          v-for="(option, index) in options"
          :key="index"
          class="px-3 py-2 transition-colors text-gray-400 duration-300 hover:bg-gray-600 cursor-pointer"
          @mousedown.prevent="setOption(option)"
        >
          {{ option }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  name: 'SelectLanguage',
  setup() {
    const isOptionsExpanded = ref(false);
    const selectedOption = ref('Uzbek');
    const options = ref(['Uzbek', 'Russian']);

    return {
      isOptionsExpanded,
      selectedOption,
      options,
    };
  },
  methods: {
    setOption(option: string) {
      this.selectedOption = option;
      this.isOptionsExpanded = false;
    },
  },
};
</script>

<style scoped lang="scss">
.ease-custom {
  transition-timing-function: cubic-bezier(0.61, -0.53, 0.43, 1.43);
}
</style>
