<template>
    <form class="p-4 ring-1 rounded">
        <div class="space-y-12">
            <div class="border-b border-gray-900/10 pb-12">
                <h2 class="text-base text-xl font-semibold leading-7 text-white-900">Add a book</h2>

                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div class="sm:col-span-4">
                        <label for="bookname" class="block text-sm font-medium leading-6 text-white-900">Book
                            name</label>
                        <div class="mt-2">
                            <div
                                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md p-1">
                                <input type="text" name="bookname" id="bookname"
                                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white-900 placeholder:text-white-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Detektivlar" />
                            </div>
                        </div>
                    </div>

                    <div class="sm:col-span-4">
                        <label for="author" class="block text-sm font-medium leading-6 text-white-900">
                            Set author
                        </label>
                        <div class="mt-2">
                            <div
                                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md p-1">
                                <input type="text" name="author" id="author"
                                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white-900 placeholder:text-white-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="Abdulla Qodiriy" />
                            </div>
                        </div>
                    </div>

                    <div class="sm:col-span-4">
                        <label for="year" class="block text-sm font-medium leading-6 text-white-900">
                            When was it published?
                        </label>
                        <div class="mt-2">
                            <div
                                class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md p-1">
                                <input type="number" name="year" id="year"
                                    class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-white-900 placeholder:text-white-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    placeholder="2002" />
                            </div>
                        </div>
                    </div>

                    <div class="sm:col-span-3">
                        <label for="country" class="block text-sm font-medium leading-6 text-white-900">Select a
                            category</label>
                        <div class="mt-2">
                            <select id="country" name="country" autocomplete="country-name"
                                class="block w-full bg-transparent cursor-pointer rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                <option class="bg-gray-800 cursor-pointer">Yangi</option>
                                <option class="bg-gray-800 cursor-pointer">Sara kitoblar</option>
                                <option class="bg-gray-800 cursor-pointer">Detektiv</option>
                                <option class="bg-gray-800 cursor-pointer">Cannot find? Create instantly</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-span-full">
                        <label for="about" class="block text-sm font-medium leading-6 text-white-900">Description</label>
                        <div class="mt-2">
                            <textarea id="about" name="about" rows="3"
                                class="block w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-white-400 focus:ring-2 bg-transparent focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Write a few sentences about the category." />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-6 flex items-center justify-end gap-x-6">
            <button type="button"
                class="rounded-md bg-red-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-800">Cancel</button>
            <button type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
        </div>
    </form>
</template>
  
<script setup lang="ts">
</script>