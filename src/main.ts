import Vue from 'vue';
import VueSweetalert2 from 'vue-sweetalert2';

import { i18n } from '@/i18next';
import { createdPinia, router } from '@/router';

import 'sweetalert2/dist/sweetalert2.min.css';
import '@/assets/style/main.scss';

import App from '@/App.vue';

Vue.config.productionTip = false;

Vue.use(VueSweetalert2);

new Vue({
  i18n,
  pinia: createdPinia,
  router,
  render: h => h(App),
}).$mount('#app');

