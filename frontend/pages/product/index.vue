<template>
  <div class="page">
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col">
          <h2 class="page-title">My Products</h2>
        </div>
        <div class="col-auto ms-auto">
          <div class="btn-list">
            <NuxtLink class="btn btn-primary" to="/product/add">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-plus"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.25"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <desc>
                  Download more icon variants from
                  https://tabler-icons.io/i/plus
                </desc>
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Product</NuxtLink
            >
          </div>
        </div>
      </div>
    </div>
    <div class="page-body">
      <EmptyState v-if="products.data.length === 0"></EmptyState>
      <div v-else>
        <div class="row g-3">
          <div
            class="col-lg-3 col-sm-6"
            v-for="product of products.data"
            :key="product.id"
          >
            <Product :product="product" :enableEdit="true"></Product>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["products"]),
  },

  watchQuery: ["page"],

  async asyncData({ store, $auth, route }) {
    await store.dispatch("getProducts", {
      filters: {
        user: $auth.user.id,
      },
    });
  },
};
</script>
