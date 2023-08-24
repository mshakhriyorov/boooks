import Vue from 'vue';
import VueRouter from 'vue-router';

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
          name: 'category-editor',
          component: EditorCategory,
        },
        {
          path: 'book/editor/:type',
          name: 'book-editor',
          component: EditorBook,
        },
        {
          path: 'book/:id',
          name: 'book-details',
          component: () => import('@/pages/Books/Modal/BookModal.vue'),
        },
        {
          path: 'category/:id',
          name: 'books-in-category',
          props: true,
          component: () => import('@/pages/Books/Books.vue'),
        },
        {
          path: 'saved',
          name: 'saved-books',
          props: true,
          component: () => import('@/pages/Books/Saved/SavedBooks.vue'),
        },
        {
          path: 'searched',
          name: 'searched-books',
          props: true,
          component: () => import('@/pages/Books/Search/SearchBooks.vue'),
        },
        {
          path: '',
          props: true,
          name: 'books-with-categories',
          component: () =>
            import('@/pages/Books/Categories/BooksCategories.vue'),
        },
      ],
      meta: { requiresAuth: true },
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: () => import('@/pages/User/SignUp/SignUp.vue'),
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
