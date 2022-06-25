<template>
  <a-row type="flex" justify="center">
    <a-col :xs="24" :sm="24" :md="12" :lg="8">
      <a-form layout="vertical" @submit.prevent="handleSubmit">
        <a-form-item label="Image">
          <InputImage v-model="image" />
        </a-form-item>

        <a-form-item label="Name">
          <a-input v-model="fullname" />
        </a-form-item>

        <a-form-item label="Facebook Link">
          <a-input v-model="facebookLink" />
        </a-form-item>

        <a-form-item label="State">
          <a-select :showSearch="true" v-model="location.state">
            <a-select-option
              v-for="state of $store.state.states"
              :key="state"
              :value="state"
            >
              {{ state }}</a-select-option
            >
          </a-select>
        </a-form-item>

        <a-form-item label="Theme">
          <a-space align="center">
            Dark
            <a-switch v-model="themeDark" size="small"> </a-switch>
          </a-space>
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
  data() {
    return {
      fullname: this.$auth.user.fullname,
      location: { ...this.$auth.user.location },
      facebookLink: this.$auth.user.link,
      themeDark: this.$auth.user.themeDark,
      image: this.$auth.user.image
        ? process.env.NODE_ENV === "production"
          ? this.$auth.user.image.url
          : `${process.env.STRAPI_URL}${this.$auth.user.image.url}`
        : null,
    };
  },

  methods: {
    async handleSubmit() {
      const formData = new FormData();

      const data = {
        fullname: this.fullname,
        location: this.location,
        facebookLink: this.facebookLink,
        themeDark: this.themeDark,
      };

      formData.append("data", JSON.stringify(data));

      formData.append("files.image", this.image);

      await this.$axios.put(`/users/me`, formData);

      this.$auth.fetchUser();

      this.$router.replace(`/user/${this.$auth.user.id}`);
    },
  },
};
</script>