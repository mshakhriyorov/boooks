import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';
import VueSweetalert2 from 'vue-sweetalert2';

import 'sweetalert2/dist/sweetalert2.min.css';

import App from '@/App.vue';
import router from '@/router';

import './assets/style/main.scss';

Vue.use(PiniaVuePlugin);
Vue.use(VueSweetalert2);

new Vue({
  router,
  pinia: createPinia(),
  render: h => h(App),
}).$mount('#app');
