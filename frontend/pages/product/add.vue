<template>
  <a-row type="flex" justify="center">
    <a-col :xs="24" :sm="24" :md="12" :lg="8">
      <a-form layout="vertical" @submit.prevent="handleSubmit">
        <a-form-item label="Images">
          <InputImages v-model="image" />
        </a-form-item>

        <a-form-item label="Name">
          <a-input v-model="name" />
        </a-form-item>

        <a-form-item label="Price">
          <a-input v-model="price" />
        </a-form-item>

        <a-form-item label="Description">
          <a-textarea v-model="description" auto-size />
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
          </a-select>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block>Submit</a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script>
export default {
  data: function () {
    return {
      name: "",
      price: "",
      description: "",
      category: 1,
      image: [],
    };
  },

  methods: {
    handleSubmit() {
      const formData = new FormData();

      const data = {
        user: this.$auth.user.id,
        name: this.name,
        price: this.price,
        description: this.description,
        category: this.category,
        currency: this.$store.state.currency,
      };

      formData.append("data", JSON.stringify(data));

      this.image.forEach((el) => formData.append("files.image", el));

      this.$axios
        .post("/products", formData)
        .then(() => this.$router.replace("/dashboard"))
        .catch((err) => {});
    },
  },
};
</script>