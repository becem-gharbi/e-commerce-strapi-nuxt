<template>
  <a-card hoverable>
    <a-form layout="vertical" autocomplete="off" @submit.prevent="handleSubmit">
      <a-form-item label="Email">
        <a-input v-model="email" type="email" />
      </a-form-item>

      <a-form-item label="Password">
        <a-input-password v-model="password" />
      </a-form-item>

      <a-form-item label="Password Confirmation">
        <a-input-password v-model="passwordConfirmation" />
      </a-form-item>

      <a-form-item>
        <a-checkbox v-model="termsAccepted"
          >Accept
          <NuxtLink to="/policy" target="_blank">
            terms and conditions</NuxtLink
          ></a-checkbox
        >

        <ButtonAsync
          label="Register"
          htmlType="submit"
          block
          style="margin: 1rem 0"
        />

        Already have account?
        <NuxtLink to="/user/login"> login </NuxtLink>
      </a-form-item>
      <a-divider>Or</a-divider>
      <a :href="`${$config.strapiUrl}/api/connect/google`"
        ><a-button html-type="button" type="danger" block
          >Register with Google</a-button
        ></a
      >
    </a-form>
  </a-card>
</template>

<script>
export default {
  auth: "guest",
  layout: "auth",
  data: function () {
    return {
      email: "",
      password: "",
      passwordConfirmation: "",
      termsAccepted: false,
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.termsAccepted) {
        this.$message.error("Please accept terms & conditions to continue");
        return;
      }
      if (this.passwordConfirmation !== this.password) {
        this.$message.error("Passwords do not match");
        return;
      }

      try {
        await this.$axios({
          url: "auth/local/register",
          method: "post",
          data: {
            email: this.email,
            password: this.password,
            username: this.email,
          },
        });
        this.$router.replace("/user/login");
        this.$message.success("Verification mail sent, Please check inbox");
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

<style scoped>
.register-form {
  max-width: 400px;
}
</style>