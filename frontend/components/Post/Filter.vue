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

      <a-form-item label="Category">
        <a-select v-model="category">
          <a-select-option
            v-for="category of $store.state.categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.attributes.name }}
          </a-select-option>

          <a-select-option value="">--</a-select-option>
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
          <a-select-option value="">--</a-select-option>
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
      category: "",
      state: "",
      priceRange: 3000,
      marks: {
        0: "0",
        1000: "1000",
        2000: "2000",
        3000: "3000",
      },
    };
  },

  methods: {
    handleOk() {
      const newFilters = this.filters;

      newFilters.name = { $containsi: this.searchText };
      newFilters.category = this.category ? this.category : {};
      newFilters.price = {
        $lt: this.priceRange,
      };
      newFilters.author = {
        ...newFilters.author,
        location: {
          state: this.state ? this.state : {},
        },
      };

      this.$emit("update:filters", {
        ...newFilters,
      });

      this.$emit("update:visible", false);
    },
  },
};
</script>