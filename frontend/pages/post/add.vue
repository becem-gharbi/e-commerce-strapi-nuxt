<template>
  <a-row type="flex" justify="center">
    <a-col :xs="24" :sm="24" :md="12" :lg="8">
      <a-form layout="vertical" @submit.prevent="handleSubmit">
        <a-form-item label="Name">
          <a-input v-model="name" />
        </a-form-item>

        <a-form-item :label="'Price [' + $store.state.currency + ']'">
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

        <a-form-item label="Images">
          <ImageUpload ref="imageUpload" :max="5" />
        </a-form-item>

        <a-form-item>
          <ButtonAsync label="Create" htmlType="submit" icon="plus" block />
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
      category: this.$store.state.categories[0].id,
    };
  },

  methods: {
    async handleSubmit() {
      try {
        const data = {
          author: this.$auth.user.id,
          name: this.name,
          price: this.price,
          description: this.description,
          category: this.category,
          currency: this.$store.state.currency,
        };

        const res = await this.$axios.post("/posts", { data });

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