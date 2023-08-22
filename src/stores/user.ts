import { defineStore } from 'pinia';

import axiosInstance from '@/utils/axios';

import type { USER, USER_SIGN_IN, USER_SIGN_UP } from '@/types/user';

const initial_user: USER = {
  email: '',
  name: '',
  surname: '',
  password: '',
  id: null,
  token: '',
};

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    user: initial_user || null,
    isAuthenticated: false,
  }),
  getters: {},
  actions: {
    async fetchMe() {
      const response = await axiosInstance.get('/profile');

      if (response.status === 200) {
        this.user = { ...response.data.data };
        this.isAuthenticated = true;
      }
    },
    async signUp(userData: USER_SIGN_UP) {
      try {
        const response = await axiosInstance.post(
          '/auth/registration',
          userData,
        );
        localStorage.setItem('token', response.data.data.token);
        this.user = { ...response.data.data };
        this.isAuthenticated = true;

        return response;
      } catch (error: any) {
        return error;
      }
    },
    async signIn(userData: USER_SIGN_IN) {
      try {
        const response = await axiosInstance.post('/auth/login', userData);
        localStorage.setItem('token', response.data.data.token);
        this.user = { ...response.data.data };
        this.isAuthenticated = true;

        return response;
      } catch (error: any) {
        return error;
      }
    },
    logout() {
      localStorage.removeItem('token');
      this.user = initial_user;
      this.isAuthenticated = false;
    },
  },
});
