<template>
  <div class="page">
    <form @submit.prevent="handleSubmit">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h2 class="page-title">Add Product</h2>
          </div>
          <div class="col-auto ms-auto">
            <button
              class="btn btn-primary"
              :class="{ disabled: isLoading }"
              type="submit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-plus"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line></svg
              >Add
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
              :required="true"
              :errors="errors"
            ></InputBase>
            <InputBase
              label="Price"
              name="price"
              type="number"
              :required="true"
              :errors="errors"
            ></InputBase>
            <InputCategory :required="true"></InputCategory>
            <InputAutosize
              label="Description"
              name="description"
              :required="true"
              :errors="errors"
            ></InputAutosize>
          </div>
          <div class="col-lg-4">
            <label class="form-label">Image</label>
            <InputImage name="image" :required="false"></InputImage>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      errors: [],
      isLoading: false,
    };
  },

  methods: {
    handleSubmit(event) {
      this.isLoading = true;

      const data = {};
      const formData = new FormData();

      for (let el of event.target.elements) {
        if (!["submit", "file"].includes(el.type)) {
          data[el.name] = el.value;
        } else if (el.type === "file") {
          for (let file of el.files) {
            formData.append(`files.${el.name}`, file, file.name);
          }
        }
      }

      data["user"] = this.$auth.user.id;

      formData.append("data", JSON.stringify(data));

      this.$axios
        .post("/products", formData)
        .then(() => this.$router.replace("/product"))
        .catch((err) => {
          this.isLoading = false;
          this.errors = Array.from(err.response.data.error.details.errors);
        });
    },
  },
};
</script>