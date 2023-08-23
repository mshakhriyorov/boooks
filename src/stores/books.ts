import { defineStore } from 'pinia';

import axiosInstance from '@/utils/axios';
import type { BOOK_DATA, Book } from '@/types/book';

const INITIAL_STATE: Book = {
  id: '',
  categoryId: '',
  image: '',
  year: null,
  author: '',
  name: '',
  description: '',
};
import { products } from '@/testData/products.json';

export const useBookStore = defineStore({
  id: 'book',
  state: () => ({
    books: [] as Book[],
    book: INITIAL_STATE,
  }),
  getters: {
    getBooksByCategoryId: state => (categoryId: string) => {
      // if (state.books.length > 0) {
      return state.books.filter(book => book.categoryId === categoryId);
      // }
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
    async fetchBook(bookId: string) {
      try {
        const response = await axiosInstance.get(`/book/${bookId}`);

        this.book = response.data.data;
        return response.data;
      } catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
      }
    },
    reset() {
      this.books = [];
    },
  },
});
