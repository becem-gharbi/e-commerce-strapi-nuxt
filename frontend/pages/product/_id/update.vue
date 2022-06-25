<template>
  <a-row type="flex" justify="center">
    <a-col :xs="24" :sm="24" :md="12" :lg="8">
      <a-form layout="vertical" @submit.prevent="handleSubmit">
        <a-form-item label="Name">
          <a-input v-model="name" />
        </a-form-item>

        <a-form-item label="Price">
          <a-input v-model="price" type="number" />
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

        <a-form-item label="Image">
          <InputImages v-model="image" />
        </a-form-item>

        <a-form-item>
          <ButtonAsync
            label="Save Changes"
            htmlType="submit"
            icon="save"
            block
          />
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script>
import qs from "qs";

export default {
  async asyncData({ $axios, route, $getFilesUrl }) {
    const query = qs.stringify({
      populate: {
        image: "*",
        category: "*",
      },
    });

    const res = await $axios.get(`/products/${route.params.id}?` + query);

    return {
      name: res.data.data.attributes.name,
      price: res.data.data.attributes.price,
      description: res.data.data.attributes.description,
      category: res.data.data.attributes.category.data.id,
      image: $getFilesUrl(res.data.data.attributes.image.data),
    };
  },

  methods: {
    async handleSubmit() {
      try {
        const formData = new FormData();

        const data = {
          name: this.name,
          price: this.price,
          description: this.description,
          category: this.category,
        };

        formData.append("data", JSON.stringify(data));

        this.image.forEach((el) => formData.append("files.image", el));

        await this.$axios.put(`/products/${this.$route.params.id}`, formData);
        this.$router.replace("/dashboard");
      } catch (err) {
        if (err.response.data.error.details.errors) {
          this.$message.error(
            err.response.data.error.details.errors[0].message
          );
        } else {
          this.$message.error(err.response.data.error.message);
        }
      }
    },
  },
};
</script>