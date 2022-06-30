<template>
  <a-card title="Latest Products" :bordered="false" size="small">
    <a-space slot="extra">
      <a-button icon="filter" @click="modalVisible = true">Filters</a-button>
      <a-button v-if="editEnable" icon="plus" @click="handleAddProduct()"
        >Add</a-button
      >
    </a-space>

    <a-empty v-if="products.length === 0" />

    <template v-else>
      <a-row :gutter="[15, 15]">
        <a-col
          :xs="12"
          :sm="8"
          :md="8"
          :lg="5"
          v-for="product of products"
          :key="product.id"
        >
          <Product
            :product="product"
            :editEnable="editEnable"
            @onDelete="$fetch()"
          />
        </a-col>
      </a-row>

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
    </template>

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
        images: "*",
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
        images: this.$getFilesUrl(product.attributes.images.data),
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

  methods: {
    handleAddProduct() {
      if (!this.$auth.user.fullname) {
        return this.$message.error("Please complete your account details");
      }
      this.$router.push("/product/add");
    },
  },
};
</script>