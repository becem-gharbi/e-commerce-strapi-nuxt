<template>
  <div class="page">
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col">
          <h2 class="page-title">Home</h2>
        </div>
        <div class="col-auto ms-auto">
          <div class="btn-list">
            <a
              href="#"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#product-filter-id"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-filter"
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
                  https://tabler-icons.io/i/filter
                </desc>
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M5.5 5h13a1 1 0 0 1 .5 1.5l-5 5.5l0 7l-4 -3l0 -4l-5 -5.5a1 1 0 0 1 .5 -1.5"
                ></path>
              </svg>
              Filter
            </a>
            <ProductFilter modalId="product-filter-id"></ProductFilter>
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
            <Product :product="product"></Product>
          </div>
        </div>
        <Pagination class="my-4" :pagination="products.pagination"></Pagination>
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
        user: {
          location: $auth.user.location,
        },
      },
      pagination: {
        page: route.query.page ? route.query.page : 1,
        pageSize: 20,
      },
    });
  },
};
</script>