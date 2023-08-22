/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"];
export const theme = {
  extend: {},
};
export const plugins = [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms')];
