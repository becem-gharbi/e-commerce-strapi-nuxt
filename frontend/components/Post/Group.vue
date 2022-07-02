<template>
  <a-card :title="title"  size="small">
    <a-space slot="extra">
      <a-button
        v-if="editEnable"
        icon="plus"
        @click="handleAddPost()"
        >Add</a-button
      >
      <a-button icon="filter" @click="modalVisible = true">Filters</a-button>
    </a-space>

    <div v-if="$fetchState.pending" style="text-align: center">
      <a-spin tip="Loading..." size="large" />
    </div>

    <a-empty v-else-if="posts.length === 0" />

    <template v-else>
      <a-row :gutter="[10, 10]">
        <a-col
          :xs="12"
          :sm="8"
          :md="8"
          :lg="4"
          v-for="post of posts"
          :key="post.id"
        >
          <Post :post="post" :editEnable="editEnable" @onDelete="$fetch()" />
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

    <PostFilter :visible.sync="modalVisible" :filters.sync="filters" />
  </a-card>
</template>

<script>
import qs from "qs";

export default {
  props: {
    title: {
      type: String,
    },

    inFilters: {
      default: () => ({}),
    },
    editEnable: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      filters: this.inFilters,

      pagination: {
        page: 1,
        pageSize: 10,
        total: 1,
      },

      posts: [],

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
        likedBy: "*",
        author: {
          populate: "image",
        },
      },
      sort: ["updatedAt:desc"],
    });

    const res = await this.$axios.get("/posts?" + query);

    this.posts = [];

    res.data.data.forEach((post) => {
      this.posts.push({
        id: post.id,
        name: post.attributes.name,
        price: post.attributes.price,
        images: this.$getFilesUrl(post.attributes.images.data),
        createdAt: post.attributes.createdAt,
        currency: post.attributes.currency,
        description: post.attributes.description,
        likedBy: post.attributes.likedBy.data,
      });
    });

    this.pagination = {
      page: res.data.meta.pagination.page,
      pageSize: res.data.meta.pagination.pageSize,
      total: res.data.meta.pagination.total,
    };
  },

  methods: {
    handleAddPost() {
      if (!this.$auth.user.fullname) {
        return this.$message.error("Please complete your account details");
      }
      this.$router.push("/post/add");
    },
  },
};
</script>
