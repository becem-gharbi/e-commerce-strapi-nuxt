<template>
  <div class="mb-3">
    <label class="form-label" :class="{ required: required }">Category</label>

    <select
      name="category"
      :required="required"
      v-model="value.id"
      type="text"
      class="form-select"
    >
      <option
        v-for="category of categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.attributes.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => ({
        id: 1,
      }),
    },
    required: {
      type: Boolean,
      default: false,
    },
  },

  data: function () {
    return {
      categories: [],
    };
  },

  async fetch() {
    const res = await this.$axios.get("/categories");
    this.categories = res.data.data;
  },
};
</script>

