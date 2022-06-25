<template>
  <a-card hoverable>
    <a-form layout="vertical" autocomplete="off" @submit.prevent="handleSubmit">
      <a-form-item label="New Password">
        <a-input-password v-model="password" />
      </a-form-item>

      <a-form-item label="Password Confirmation">
        <a-input-password v-model="passwordConfirmation" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" style="margin: 1rem 0" block
          >Reset Password</a-button
        >
        Doesn't want to reset password?
        <NuxtLink to="/user/login"> Login </NuxtLink>
      </a-form-item>
    </a-form>
  </a-card>
</template>

<script>
export default {
  auth: false,
  layout: "auth",
  data() {
    return {
      password: "",
      passwordConfirmation: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await this.$axios.post("auth/reset-password", {
          code: this.$route.query.code,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation,
        });
        this.$router.replace("/user/login");
        this.$message.success("Password reset successfully");
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