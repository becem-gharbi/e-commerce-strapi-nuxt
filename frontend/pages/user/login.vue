<template>
  <a-card hoverable>
    <a-form layout="vertical" autocomplete="off" @submit.prevent="handleSubmit">
      <a-form-item label="Email">
        <a-input v-model="identifier" type="email" />
      </a-form-item>

      <a-form-item label="Password">
        <a-input-password v-model="password" />
      </a-form-item>

      <a-form-item>
        <a-checkbox v-model="remember">Remember me</a-checkbox>
        <NuxtLink style="float: right" to="/user/forgot-password">
          Forgot password?
        </NuxtLink>
        <a-button type="primary" html-type="submit" style="margin: 1rem 0" block
          >Login</a-button
        >
        Don't have account?
        <NuxtLink to="/user/register"> Register </NuxtLink>
      </a-form-item>
      <a-divider>Or</a-divider>
      <a-button html-type="button" type="danger" block
        >Login with Google</a-button
      >
    </a-form>
  </a-card>
</template>

<script>
export default {
  auth: false,
  layout: "auth",

  data: function () {
    return {
      googleLoginUrl: `${process.env.STRAPI_URL}/api/connect/google`,
      identifier: "",
      password: "",
      remember: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        await this.$auth.loginWith("local", {
          data: {
            identifier: this.identifier,
            password: this.password,
          },
        });
        this.$router.replace("/");
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