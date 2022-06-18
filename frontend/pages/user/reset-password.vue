<template>
  <div class="container-tight">
    <form
      class="card card-md"
      @submit.prevent="handleSubmit"
      autocomplete="off"
    >
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Reset password</h2>
        <InputBase
          label="New Password"
          name="password"
          type="password"
        ></InputBase>
        <InputBase
          label="Password Confirmation"
          name="passwordConfirmation"
          type="password"
        ></InputBase>
        <div class="form-footer">
          <button
            type="submit"
            class="btn btn-primary w-100"
            :class="{ disabled: loading }"
          >
            Reset Password
          </button>
        </div>
      </div>
    </form>
    <div class="text-center text-muted mt-3">
      Already have an account?
      <NuxtLink to="/">Sign in</NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: "auth",
  data: function () {
    return {
      loading: false,
    };
  },
  methods: {
    async handleSubmit(event) {
      try {
        this.loading = true;
        await this.$axios.post("auth/reset-password", {
          code: this.$route.query.code,
          password: event.target.password.value,
          passwordConfirmation: event.target.passwordConfirmation.value,
        });
        this.$router.replace("/");
      } catch (e) {
        this.loading = false;
      }
    },
  },
};
</script>