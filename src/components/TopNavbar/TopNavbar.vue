<template>
    <div class="top-navbar z-10">
        <router-link class="shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            :class="{ 'bg-gray-100 text-red-900': isActive('') }" to="/">Home</router-link>
        <router-link v-if="userAccountStore.isAuthenticated"
            class="shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            :class="{ 'bg-gray-100 text-gray-900': isActive('saved/') }" to="/saved/">
            Saved
            <span class="rounded bg-gray-300 px-2">1</span>
        </router-link>
        <div class="relative inline-block text-left">
            <div>
                <button @click="toggleMenu" type="button"
                    class="inline-flex justify-center w-full shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    id="menu-button" aria-expanded="true" aria-haspopup="true">
                    User
                    <Dropdown />
                </button>
            </div>

            <div v-show="showMenu"
                class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="py-1" role="none" v-if="!userAccountStore.isAuthenticated">
                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                    <router-link class="text-gray-700 block px-4 py-2 text-sm"
                        :class="{ 'bg-gray-100 text-gray-900': isActive('sign-in/') }" to="/sign-in/" id="menu-item-0">Sign
                        In</router-link>
                    <router-link class="text-gray-700 block px-4 py-2 text-sm"
                        :class="{ 'bg-gray-100 text-gray-900': isActive('sign-up/') }" to="/sign-up/"
                        id="menu-item-1">Register</router-link>
                </div>

                <div class="py-1" role="none" v-if="userAccountStore.isAuthenticated">
                    <!-- Active: "bg-gray-100 text-gray-900", Not Active: "text-gray-700" -->
                    <div class="flex flex-nowrap profile-block px-4 p-2">
                        <div aria-hidden="true" class="top-navbar__profile-logo">
                            <span>{{ generateProfileLogo(userAccountStore.user.name, userAccountStore.user.surname)
                            }}</span>
                        </div>
                        <div class="ml-3 mt-1 mb-3">
                            <p class="m-0 p-0 font-semibold top-navbar--truncate">{{ `${userAccountStore.user.name}
                                                            ${userAccountStore.user.surname}` }}</p>
                            <p class="m-0 p-0 font-semibold top-navbar--truncate">{{ userAccountStore.user.email }}</p>
                        </div>
                    </div>
                    <button @click="handleLogout" class="text-red-500 block px-4 py-2 text-sm" id="logout">Logout</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from "vue";

import { router } from '@/router';
import { userStore } from "../../stores/user";

import Dropdown from '../../assets/icons/Dropdown.vue';

import './TopNavbar.scss';

import { generateProfileLogo } from '../../utils/generateProfileLogo';
import { CONFIG_BASE_URL } from '../../utils/axios';

export default {
    setup() {
        const showMenu = ref(false)
        const userAccountStore = userStore();

        return { userAccountStore, showMenu, generateProfileLogo };
    },
    methods: {
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        handleRoute() {
            router.push('/sign-up')
        },
        isActive(url: string) {
            return window.location.pathname === (CONFIG_BASE_URL + url);
        },
        handleLogout() {
            this.userAccountStore.logout();
            router.push('/sign-in');
            this.showMenu = false;
        }
    },
    mounted() {
        this.userAccountStore.fetchMe();
    },
    components: { Dropdown }
};
</script>