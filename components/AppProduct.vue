<template>
  <div class="flex flex-col justify-center items-center">
    <div class="flex items-center justify-center w-4/5 product-card">
      <div class="w-1/2">
        <v-carousel hide-delimiters>
          <v-carousel-item
            v-for="item in product.images"
            :src="`${item}`"
            cover
          ></v-carousel-item>
        </v-carousel>
      </div>
      <div class="flex flex-col justify-start ml-9">
        <h3>{{ product.title }}</h3>
        <h3>C ${{ product.price }}</h3>
        <p>{{ product.description }}</p>
        <div class="flex flex-col justify-start">
          <button class="btn">Buy It Now</button>
          <button class="btn">View in cart</button>
          <button class="btn">
            <v-icon icon="mdi-heart"></v-icon>Add to watchList
          </button>
        </div>
      </div>
    </div>
  <div class="flex flex-col justify-start w-4/5 detail">
    <h3>Details of product</h3>
    <p>{{ product.description }}</p>
  </div>
</div>
</template>

<script setup>
import { FwbCarousel } from "flowbite-vue";
const { data: product } = await useFetch("https://dummyjson.com/products/6");

</script>
<style scoped>
.product-card {
  border: 1px solid #e5e7eb;
  margin-top: 100px;
  margin-bottom: 50px;
  border-radius: 5px;
  padding: 30px;
  /* height: 800px; */
}

.detail{
  margin-bottom: 100px;
  border:2px solid #e5e7eb;
}
</style>
