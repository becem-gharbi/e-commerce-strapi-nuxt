<template>
  <div class="page">
    <form @submit.prevent="handleSubmit">
      <div class="page-header">
        <div class="row align-items-center">
          <div class="col">
            <h2 class="page-title">My Account</h2>
          </div>
          <div class="col-auto ms-auto">
            <ButtonAsync
              label="Save"
              type="submit"
              class="btn btn-primary"
            ></ButtonAsync>
          </div>
        </div>
      </div>
      <div class="page-body">
        <div class="row g-5 align-items-center justify-content-center">
          <div class="col-lg-5">
            <InputImage name="image" :value="image"></InputImage>
          </div>
          <div class="col-lg-5">
            <InputBase
              label="Name"
              name="fullname"
              :value="$auth.user.fullname"
              :required="true"
            ></InputBase>
            <InputLocation
              :value="$auth.user.location"
              :countryVisible="true"
              :required="true"
            ></InputLocation>
            <InputBase
              label="Facebook account"
              name="facebookLink"
              :value="$auth.user.facebookLink"
            ></InputBase>
            <InputToggle
              label="Theme Dark"
              name="themeDark"
              :value="$auth.user.themeDark"
            ></InputToggle>
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
      image: this.$auth.user.image
        ? process.env.NODE_ENV === "production"
          ? this.$auth.user.image.url
          : `${process.env.STRAPI_URL}${this.$auth.user.image.url}`
        : null,
    };
  },
  methods: {
    async handleSubmit(event) {
      const data = { location: {} };
      const formData = new FormData();

      for (let el of event.target.elements) {
        if (!["submit", "file", "button"].includes(el.type)) {
          if (["country", "state", "currency"].includes(el.name)) {
            data["location"][el.name] = el.value;
            continue;
          }

          if (["themeDark"].includes(el.name)) {
            data[el.name] = el.checked;
            continue;
          }

          data[el.name] = el.value;
        } else if (el.type === "file") {
          for (let file of el.files) {
            formData.append(`files.${el.name}`, file);
          }
        }
      }

      formData.append("data", JSON.stringify(data));

      await this.$axios.put(`/users/me`, formData);
      this.$auth.fetchUser();
    },
  },
};
</script>