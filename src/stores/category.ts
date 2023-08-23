import { defineStore } from 'pinia';

import axiosInstance from '@/utils/axios';
import type { Category } from '@/types/category';
import Vue from 'vue';

const SWEET_ALERT_OPTIONS = {
  title: "Ushbu kategoriya o'chirilsinmi?",
  type: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  confirmButtonText: "Ha, o'chirilsin!"
}


const INITIAL_STATE: Category = {
  id: '',
  name: '',
  description: '',
};

export const useCategoryStore = defineStore({
  id: 'category',
  state: () => ({
    categories: [] as Category[],
    category: INITIAL_STATE,
  }),
  getters: { getCategoryById: (state) => (id: string) => state.categories.find(category => category.id.toString() === id.toString()) },
  actions: {
    async createCategory(categoryData: { name: string; description: string }) {
      try {
        const response = await axiosInstance.post('/category', categoryData);

        this.categories = [...this.categories, response.data.data];
        return response.data;
      } catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
      }
    },
    async fetchAllCategories() {
      try {
        const response = await axiosInstance.get('/category');

        this.categories = response.data.data;
        return response.data;
      } catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
      }
    },
    async updateCategory({ categoryId, categoryData }: { categoryId: string | number, categoryData: Object }) {
      try {
        const response = await axiosInstance.put(`/category/${categoryId}`, categoryData);

        return response.data;
      } catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
      }
    },
    async fetchCategory(categoryId: string) {
      try {
        const response = await axiosInstance.get(`/category/${categoryId}`);

        this.category = response.data.data;
        return response.data;
      } catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
      }
    },
    async removeCategory(categoryId: string) {
      Vue.swal(SWEET_ALERT_OPTIONS).then(async (result: any) => {
        if (result.value) {
          try {
            const response = await axiosInstance.delete(`/category/${categoryId}`);

            if (response.data.status === 200) {
              Vue.swal('Kategoriya o\'chirildi!');
              this.fetchAllCategories()
            }
          } catch (error: any) {
            console.log(error.response.data);
            return error.response.data;
          }
        }
      });

    },
    reset() {
      this.categories = [];
      this.category = INITIAL_STATE
    },
  },
});
