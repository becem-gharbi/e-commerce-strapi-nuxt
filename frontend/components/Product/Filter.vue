<template>
  <a-modal
    :visible="visible"
    title="Filters"
    @cancel="() => $emit('update:visible', false)"
    @ok="handleOk"
  >
    <a-form>
      <a-form-item label="Category">
        <a-select v-model="category">
          <a-select-option
            v-for="category of $store.state.categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.attributes.name }}
          </a-select-option>
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
      category: 1,
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
      const newFilters = {
        category: this.category,
        price: {
          $lt: this.priceRange,
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