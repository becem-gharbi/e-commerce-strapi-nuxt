<template>
  <div>
    <a-card hoverable size="small">
      <a-rate
        v-if="$auth.loggedIn"
        :count="1"
        style="position: absolute; top: 0; left: 5px"
        :value="isFavourite"
        disabled
      />

      <a-badge
        :count="`${product.price} ${product.currency}`"
        style="position: absolute; top: 6px; right: 5px"
        :number-style="{
          backgroundColor: '#fff',
          color: '#000',
          boxShadow: '0 0 0 1px #d9d9d9 inset',
        }"
      >
      </a-badge>

      <img
        slot="cover"
        :src="product.image[0]"
        height="150px"
        style="object-fit: contain"
      />

      <a-card-meta
        :title="product.name"
        :description="$dayjs().to($dayjs(product.createdAt))"
      >
      </a-card-meta>

      <template slot="actions" class="ant-card-actions">
        <template v-if="editEnable">
          <a-icon
            key="edit"
            type="edit"
            @click="$router.push(`/product/${product.id}/update`)"
          />
          <a-icon key="delete" type="delete" @click="handleDelete()" />
        </template>

        <template v-else>
          <a-icon
            v-if="$auth.loggedIn"
            key="add"
            type="plus"
            @click="toggleFavourite"
          />
          <a-icon key="user" type="user" @click="handleViewAuthor" />
        </template>

        <a-icon key="more" type="more" @click="modalVisible = true"></a-icon>
      </template>
    </a-card>

    <a-modal
      v-model="modalVisible"
      :title="product.name"
      okText="View Author"
      :footer="null"
    >
      <Carousel :images="product.image" />

      <br />
      <h4>Description</h4>
      <p>{{ product.description }}</p>
    </a-modal>
  </div>
</template>

<script>
import Carousel from "../Carousel.vue";
import qs from "qs";
export default {
  components: { Carousel },

  name: "Product",

  props: {
    product: {
      type: Object,
      required: true,
    },
    editEnable: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    isFavourite() {
      return (
        this.$auth.user.favouriteProducts?.some(
          (el) => el.id === this.product.id
        ) * 1
      );
    },
  },

  data() {
    return {
      modalVisible: false,
    };
  },

  methods: {
    async toggleFavourite() {
      const formData = new FormData();
      let data = [];

      if (this.isFavourite) {
        for (let el of this.$auth.user.favouriteProducts) {
          if (el.id !== this.product.id) {
            data.push(el.id);
          }
        }
      } else {
        for (let el of this.$auth.user.favouriteProducts) {
          data.push(el.id);
        }
        data.push(this.product.id);
      }

      formData.append("data", JSON.stringify({ favouriteProducts: data }));

      await this.$axios.put(`/users/me`, formData);

      await this.$auth.fetchUser();

      this.modalVisible = false;
    },

    async handleDelete() {
      this.$confirm({
        title: "Are you sure delete this product?",
        content: "Be carefull",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        async onOk() {
          this.$store.dispatch("deleteProduct", this.product.id);
        },
      });
    },

    async handleViewAuthor() {
      const query = qs.stringify({
        filters: {
          products: {
            id: this.product.id,
          },
        },
      });
      const res = await this.$axios.get("/users?" + query);

      const userId = res.data[0].id;

      this.$router.push("user/" + userId);
    },
  },
};
</script>

