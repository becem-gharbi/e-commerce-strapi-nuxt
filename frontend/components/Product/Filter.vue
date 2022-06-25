<template>
  <a-modal
    :visible="visible"
    :dialog-style="{ top: '20px' }"
    title="Filters"
    @cancel="() => $emit('update:visible', false)"
    @ok="handleOk"
  >
    <a-form>
      <a-form-item label="Search">
        <a-input placeholder="input search text" v-model="searchText" />
      </a-form-item>

      <a-form-item v-if="$auth.loggedIn" label="My Favourites">
        <a-checkbox
          :checked="onlyFavourites"
          @change="(e) => (onlyFavourites = e.target.checked)"
          >Only</a-checkbox
        >
      </a-form-item>

      <a-form-item label="Category">
        <a-select v-model="category">
          <a-select-option
            v-for="category of $store.state.categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.attributes.name }}
          </a-select-option>

          <a-select-option :value="{}">--</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="State">
        <a-select :showSearch="true" v-model="state">
          <a-select-option
            v-for="state of $store.state.states"
            :key="state"
            :value="state"
          >
            {{ state }}</a-select-option
          >
          <a-select-option :value="{}">--</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item label="Price Range">
        <a-slider v-model="priceRange" :max="3000" :marks="marks" :step="10" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    filters: Object,
  },

  data() {
    return {
      searchText: "",
      onlyFavourites: false,
      category: {},
      state: {},
      priceRange: 3000,
      marks: {
        0: "0",
        1000: "1000",
        2000: "2000",
        3000: "3000",
      },
    };
  },

  computed: {
    favouriteProducts() {
      let data = [-1];
      for (let el of this.$auth.user.favouriteProducts) {
        data.push(el.id);
      }
      return data;
    },
  },

  methods: {
    handleOk() {
      const newFilters = {
        name: {
          $containsi: this.searchText,
        },

        id: !this.onlyFavourites
          ? {}
          : {
              $in: this.favouriteProducts,
            },

        category: this.category,

        price: {
          $lt: this.priceRange,
        },

        user: {
          id: this.filters.user.id,
          location: {
            state: this.state,
            country: this.filters.user.location.country,
          },
        },
      };

      this.$emit("update:filters", {
        ...this.filters,
        ...newFilters,
      });

      this.$emit("update:visible", false);
    },
  },
};
</script>