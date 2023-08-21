<template>
    <div as="nav" class="bg-gray-800 top-navbar">
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-0">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <!-- Mobile menu button-->
                    <div
                        class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span class="absolute -inset-0.5" />
                        <span class="sr-only">Open main menu</span>
                        <!-- <AdjustmentsIcon v-if="!showMobileMenu" class="block h-6 w-6" aria-hidden="true" />
                        <AdjustmentsIcon v-else class="block h-6 w-6" aria-hidden="true" /> -->
                    </div>
                </div>
                <div class="flex flex-1 items-center justify-center sm:justify-start gap-2">
                    <div class="flex flex-shrink-0 items-center" @click="handleRoute('/')" aria-hidden="true">
                        LOGO
                    </div>
                    <span v-if="userStore.isAuthenticated"
                        class="flex flex-1 items-center justify-center sm:justify-start gap-14">
                        <div class="hidden sm:ml-6 sm:block">
                            <div class="flex space-x-4">
                                <span @click="handleRoute('/saved')" aria-hidden="true"
                                    :class="[isActive('/saved') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium']">Saved
                                    0
                                </span>
                            </div>
                        </div>
                        <!-- search input -->
                        <form class="w-2/4">
                            <label for="default-search"
                                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                            stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="search" id="default-search" v-model="searchValue"
                                    class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search books" required>
                                <button type="submit"
                                    class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                            </div>
                        </form>
                    </span>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <SelectLanguage />
                    <!-- Profile dropdown -->
                    <div as="div" class="relative ml-3">
                        <div>
                            <div @click="toggleMenu"
                                class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span class="absolute -inset-1.5" />
                                <span class="sr-only">Open user menu</span>
                                <span class="top-navbar__profile-logo">{{ generateProfileLogo(userStore.user.name,
                                    userStore.user.surname) }}</span>
                            </div>
                        </div>
                        <transition v-if="showMenu" enter-active-class="transition ease-out duration-100"
                            enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                            leave-active-class="transition ease-in duration-75"
                            leave-from-class="transform opacity-100 scale-100"
                            leave-to-class="transform opacity-0 scale-95">
                            <div v-if="userStore.isAuthenticated"
                                class="absolute right-0 z-20 mt-2 w-54 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div class="flex flex-nowrap profile-block px-4 p-2">
                                    <div aria-hidden="true" class="top-navbar__profile-logo">
                                        <span>{{ generateProfileLogo(userStore.user.name, userStore.user.surname) }}</span>
                                    </div>
                                    <div class="ml-3 mt-1 mb-3">
                                        <p class="m-0 p-0 font-semibold top-navbar--truncate">
                                            {{ `${userStore.user.name} ${userStore.user.surname}` }}
                                        </p>
                                        <p class="m-0 p-0 font-semibold top-navbar--truncate">{{ userStore.user.email }}</p>
                                    </div>
                                </div>
                                <hr class="top-navbar__line">
                                <button @click="handleLogout" class="text-red-500 block px-4 py-2 text-sm"
                                    id="logout">Logout</button>
                            </div>
                            <div v-else
                                class="absolute right-0 z-20 mt-2 w-54 origin-top-right rounded-md bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <router-link class="text-white block px-4 py-2 text-sm"
                                    :class="{ 'text-gray-900': isActive('/sign-in') }" to="/sign-in" id="menu-item-0">Sign
                                    In</router-link>
                                <router-link class="text-white block px-4 py-2 text-sm"
                                    :class="{ 'text-gray-900': isActive('/sign-up') }" to="/sign-up"
                                    id="menu-item-1">Register</router-link>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>


        <div class="sm:hidden">
            <div class="space-y-1 pb-3 pt-2">
                <div
                    :class="[isActive('/saved') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']">
                    Saved</div>
            </div>
        </div>

        <div class="top-navbar__menu-container z-10" v-if="showMenu" @click="handleCloseModal" aria-hidden="true" />
    </div>
</template>
  


<script lang="ts">
import { ref } from "vue";

import Dropdown from '../../assets/icons/DropdownSvg.vue';
import SelectLanguage from '../SelectLanguage/SelectLanguage.vue';

import './TopNavbar.scss';

import { useUserStore } from "@/stores/user";
import { router } from '@/router';

import { handleRoute } from '../../utils/handleRoute';
import { generateProfileLogo } from '../../utils/generateProfileLogo';

export default {
    name: 'TopNavbar',
    setup() {
        const showMenu = ref(false);
        const showMobileMenu = ref(false);
        const searchValue = ref('')
        const userStore = useUserStore();

        return { userStore, showMenu, showMobileMenu, searchValue, handleRoute, generateProfileLogo };
    },
    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        isActive(currentPath: string) {
            return router.currentRoute.fullPath === currentPath;
        },
        handleLogout() {
            handleRoute('/sign-in');
            this.userStore.logout();
            this.showMenu = false;
        },
        handleCloseModal() {
            this.showMenu = false
        }
    },
    mounted() {
        this.userStore.fetchMe();
    },
    components: { Dropdown, SelectLanguage }
};
</script>