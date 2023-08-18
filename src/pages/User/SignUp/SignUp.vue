<template>
    <!-- <TopNavbar /> -->
    <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <div>
                <h2 class="mt-6 text-center text-3xl font-extrabold">Create a new account</h2>
            </div>
            <form class="mt-8 space-y-6" action="#" method="POST" @submit.prevent="handleSubmit">
                <div class="rounded-md shadow-sm -space-y-px mb-2 space-y-1">
                    <div>
                        <label for="name" class="sr-only">Name</label>
                        <input v-model="userData.name" id="name" name="name" type="text" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Name">
                    </div>
                    <div>
                        <label for="surname" class="sr-only">Surname</label>
                        <input v-model="userData.surname" id="surname" name="surname" type="text" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Surname">
                    </div>
                    <div>
                        <label for="email-address" class="sr-only">Email address</label>
                        <input v-model="userData.email" id="email-address" name="email" type="email" autocomplete="email"
                            required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Email address">
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input v-model="userData.password" id="password" name="password" type="password"
                            autocomplete="current-password" required
                            class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Password">
                        <p v-if="errorMessage">{{ errorMessage }}</p>
                    </div>
                </div>

                <div>
                    <button type="submit"
                        class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span class="absolute left-0 inset-y-0 flex items-center pl-3">
                            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                aria-hidden="true">
                                <path fill-rule="evenodd"
                                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                    clip-rule="evenodd" />
                            </svg>
                        </span>
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>


<script lang="ts">
import { reactive, ref } from 'vue';
import useRouter from 'vue-router';

import { userStore } from '../../../stores/user';

export default {
    name: 'SignUp',
    setup() {
        const userAccountStore = userStore();
        const router = new useRouter();
        const errorMessage = ref('')

        const userData = reactive({
            name: '',
            surname: '',
            email: '',
            password: '',
        })

        const handleSubmit = async () => {
            const response = await userAccountStore.signUp(userData);

            if (response?.status === 200) {
                router.push('/');
            } else {
                errorMessage.value = response?.data.message
                console.log(response);

            }

        }

        return {
            userData,
            handleSubmit,
            errorMessage
        };
    }
};
</script>