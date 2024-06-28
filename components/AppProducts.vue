<template>
    <div class="max-w-md sm:max-w-xl lg:max-w-6xl mx-auto px-8 lg:px-12 py-8">
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">Products</h2>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            <NuxtLink v-for="item in data.products" :key="item" :to="`/product/${item.id}`">
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img :src="`${item.thumbnail}`" alt="product" class="w-full h-56 object-cover object-center">
                    <div class="p-4">
                        <p class="text-sm font-medium text-gray-600 dark:text-gray-300">{{ item.title }}</p>
                        <div class="mt-4 flex items-center justify-between">
                            <div>
                                <span
                                    class="text-xl font-bold text-gray-400 dark:text-gray-100 line-through  mr-2">$24.99</span>
                                <span class="text-3xl font-bold  text-gray-800 dark:text-gray-100">$4.99</span>
                            </div>
                            <button class="px-3 py-1 bg-indigo-600 text-white text-xs font-medium rounded">Add to
                                cart</button>
                        </div>
                    </div>
                </div>
            </NuxtLink>
        </div>

        <div class="flex items-center justify-between mb-6">
            <button href="#" class="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:underline">View
                More</button>
        </div>
    </div>

</template>

<script setup>

const { data: data } = await useFetch('https://dummyjson.com/products?limit=16&skip=16')
console.log(data)

</script>