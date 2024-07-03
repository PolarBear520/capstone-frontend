<template>
  <div class="nav-middle">
    <img class="logo" src="/images/logo.png" alt="" />
    <div class="search_input">
      <v-icon>mdi-magnify</v-icon>
      <input type="text" placeholder="Search for anything" />
      <v-spacer></v-spacer>
      <div class="inner_search_input">
        <span>All Categories</span>
        <v-spacer></v-spacer>
        <v-icon>mdi-chevron-down</v-icon>
      </div>
    </div>
    <div class="my-2">
      <button class="btn-clr">Search</button>
    </div>
  </div>
  <v-divider></v-divider>
</template>
<style scoped>
.nav-middle {
  height: 90px;
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
</style>
