import { defineStore } from 'pinia';

import axiosInstance from '@/utils/axios';
import type { BOOK_DATA, Book } from '@/types/book';
import Vue from 'vue';

const INITIAL_STATE: Book = {
  id: 0,
  categoryId: 0,
  image: '',
  year: null,
  author: '',
  name: '',
  description: '',
};

const SWEET_ALERT_OPTIONS = {
  title: "Ushbu kitob o'chirilsinmi?",
  type: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  confirmButtonText: "Ha, o'chirilsin!",
};

export const useBookStore = defineStore({
  id: 'book',
  state: () => ({
    books: [] as Book[],
    book: INITIAL_STATE,
  }),
  getters: {
    getBooksByCategoryId: state => (categoryId: number) => {
      return state.books.filter(book => book.categoryId === categoryId);
    },
  },
  actions: {
    async createBook(bookData: BOOK_DATA) {
      try {
        const response = await axiosInstance.post('/book', bookData);

        this.books = [...this.books, response.data.data];
        return response.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async fetchAllBooks() {
      try {
        const response = await axiosInstance.get('/book');

        this.books = response.data.data;
      } catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
      }
    },
    async fetchBook(bookId: string | number) {
      try {
        const response = await axiosInstance.get(`/book/${bookId}`);

        this.book = response.data.data;
        return response.data;
      } catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
      }
    },
    async updateBook({
      bookId,
      bookData,
    }: {
      bookId:  number;
      bookData: Object;
    }) {
      try {
        const response = await axiosInstance.put(
          `/book/${bookId}`,
          bookData,
        );

        return response.data;
      } catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
      }
    },
    async removeBook(bookId: number) {
      Vue.swal(SWEET_ALERT_OPTIONS).then(async (result: any) => {
        if (result.value) {
          try {
            const response = await axiosInstance.delete(
              `/book/${bookId}`,
            );

            if (response.data.status === 200) {
              Vue.swal("Kategoriya o'chirildi!");
              this.fetchAllBooks();
            }
          } catch (error: any) {
            console.log(error.response.data);
            return error.response.data;
          }
        }
      });
    },
    reset() {
      this.books = [];
    },
  },
});
