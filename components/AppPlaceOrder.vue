<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
let cartList = reactive({ products: [] });
cartList = await fetchCartList();

// TODO get cart items from backend
async function fetchCartList() {
  try {
    const response = await useFetch(
      "https://dummyjson.com/products?limit=3&skip=3"
    );
    const cartListConst = response.data;

    if (
      cartListConst &&
      cartListConst.value.products &&
      Array.isArray(cartListConst.value.products)
    ) {
      return {
        products: cartListConst.value.products.map((product) => ({
          ...product,
        })),
      };
    } else {
      console.error("Products is undefined or not an array");
      return { products: [] };
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [] };
  }
}

// TODO: submit order to backend
const clickPayOrder = () => {
  // submit order to backend
  // redirect to order page
  router.push("/myOrder");
};

const clickCancelOrder = () => {
  // modify order status
  // router.push("/");
};
</script>

<template>
  <div class="flex justify-center">
    <div class="flex flex-col w-4/5">
      <h3>My Cart</h3>
      <div>
        <div>
          <div class="checkboxGroup" v-for="item in cartList.products">
            <div class="w-3/4 flex justify-items-start items-center">
              <a :href="`/product/${item.id}`">
                <img :src="`${item.thumbnail}`" class="w-64 mr-4 ml-8 px-4" />
              </a>
              <div class="w-1/2">
                <h3>{{ item.title }}</h3>
              </div>
            </div>
            <div class="flex flex-col items-end">
              <h3>Qty 1</h3>
              <h3>C $ {{ item.price }}</h3>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-end mb-6 mt-20 border-t-2">
        <h3 class="mr-10">Order Total: CAD$ 500</h3>
        <div class="">
          <button class="btn" @click="clickPayOrder()">Pay order</button>
          <button class="btn" @click="clickCancelOrder()">Cancel order</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkboxGroup {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid #e5e7eb;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 20px;
}

.checkboxGroup:hover {
  background-color: #f3f4f6;
}

.selectAll {
  border: none;
  padding: 20px;
}
</style>
