<template>
  <div as="nav" class="bg-gray-800 top-navbar">
    <div class="mx-auto max-w-7xl sm:px-6 lg:px-0">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <div
            class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="absolute -inset-0.5" />
            <span class="sr-only">Open main menu</span>
          </div>
        </div>
        <div
          class="flex flex-1 items-center justify-center sm:justify-start gap-2"
        >
          <div
            class="flex flex-shrink-0 items-center cursor-pointer"
            @click="handleRoute('/')"
            aria-hidden="true"
          >
            LOGO
          </div>
          <span
            v-if="userStore.isAuthenticated"
            class="flex flex-1 items-center justify-center sm:justify-start gap-14"
          >
            <div class="hidden sm:ml-6 sm:block">
              <div class="flex space-x-4">
                <span
                  @click="handleRoute('/saved')"
                  aria-hidden="true"
                  :class="[
                    isActive('/saved')
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium cursor-pointer',
                  ]"
                  >Saved
                  <span v-if="bookStore.savedBooks.length > 0">{{
                    bookStore.savedBooks.length
                  }}</span>
                </span>
              </div>
            </div>
            <!-- search input -->
            <form class="w-2/4">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >Qidiring</label
              >
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <SearchSvg />
                </div>
                <input
                  type="search"
                  id="default-search"
                  v-model="searchValue"
                  class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search books"
                  required
                />
                <button
                  type="submit"
                  class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Qidiring
                </button>
              </div>
            </form>
          </span>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <SelectLanguage />
          <!-- Profile dropdown -->
          <div as="div" class="relative ml-3">
            <div>
              <div
                @click="toggleMenu"
                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="absolute -inset-1.5" />
                <span class="sr-only">Open user menu</span>
                <span class="top-navbar__profile-logo">{{
                  generateProfileLogo(
                    userStore.user.name,
                    userStore.user.surname,
                  )
                }}</span>
              </div>
            </div>
            <transition
              v-if="showMenu"
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="userStore.isAuthenticated"
                class="absolute right-0 z-20 mt-2 w-54 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div class="flex flex-nowrap profile-block px-4 p-2">
                  <div aria-hidden="true" class="top-navbar__profile-logo">
                    <span>{{
                      generateProfileLogo(
                        userStore.user.name,
                        userStore.user.surname,
                      )
                    }}</span>
                  </div>
                  <div class="ml-3 mt-1 mb-3">
                    <p class="m-0 p-0 font-semibold top-navbar--truncate">
                      {{ `${userStore.user.name} ${userStore.user.surname}` }}
                    </p>
                    <p class="m-0 p-0 font-semibold top-navbar--truncate">
                      {{ userStore.user.email }}
                    </p>
                  </div>
                </div>
                <hr class="top-navbar__line" />
                <button
                  @click="handleLogout"
                  class="text-red-500 block px-4 py-2 text-sm hover:bg-gray-700 w-full text-left"
                  id="logout"
                >
                  Logout
                </button>
              </div>
              <div
                v-else
                class="absolute right-0 z-20 mt-2 w-54 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <router-link
                  class="text-white block px-4 py-2 text-sm"
                  :class="{ 'text-gray-900': isActive('/sign-in') }"
                  to="/sign-in"
                  id="menu-item-0"
                  >Sign In</router-link
                >
                <router-link
                  class="text-white block px-4 py-2 text-sm"
                  :class="{ 'text-gray-900': isActive('/sign-up') }"
                  to="/sign-up"
                  id="menu-item-1"
                  >Register</router-link
                >
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>

    <div class="sm:hidden">
      <div class="space-y-1 pb-3 pt-2">
        <div
          :class="[
            isActive('/saved')
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block rounded-md px-3 py-2 text-base font-medium',
          ]"
        >
          Saved
        </div>
      </div>
    </div>

    <div
      class="top-navbar__menu-container z-10"
      v-if="showMenu"
      @click="handleCloseModal"
      aria-hidden="true"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import SelectLanguage from '../SelectLanguage/SelectLanguage.vue';
import Dropdown from '@/assets/icons/DropdownSvg.vue';
import SearchSvg from '@/assets/icons/SearchSvg.vue';

import './TopNavbar.scss';

import { useUserStore } from '@/stores/user';

import { handleRoute } from '../../utils/handleRoute';
import { generateProfileLogo } from '../../utils/generateProfileLogo';
import { useCategoryStore } from '@/stores/category';
import { useBookStore } from '@/stores/books';

export default defineComponent({
  name: 'TopNavbar',
  setup() {
    const showMenu = ref(false);
    const showMobileMenu = ref(false);
    const searchValue = ref('');
    const userStore = useUserStore();
    const categoryStore = useCategoryStore();
    const bookStore = useBookStore();

    return {
      userStore,
      showMenu,
      showMobileMenu,
      searchValue,
      bookStore,
      categoryStore,
      handleRoute,
      generateProfileLogo,
    };
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    isActive(currentPath: string) {
      return window.location.pathname === currentPath;
    },
    handleLogout() {
      handleRoute('/sign-in');
      this.userStore.logout();
      this.bookStore.reset();
      this.categoryStore.reset();
      this.showMenu = false;
    },
    handleCloseModal() {
      this.showMenu = false;
    },
  },
  mounted() {
    this.userStore.fetchMe();
    this.bookStore.fetchAllSavedBooks();
  },
  components: { Dropdown, SelectLanguage, SearchSvg },
});
</script>
