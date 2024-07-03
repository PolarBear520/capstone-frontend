<template>
  <div class="navigation">
    
    <div class="nav-bottom">
      <div class="inner-nav-bottom">
        <ul>
          <li>
            <apan class="selected"><a href="">Home</a> </apan>
          </li>
          <li><a href="">Electronics</a></li>
          <li><a href="">Fashion</a></li>
          <li><a href="">Health & Beauty</a></li>
          <li><a href="">Motors</a></li>
          <li><a href="">Collectibles</a></li>
          <li><a href="">Sports</a></li>
          <li><a href="">Home & Garden</a></li>
          <li><a href="">Deals</a></li>
          <li><a href="">Under $10</a></li>
        </ul>
      </div>
    </div>
    <v-divider></v-divider>
  </div>
  <div class="mx-auto px-4 sm:px-8 lg:px-12 py-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100">
        Products
      </h2>
    </div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
    >
      <div v-for="item in productList.products" :key="item">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <a :href="`/product/${item.id}`" target="_blank">
            <img
              :src="`${item.thumbnail}`"
              alt="product"
              class="w-full h-56 object-cover object-center"
            />
          </a>
          <div class="p-4">
            <p class="text-sm font-medium text-gray-600 dark:text-gray-300">
              {{ item.title }}
            </p>
            <div class="mt-4 flex items-center justify-between">
              <div>
                <span
                  class="text-xl font-bold text-gray-400 dark:text-gray-100 line-through mr-2"
                  >$24.99</span
                >
                <span
                  class="text-3xl font-bold text-gray-800 dark:text-gray-100"
                  >$4.99</span
                >
              </div>
              <v-icon
                icon="mdi-heart"
                :color="`${wishList.includes(item.id) ? 'red' : 'grey'}`"
                large
                @click="clickWishlist(item.id)"
              ></v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center mb-6 mt-20">
      <button class="showMoreBtn" @click="clickShowMoreProducts()">
        Show More
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FwbAvatar } from "flowbite-vue";
import AppSearch from "./AppSearch.vue";
const { data: productList } = await useFetch(
  "https://dummyjson.com/products?limit=24&skip=24"
);
console.log(productList);

//TODO: get wishlist from backend
const wishList = reactive([25, 33]);

// add/delete a product to/from wishlist
const clickWishlist = (id) => {
  if (wishList.includes(id)) {
    wishList.splice(wishList.indexOf(id), 1);
    // TODO: delete from backend
  } else {
    wishList.push(id);
    // TODO: add to backend
  }
};
</script>

<style scoped>
.navigations {
  height: 25px;
  margin-top: 5px;
  margin-left: 35px;
  margin-right: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.my-2 > span {
  color: #555555;
}

span {
  padding: 5px;
  font-family: Helvetica, sans-serif;
  /* font-size: 12px; */
  justify-items: center;
}

.navigations a {
  text-decoration: none;
}

.nav-top-left {
  display: flex;
  justify-content: space-evenly;
}

.nav-top-left-opt {
  display: flex;
  justify-content: space-evenly;
}

.daily-deals {
  padding-left: 5px;
}

.my-2 {
  margin-left: 5px;
}



.nav-bottom {
  margin-left: 150px;
  margin-right: 150px;
  display: flex;
  align-items: center;
}

.inner-nav-bottom {
  align-content: space-between;
  color: #555555;
}

.inner-nav-bottom > ul {
  display: flex;
  list-style: none;
}

li {
  padding: 9px 12px;
}

.selected {
  margin-top: 10px;
  border-style: none none solid none;
  border-width: 3px;
}

.not-selected {
  margin-top: 10px;
}

.showMoreBtn {
  background-color: #fff;
  color: #3665f3;
  padding: 10px 20px;
  border-radius: 24px;
  font-size: 24px;
  cursor: pointer;
  border: #3665f3 solid 2px;
}
</style>
