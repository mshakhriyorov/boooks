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
  isSaved: false
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
    savedBooks: [] as Book[],
    book: INITIAL_STATE,
    pagination: {
      currentPage: 0,
      per_page: 0,
      total_pages: 0,
      total: 0
    }
  }),
  getters: {
    getBooksByCategoryId: state => (categoryId: number) => {
      return state.books.filter(book => book.categoryId === categoryId);
    },
    booksWithSavedStatus(state) {
      return state.books.map(book => {
        const isSaved = state.savedBooks.some(savedBook => savedBook.id === book.id);
        return { ...book, isSaved };
      });
    }
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
    async fetchAllBooks(params?: { name: string, categoryId: number }) {
      try {
        const response = await axiosInstance.get('/book', { params });

        const { itemCount, page, pageCount, take } = response.data.meta;

        this.books = response.data.data;
        this.pagination.total = itemCount;
        this.pagination.total_pages = pageCount;
        this.pagination.per_page = take;
        this.pagination.currentPage = page;
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
      bookId: number;
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
              Vue.swal("Kitob o'chirildi!");
              this.fetchAllBooks();
              this.fetchAllSavedBooks();
              this.books.filter(book => book.id !== bookId);
            }
          } catch (error: any) {
            console.log(error.response.data);
            return error.response.data;
          }
        }
      });
    },
    async saveBook(bookId: number) {
      try {
        const response = await axiosInstance.post(`/favorite/${bookId}`);

        this.savedBooks = [...this.savedBooks, response.data.data];
        return response.data;
      } catch (error) {
        console.log(error);
        return error;
      }
    },
    async removeSavedBook(bookId: number) {
      try {
        const response = await axiosInstance.delete(
          `/favorite/${bookId}`,
        );

        this.savedBooks.filter(book => book.id !== bookId);
        return response;
      } catch (error: any) {
        console.log(error.response.data);
        return error.response.data;
      }
    },
    async fetchAllSavedBooks(params?: { name: string, categoryId: number }) {
      try {
        const response = await axiosInstance.get('/favorite', { params });

        const { itemCount, page, pageCount, take } = response.data.meta;

        this.savedBooks = response.data.data;
        this.pagination.total = itemCount;
        this.pagination.total_pages = pageCount;
        this.pagination.per_page = take;
        this.pagination.currentPage = page;
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
