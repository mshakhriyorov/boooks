import { defineStore } from 'pinia';

import axiosInstance from '@/utils/axios';
import type { Category } from '@/types/category';

const INITIAL_STATE: Category = {
  id: 0,
  name: '',
  description: '',
};

export const useCategoryStore = defineStore({
  id: 'category',
  state: () => ({
    categories: [] as Category[],
    category: INITIAL_STATE || null,
  }),
  getters: {},
  actions: {
    async createCategory(categoryData: { name: string; description: string }) {
      try {
        const response = await axiosInstance.post('/category', categoryData);

        this.categories = [...this.categories, response.data.data];
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async fetchAllCategories() {
      try {
        const response = await axiosInstance.get('/category');

        this.categories = response.data.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    reset() {
      this.categories = [];
    },
  },
});
