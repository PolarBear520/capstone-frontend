<template>
  <div>
    <div class="navigations">
      <div class="nav-top-left">
        <span>Hi <a href="">Sign in </a> or <a href="">register</a> </span>
      </div>

      <div class="nav-top-right flex">
        <span>Sell</span>
        <span>|</span>

        <v-menu open-on-hover>
          <template v-slot:activator="{ props }">
            <span v-bind="props"
              >My eBay
              <v-icon icon="mdi-chevron-down"></v-icon>
            </span>
          </template>

          <v-list>
            <v-list-item>
              <v-list-item-title>
                <a href="">My Account</a>
              </v-list-item-title>
              <v-list-item-title>
                <a href="">Watch List</a>
              </v-list-item-title>
              <v-list-item-title>
                <a href="">My Order</a>
              </v-list-item-title>
              <v-list-item-title>
                <a href="">Message</a>
              </v-list-item-title>
              <v-list-item-title>
                <a href="">Logout</a>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div class="badgeContainer cursor-pointer">
          <v-badge color="red" right @click="clickGoToCarts()">
            <template v-slot:badge>
              <span>{{ state.cartCount }}</span>
            </template>
            <v-icon icon="mdi-cart-outline" large> </v-icon>
          </v-badge>
        </div>
      </div>
    </div>
    <v-divider :thickness="5"></v-divider>
  </div>
</template>

<script setup>
import { inject } from "vue";
const state = inject("state");

const clickGoToCarts = () => {
  // open cart page
  window.open("/carts", "_blank");
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: #555555;
}

.navigations {
  height: 60px;
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
  color: blue;
  text-decoration: underline;
}

.nav-top-left,
.nav-top-right {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

.nav-top-right {
  flex-wrap: wrap;
  /* Allows items to wrap in smaller screens */
}

.nav-top-left-opt {
  display: flex;
  justify-content: space-evenly;
}

.daily-deals {
  padding-left: 5px;
}

.nav-middle {
  height: 73px;
  margin-top: 5px;
  margin-left: 35px;
  margin-right: 35px;
  display: flex;
  align-items: center;
}

.shop {
  padding: 5px;
  display: flex;
  justify-items: center;
}

.shop span {
  display: grid;
  padding: 0;
  font-size: small;
  color: #555555;
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

.inner_search_input {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-left: 10px;
  border-style: solid;
  border-right: none;
  border-color: rgba(0, 0, 0, 0.726);
  height: 45px;
  border-width: 1px;
}

.inner_search_input > span {
  color: #555555;
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

.my-2 {
  margin-left: 5px;
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

.badge {
  background-color: red;
  color: white;
  border-radius: 12px;
  font-size: 12px;
}

.badgeContainer {
  margin-left: 10px;
}

.cartLink {
  text-decoration: none;
}
</style>
