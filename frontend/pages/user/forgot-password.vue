<template>
  <a-card hoverable>
    <a-form layout="vertical" autocomplete="off" @submit.prevent="handleSubmit">
      <a-form-item label="Email">
        <a-input v-model="email" type="email" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" style="margin: 1rem 0" block
          >Reset Password</a-button
        >
        Password remembered?
        <NuxtLink to="/user/login"> login </NuxtLink>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
export default {
  auth: "guest",
  layout: "auth",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await this.$axios({
          url: "auth/forgot-password",
          method: "post",
          data: {
            email: this.email,
          },
        });
        this.$router.replace("/user/login");
        this.$message.success("Reset password mail sent, Please check inbox");
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