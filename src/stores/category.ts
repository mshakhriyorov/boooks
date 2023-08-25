import Vue from 'vue';
import { defineStore } from 'pinia';
import { translate } from '@/i18next'

import axiosInstance from '@/utils/axios';
import type { Category } from '@/types/category';

const SWEET_ALERT_OPTIONS = {
  title: translate("swal.deleteAlertCategory"),
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  confirmButtonText: translate("swal.deleteConfirm") as string,
};

const INITIAL_STATE: Category = {
  id: 0,
  name: '',
  description: '',
};

export const useCategoryStore = defineStore({
  id: 'category',
  state: () => ({
    categories: [] as Category[],
    category: INITIAL_STATE,
  }),
  getters: {
    getCategoryById: state => (id: number) =>
      state.categories.find(category => category.id === id),
  },
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
    async updateCategory({
      categoryId,
      categoryData,
    }: {
      categoryId:  number;
      categoryData: Object;
    }) {
      try {
        const response = await axiosInstance.put(
          `/category/${categoryId}`,
          categoryData,
        );

        return response.data;
      } catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
      }
    },
    async fetchCategory(categoryId: string | number) {
      try {
        const response = await axiosInstance.get(`/category/${categoryId}`);

        this.category = response.data.data;
        return response.data;
      } catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
      }
    },
    async removeCategory(categoryId: number) {
      Vue.swal(SWEET_ALERT_OPTIONS).then(async (result: any) => {
        if (result.value) {
          try {
            const response = await axiosInstance.delete(
              `/category/${categoryId}`,
            );

            if (response.data.status === 200) {
              Vue.swal(`${translate("swal.categoryDeleted")}`);
              this.fetchAllCategories();
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
      this.category = INITIAL_STATE;
    },
  },
});
