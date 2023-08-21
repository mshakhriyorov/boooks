import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeView from '@/components/HomeView.vue';

Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/book/:id',
      name: 'book',
      component: HomeView,
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

export default router;
