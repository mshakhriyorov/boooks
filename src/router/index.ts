import Vue from 'vue';
import VueRouter from 'vue-router';

import { products } from '@/testData/products.json';
import { categories } from '@/testData/categories.json';

import EditorBook from '../pages/Editor/Book/EditorBook.vue';
import EditorCategory from '../pages/Editor/Category/EditorCategory.vue';
import HomeView from '@/components/HomeView.vue';


Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: HomeView,
      props: true,
      children: [
        {
          path: 'category/editor/:type',
          name: "category-editor",
          component: EditorCategory
        },
        {
          path: 'book/editor/:type',
          name: "book-editor",
          component: EditorBook
        },
        {
          path: 'book/:id',
          name: "book-details",
          props: route => ({ id: route.params.id, book: products[0] }),
          component: () => import('@/pages/Books/Modal/BookModal.vue')
        },
        {
          path: 'category/:id',
          name: "books-in-category",
          props: route => ({
            id: route.params.id, books: products, currentPage: 1, pagination: {
              per_page: 10,
              total: 187,
              total_pages: 19,
            }
          }),
          component: () => import('@/pages/Books/Books.vue')
        },
        {
          path: '',
          props: route => ({ id: route.params.id, categories: categories, books: products }),
          name: 'books-with-categories',
          component: () => import('@/pages/Books/Categories/BooksCategories.vue')
        },
        {
          path: 'saved',
          name: "saved-books",
          props: route => ({
            id: route.params.id, books: products, currentPage: 1, title:"Saqlanganlar", pagination: {
              per_page: 10,
              total: 187,
              total_pages: 19,
            }
          }),
          component: () => import('@/pages/Books/Books.vue')
        },
      ],
      meta: { requiresAuth: true },
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: () => import('@/pages/User/SignUp/SignUp.vue')
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: () => import('@/pages/User/SignIn/SignIn.vue'),
    },
  ],
});

// redirect in case of authorization
router.beforeEach((to, _from, next) => {
  // check if the route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const token = localStorage.getItem('token');

    if (token) {
      next();
    } else {
      next({ name: 'signIn' });
    }
  } else {
    // if route does not require authentication, allow access
    next();
  }
});

export default router;
