<template>
  <div class="container-tight">
    <form class="card card-md" @submit.prevent="handleSubmit">
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Password Forgotten ?</h2>
        <p class="text-muted text-center mb-4">
          Enter your email address and a reset password mail will be sent to you
        </p>
        <InputBase
          label="Email address"
          name="email"
          type="email"
          :required="true"
        ></InputBase>
        <div class="form-footer">
          <ButtonAsync
            label="Reset Password"
            type="submit"
            class="btn btn-primary w-100"
          ></ButtonAsync>
        </div>
      </div>
    </form>
    <div class="text-center text-muted mt-3">
      Forget it, <NuxtLink to="/">send me back</NuxtLink> to the sign in screen.
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: "auth",
  methods: {
    async handleSubmit(event) {
      try {
        await this.$axios({
          url: "auth/forgot-password",
          method: "post",
          data: {
            email: event.target.email.value,
          },
        });
        this.$swal.fire({
          padding: "0.2rem",
          title:
            "<p class='h3'>" +
            "Reset password sent, please check Inbox" +
            "</p>",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
          icon: "success",
          width: "20rem",
        });
        this.$router.replace("/");
      } catch (e) {}
    },
  },
};
</script>