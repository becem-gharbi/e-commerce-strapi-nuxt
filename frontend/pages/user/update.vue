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
export default {
  data() {
    return {
      fullname: this.$auth.user.fullname,
      location: { ...this.$auth.user.location },
      facebookLink: this.$auth.user.facebookLink,
      image: this.$auth.user.image
        ? process.env.NODE_ENV === "production"
          ? this.$auth.user.image.url + `?rand=${Math.random()}`
          : `${process.env.STRAPI_URL}${this.$auth.user.image.url}` +
            `?rand=${Math.random()}`
        : require("@/assets/no_profile.png"),
    };
  },

  methods: {
    async handleSubmit() {
      try {
        const formData = new FormData();

        this.location.country = this.$store.state.country;

        const data = {
          fullname: this.fullname,
          location: this.location,
          facebookLink: this.facebookLink,
        };

        formData.append("data", JSON.stringify(data));

        formData.append("files.image", this.image);

        await this.$axios.put(`/users/me`, formData);

        await this.$auth.fetchUser();

        this.$router.replace(`/dashboard`);
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