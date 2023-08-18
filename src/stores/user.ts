import { defineStore } from 'pinia';

import axiosInstance from '@/utils/axios';

interface User {
    name: string;
    surname: string;
    email: string;
    password: string;
  }

export const userStore = defineStore({
    id: 'user',
    state: () => ({
        user: null as User | null,
    }),
    getters: {},
    actions: {
        async signUp(userData: User) {
            try {
                const response = await axiosInstance.post('/auth/registration', userData);
                localStorage.setItem("token", response.data.data.token);
                this.user = response.data.data;

                return response;
            } catch (error) {
                console.error(error);
            }
        },
    },
});
