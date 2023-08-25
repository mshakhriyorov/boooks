import { defineStore } from 'pinia';

import type { Locales } from "@/i18next/locales";
import { defaultLocale } from "@/i18next";

export const useLocaleStore = defineStore({
    id: 'locale',
    state: () => ({
        language: defaultLocale
    }),
    getters: {},
    actions: {
        setLocalLanguage(lang: Locales) {
            this.language = lang
        }
    }
});
