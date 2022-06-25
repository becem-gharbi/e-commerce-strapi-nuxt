<template>
  <a-card title="Latest Products" :bordered="false">
    <a-space slot="extra">
      <a-input-search
        placeholder="input search text"
        style="width: 200px; text-align: left"
        @search="handleSearch"
      />
      <a-button @click="modalVisible = true" type="primary">Filters</a-button>
      <NuxtLink v-if="editEnable" :to="'/product/add'"
        ><a-button type="primary">Add Product</a-button></NuxtLink
      >
    </a-space>

    <EmptyState v-if="products.length === 0"></EmptyState>
    <div v-else>
      <a-row :gutter="[15, 15]">
        <a-col
          :xs="24"
          :sm="12"
          :md="8"
          :lg="4"
          v-for="product of products"
          :key="product.id"
        >
          <Product :product="product" :editEnable="editEnable" />
        </a-col>
      </a-row>
    </div>

    <template slot="actions">
      <a-pagination
        slot="actions"
        show-size-changer
        :total="pagination.total"
        :pageSize.sync="pagination.pageSize"
        v-model="pagination.page"
        @change="$fetch"
        @showSizeChange="$fetch"
    /></template>

    <ProductFilter :visible.sync="modalVisible" :filters.sync="filters" />
  </a-card>
</template>

<script>
import qs from "qs";

export default {
  props: {
    user: {
      default: () => ({}),
    },
    editEnable: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      filters: {
        user: {
          id: this.user,
          location: {
            country: this.$store.state.country,
          },
        },
      },

      pagination: {
        page: 1,
        pageSize: 10,
        total: 1,
      },

      products: [],

      modalVisible: false,
    };
  },

  methods: {
    handleSearch(searchText) {
      this.filters.name = {
        $containsi: searchText,
      };
      this.$fetch();
    },
  },

  watch: {
    filters() {
      this.$fetch();
    },
  },

  async fetch() {
    const query = qs.stringify({
      filters: this.filters,
      pagination: this.pagination,
      populate: {
        image: "*",
        user: {
          populate: "image",
        },
      },
      sort: ["updatedAt:desc"],
    });

    const res = await this.$axios.get("/products?" + query);

    this.products = [];

    res.data.data.forEach((product) => {
      this.products.push({
        id: product.id,
        name: product.attributes.name,
        price: product.attributes.price,
        image: this.$getFilesUrl(product.attributes.image.data),
        createdAt: product.attributes.createdAt,
        currency: product.attributes.currency,
        description: product.attributes.description,
      });
    });

    this.pagination = {
      page: res.data.meta.pagination.page,
      pageSize: res.data.meta.pagination.pageSize,
      total: res.data.meta.pagination.total,
    };
  },
};
</script>