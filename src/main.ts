import Vue from 'vue';
import { createPinia, PiniaVuePlugin } from 'pinia';
import VueSweetalert2 from 'vue-sweetalert2';
import VueI18n from 'vue-i18n';
import { i18n } from '@/i18next';




import 'sweetalert2/dist/sweetalert2.min.css';

import App from '@/App.vue';
import { router } from '@/router';

import './assets/style/main.scss';

Vue.config.productionTip = false;

Vue.use(PiniaVuePlugin);
Vue.use(VueSweetalert2);


new Vue({
  i18n,
  pinia: createPinia(),
  router,
  render: h => h(App),
}).$mount('#app');

