<template>
  <div>
    <div class="nav-middle">
      <img class="logo" src="/images/logo.png" alt="Logo" />
      <div class="search_input">
        <v-icon>mdi-magnify</v-icon>
        <input type="text" v-model="searchQuery" placeholder="Search for anything" />
      </div>
      <div class="my-2">
        <button class="btn-clr" @click="performSearch">Search</button>
      </div>
    </div>
    <v-divider></v-divider>

    <div v-if="searchResults.length">
      <h2>Search Results:</h2>
      <div v-for="product in searchResults" :key="product.productId" class="product-card" @click="goToProductPage(product.productId)">
        <p>Product Name: {{ product.productName }}</p>
        <p>Description: {{ product.description }}</p>
        <p>Price: {{ product.price }}</p>
        <p>Status: {{ product.productStatus }}</p>
        <p>Upload Date: {{ product.uploadDate }}</p>
        <p>Seller ID: {{ product.sellerId }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      searchQuery: '',
      searchResults: []
    };
  },
  methods: {
    async performSearch() {
      const query = this.searchQuery || '1';  // 如果没有输入关键字，默认使用数字 "1"
      try {
        const response = await axios.get(`http://localhost:8081/api/products/search?name=${query}`);
        console.log('Search results:', response.data);
        this.searchResults = response.data;  // 将搜索结果存储到 searchResults 数据属性中
      } catch (error) {
        console.error('Error searching products:', error);
      }
    },
    goToProductPage(productId) {
      this.$router.push(`/product/${productId}`);
    }
  }
};
</script>

<style scoped>
.nav-middle {
  height: 90px;
  margin-top: 5px;
  margin-left: 35px;
  margin-right: 35px;
  display: flex;
  align-items: center;
}

input {
  border-radius: 2px;
}

.search_input {
  display: flex;
  flex: 1;
  align-items: center;
  padding: 10px;
  margin-left: 10px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.726);
  height: 45px;
  border-width: 2px;
}

.search_input > input {
  display: flex;
  flex: 10;
  outline-width: 0;
  background-color: transparent;
  font-family: Helvetica, sans-serif;
}

.search_input > input:focus::placeholder {
  color: transparent;
}

.btn-clr {
  height: 45px;
  width: 168px;
  background-color: #3665f3;
  color: white;
}

.logo {
  height: 50px;
  width: 50px;
}

.product-card {
  border: 1px solid #e5e7eb;
  border-radius: 5px;
  padding: 20px;
  margin: 10px 0;
  cursor: pointer;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: scale(1.05);
}
</style>
