<template>
  <div class="page">
    <form @submit.prevent="handleSubmit">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h2 class="page-title">Add Product</h2>
          </div>
          <div class="col-auto ms-auto">
            <ButtonAsync
              label="Add"
              type="submit"
              class="btn btn-primary"
            ></ButtonAsync>
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
    };
  },

  methods: {
    handleSubmit(event) {

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
          this.errors = Array.from(err.response.data.error.details.errors);
        });
    },
  },
};
</script>