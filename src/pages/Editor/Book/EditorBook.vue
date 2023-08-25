<template>
  <form class="p-4 ring-1 rounded" @submit.prevent="handleSubmit">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base text-xl font-semibold leading-7 text-white-900">
          {{ title }}
        </h2>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label for="bookname" class="block text-sm font-medium leading-6 text-white-900">
              {{ $t("EditorBook.bookName") }}</label>
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md p-1">
                <input v-model="bookData.name" type="text" name="bookname" id="bookname"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white-400 placeholder:text-white-900 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Tinchlik" required />
              </div>
            </div>
          </div>

          <div class="sm:col-span-4">
            <label for="author" class="block text-sm font-medium leading-6 text-white-900">
              {{ $t("EditorBook.setAuthor") }}
            </label>
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md p-1">
                <input v-model="bookData.author" type="text" name="author" id="author"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white-900 placeholder:text-white-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Abdulla Qodiriy" required />
              </div>
            </div>
          </div>

          <div class="sm:col-span-4">
            <label for="year" class="block text-sm font-medium leading-6 text-white-900">
              {{ $t("EditorBook.published") }}
            </label>
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md p-1">
                <input v-model="bookData.year" type="number" name="year" id="year"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white-900 placeholder:text-white-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="2002" required />
              </div>
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="categoryId" class="block text-sm font-medium leading-6 text-white-900">
              {{ $t("EditorBook.selectCategory") }}</label>
            <div class="mt-2">
              <select v-model="bookData.categoryId" id="categoryId" name="categoryId" autocomplete="category-id"
                class="block w-full bg-transparent cursor-pointer rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                <option v-for="(cat, _index) in categoryStore.categories" :key="cat.id" :value="cat.id.toString()"
                  class="bg-gray-800 cursor-pointer">
                  {{ cat.name }}
                </option>
              </select>
            </div>
          </div>

          <div class="col-span-full">
            <label for="cover-photo" class="block text-sm font-medium leading-6 text-white-900">
              {{ $t("EditorBook.coverPhoto") }}</label>
            <div
              class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 rounded-md">
              <div class="text-center flex flex-col items-center">
                <div class="mt-4 flex items-center text-sm leading-6 text-gray-600">
                  <label for="file-upload"
                    class="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 p-1">
                    <span>{{ $t("EditorBook.uploadFile") }}</span>
                    <input @change="handleImageUpload" id="file-upload" name="file-upload" type="file" class="sr-only"
                      accept="image/*" />
                  </label>
                  <p class="pl-1">{{ $t("EditorBook.orPaste") }}</p>
                </div>
                <p class="text-xs leading-5 text-gray-600">
                  {{ $t("EditorBook.fileFormat") }}
                </p>
                <span v-if="bookStore.coverImage" class="p-1 rounded-md text-indigo-600 bg-gray-800">{{
                  bookStore.coverImage?.name }}</span>
              </div>
            </div>
          </div>

          <div class="col-span-full">
            <label for="about" class="block text-sm font-medium leading-6 text-white-900">
              {{ $t("EditorBook.description") }}</label>
            <div class="mt-2">
              <textarea v-model="bookData.description" id="about" name="about" rows="3"
                class="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 bg-transparent focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Write a few sentences about the category." required />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button @click.prevent="handleCancel" type="button"
        class="rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800">
        {{ $t("EditorBook.cancel") }}
      </button>
      <button type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        {{ $t("EditorBook.save") }}
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue, { defineComponent, reactive } from 'vue';
import { translate } from '@/i18next'

import { handleRoute } from '@/utils/handleRoute';

import { useBookStore } from '@/stores/books';
import { useCategoryStore } from '@/stores/category';
import { router } from '@/router';

const INITIAL_EDITOR_DATA = {
  name: '',
  description: '',
  author: '',
  categoryId: 1,
  year: null,
};

export default defineComponent({
  name: 'EditorBook',
  setup() {
    const bookStore = useBookStore();
    const categoryStore = useCategoryStore();
    const bookEditData = reactive({
      name: bookStore.book.name,
      description: bookStore.book.description,
      author: bookStore.book.author,
      year: bookStore.book.year,
      categoryId: bookStore.book.categoryId,
    });
    const bookCreateData = reactive(INITIAL_EDITOR_DATA);

    const isCreating = () => {
      if (router.currentRoute.params.type === 'create') {
        return true;
      } else {
        return false;
      }
    };
    const bookData = isCreating() ? bookCreateData : bookEditData;

    const handleCancel = () => {
      handleRoute('/');
      bookData.name = '';
      bookData.description = '';
      bookData.author = '';
      bookData.categoryId = 1;
      bookData.year = null;
    };

    const onSuccess = async (response: any) => {
      if (response.status === 200) {
        if (isCreating()) {
          Vue.swal(`${translate("swal.successCreate")}`);
        } else {
          Vue.swal(`${translate("swal.successEdit")}`);
        }
        categoryStore.fetchAllCategories();
        handleCancel();
      }

      if (bookStore.coverImage) {
        await bookStore.uploadCoverImageAPI(
          response.data.id,
          bookStore.coverImage,
        );
      }
    };

    const handleSubmit = async () => {
      if (isCreating()) {
        const response = await bookStore.createBook(bookData);
        onSuccess(response);
      } else {
        if (categoryStore.category) {
          const response = await bookStore.updateBook({
            bookId: bookStore.book.id,
            bookData,
          });
          onSuccess(response);
        }
      }
    };

    return {
      bookData,
      categoryStore,
      bookEditData,
      bookStore,
      handleCancel,
      handleSubmit,
    };
  },
  data() {
    return {
      title: this.$t("EditorBook.addBook"),
    };
  },
  methods: {
    handleImageUpload(event: Event) {
      const fileInput = event.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        this.bookStore.setCoverImage(file);
      }
    },
  },
  watch: {
    $route(to, _from) {
      if (to.params.type === 'create') {
        this.title = this.$t("EditorBook.addBook");
      } else {
        this.title = this.$t("EditorBook.editBook");
      }

      this.bookEditData.name = '';
      this.bookEditData.description = '';
      this.bookEditData.author = '';
      this.bookEditData.year = null;
      this.bookEditData.categoryId = 1;
    },
    'router.currentRoute.query.id': {
      handler() {
        this.bookStore.fetchBook(router.currentRoute.query.id?.toString());
      },
      immediate: true,
    },
    'bookStore.book': {
      handler() {
        this.bookEditData.name = this.bookStore.book.name;
        this.bookEditData.description = this.bookStore.book.description;
        this.bookEditData.author = this.bookStore.book.author;
        this.bookEditData.year = this.bookStore.book.year;
        this.bookEditData.categoryId = this.bookStore.book.categoryId;
      },
      immediate: true,
    },
  },
  mounted() {
    this.bookStore.fetchBook(router.currentRoute.query.id?.toString());
  },
});
</script>
