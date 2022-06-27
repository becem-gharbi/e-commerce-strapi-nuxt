<template>
  <div>
    <a-card hoverable size="small">
      <a-badge
        :count="`${product.price} ${product.currency}`"
        style="position: absolute; top: 6px; left: 5px"
      >
      </a-badge>

      <img
        slot="cover"
        :src="product.image[0]"
        height="150px"
        style="object-fit: cover"
        @click="modalVisible = true"
      />

      <a-card-meta>
        <template slot="title">
          {{ product.name }}
          <a-rate
            v-if="$auth.loggedIn"
            :count="1"
            :value="isFavourite"
            @change="toggleFavourite()"
          />
        </template>
        <template slot="description">
          {{ $dayjs().to($dayjs(product.createdAt))
          }}<a
            v-if="authorVisible"
            @click="handleViewAuthor"
            type="link"
            style="float: right"
            >Author</a
          ></template
        >
      </a-card-meta>

      <template slot="actions" class="ant-card-actions">
        <template v-if="editEnable">
          <a-icon
            key="edit"
            type="edit"
            @click="$router.push(`/product/${product.id}/update`)"
          />
          <a-popconfirm
            title="Are you sure delete this product?"
            ok-text="Yes"
            cancel-text="No"
            @confirm="handleDelete()"
          >
            <a-icon key="delete" type="delete" />
          </a-popconfirm>
        </template>
      </template>
    </a-card>

    <a-modal
      v-model="modalVisible"
      :dialog-style="{ top: '20px' }"
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
    authorVisible: {
      type: Boolean,
      default: true,
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
      try {
        await this.$axios.delete(`/products/${this.product.id}`);
        this.$emit("onDelete");
      } catch (err) {}
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

