<template>
  <div class="page">
    <form @submit.prevent="handleSubmit">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h2 class="page-title">Add Product</h2>
          </div>
          <div class="col-auto ms-auto">
            <button class="btn btn-primary" type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-device-floppy"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <desc>
                  Download more icon variants from
                  https://tabler-icons.io/i/device-floppy
                </desc>
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"
                ></path>
                <circle cx="12" cy="14" r="2"></circle>
                <polyline points="14 4 14 8 8 8 8 4"></polyline></svg
              >Save Changes
            </button>
          </div>
        </div>
      </div>
      <div class="page-body">
        <div class="row g-4 justify-content-center">
          <div class="col-lg-4">
            <InputBase
              label="Name"
              name="name"
              :value="product.name"
              :required="true"
              :errors="errors"
            ></InputBase>
            <InputBase
              label="Price"
              name="price"
              type="number"
              :value="product.price"
              :required="true"
              :errors="errors"
            ></InputBase>
            <InputCategory
              :value="product.category"
              :required="true"
            ></InputCategory>
            <InputAutosize
              label="Description"
              name="description"
              :value="product.description"
              :required="true"
              :errors="errors"
            ></InputAutosize>
          </div>
          <div class="col-lg-4">
            <label class="form-label">Image</label>
            <InputImage name="image" :value="product.image"></InputImage>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: function () {
    return {
      errors: [],
    };
  },

  computed: {
    ...mapGetters(["product"]),
  },

  async asyncData({ store, route }) {
    await store.dispatch("getProduct", route.params.id);
  },

  methods: {
    async handleSubmit(event) {
      const data = {};
      const formData = new FormData();

      for (let el of event.target.elements) {
        if (!["submit", "file", "button"].includes(el.type)) {
          data[el.name] = el.value;
        } else if (el.type === "file") {
          for (let file of el.files) {
            formData.append(`files.${el.name}`, file);
          }
        }
      }

      formData.append("data", JSON.stringify(data));

      await this.$axios
        .put(`/products/${this.product.id}`, formData)
        .then(() => this.$router.replace("/product"))
        .catch((err) => {
          this.errors = Array.from(err.response.data.error.details.errors);
          this.errors.forEach((error) => {
            this.errors[error.path] = error.message;
          });
        });
    },
  },
};
</script>

