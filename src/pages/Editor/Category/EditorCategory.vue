<template>
  <form class="p-4 ring-1 rounded" @submit.prevent="handleSubmit">
    <div class="space-y-12">
      <div class="border-b border-gray-900/10 pb-12">
        <h2 class="text-base text-xl font-semibold leading-7 text-white-900">
          {{ title }} a category
        </h2>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-4">
            <label for="username" class="block text-sm font-medium leading-6 text-white-900">Category name</label>
            <div class="mt-2">
              <div
                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md p-1">
                <input v-model="categoryData.name" type="text" name="username" id="username" autocomplete="username"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white-900 placeholder:text-white-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Detektivlar" required />
              </div>
            </div>
          </div>

          <div class="col-span-full">
            <label for="about" class="block text-sm font-medium leading-6 text-white-900">Description</label>
            <div class="mt-2">
              <textarea v-model="categoryData.description" id="about" name="about" rows="3"
                class="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 bg-transparent focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Write a few sentences about the category." />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button @click.prevent="handleCancel" type="button"
        class="rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800">
        Cancel
      </button>
      <button type="submit"
        class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        Save
      </button>
    </div>
  </form>
</template>

<script lang="ts">
import Vue, { computed, defineComponent, reactive, ref, watch } from 'vue';

import { handleRoute } from '@/utils/handleRoute';

import { useCategoryStore } from '@/stores/category';
import { router } from '@/router';

const INITIAL_EDITOR_DATA = {
  name: '',
  description: '',
};

export default defineComponent({
  name: 'EditorCategory',
  setup() {
    const categoryStore = useCategoryStore();
    const categoryEditData = reactive({ name: categoryStore.category.name, description: categoryStore.category.description })
    const categoryCreateData = reactive(INITIAL_EDITOR_DATA);

    const isCreating = () => {
      if (router.currentRoute.params.type === 'create') {
        return true
      } else {
        return false
      }
    };
    const title = computed(() => {
      if (isCreating()) {
        return 'Create';
      } else {
        return 'Edit'
      }
    })
    const categoryData = isCreating() ? categoryCreateData : categoryEditData
    console.log(categoryEditData);


    const handleCancel = () => {
      handleRoute('/');
      categoryData.name = '';
      categoryData.description = ''
    }

    const onSuccess = (response: any) => {
      if (response.status === 200) {
        if (isCreating()) {
          Vue.swal('Muvaffaqiyatli yaratildi!')
        } else {
          Vue.swal('Muvaffaqiyatli tahrirlandi!');
        }
        categoryStore.fetchAllCategories();
        handleCancel();
      }
    }

    const handleSubmit = async () => {
      if (isCreating()) {
        const response = await categoryStore.createCategory(categoryData);
        onSuccess(response);
      } else {
        if (categoryStore.category) {
          const response = await categoryStore.updateCategory({ categoryId: categoryStore.category.id, categoryData: categoryData });
          onSuccess(response);
        }
      }

    };

    return { categoryStore, title, categoryEditData, categoryCreateData, handleSubmit, handleCancel, categoryData };
  },
  watch: {
    'router.currentRoute.query.id': {
      handler() {
        this.categoryStore.fetchCategory(router.currentRoute.query.id?.toString());
      },
      immediate: true
    },
    'categoryStore.category': {
      handler() {
        this.categoryEditData.name = this.categoryStore.category.name;
        this.categoryEditData.description = this.categoryStore.category.description;
      },
      immediate: true
    },
  },
  mounted() {
    this.categoryStore.fetchCategory(router.currentRoute.query.id?.toString());
  },

});
</script>
