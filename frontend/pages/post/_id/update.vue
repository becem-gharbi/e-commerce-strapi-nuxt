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
          <ImageUpload ref="imageUpload" :images="images" :max="5" />
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
  async asyncData({ $axios, route }) {
    const query = qs.stringify({
      populate: {
        images: "*",
        category: "*",
      },
    });

    const res = await $axios.get(`/posts/${route.params.id}?` + query);

    return {
      id: res.data.data.id,
      name: res.data.data.attributes.name,
      price: res.data.data.attributes.price,
      description: res.data.data.attributes.description,
      category: res.data.data.attributes.category.data.id,
      images: res.data.data.attributes.images.data,
    };
  },

  methods: {
    async handleSubmit() {
      try {
        const data = {
          name: this.name,
          price: this.price,
          description: this.description,
          category: this.category,
        };

        const res = await this.$axios.put(
          `/posts/${this.$route.params.id}`,
          { data }
        );

        await this.$refs.imageUpload.upload(
          "api::post.post",
          res.data.data.id,
          "images"
        );

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