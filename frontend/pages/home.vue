<template>
  <div class="page">
    <div class="page-header">
      <div class="row align-items-center">
        <div class="col">
          <h2 class="page-title">Home</h2>
        </div>
        <div class="col-auto ms-auto">
          <div class="btn-list">
            <ProductFilter></ProductFilter>
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
          location: !$auth.user.location
            ? {}
            : {
                country: $auth.user.location.country,
                state: $auth.user.location.state,
              },
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