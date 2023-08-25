import VueI18n from 'vue-i18n';
import Vue from "vue";

import { Locales } from "./locales";

import uz from "./uz.json";
import ru from "./ru.json";

Vue.use(VueI18n);

export const messages = {
  [Locales.UZ]: uz,
  [Locales.RU]: ru
};

export const defaultLocale = Locales.RU;

const i18n = new VueI18n({
  messages,
  locale: defaultLocale,
  fallbackLocale: defaultLocale
});

const translate = (key: string) => {
  if (!key) {
    return '';
  }
  return i18n.t(key);
};

export { i18n, translate };