  <template>
  <div class="container-tight">
    <form
      class="card card-md"
      @submit.prevent="handleSubmit"
      autocomplete="off"
    >
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Create new account</h2>
        <InputBase
          label="Email address"
          name="email"
          type="email"
          :required="true"
        ></InputBase>
        <InputBase
          label="Password"
          name="password"
          type="password"
          :required="true"
        ></InputBase>
        <div class="form-footer">
          <ButtonAsync
            label="Sign up"
            type="submit"
            class="btn btn-primary w-100"
          ></ButtonAsync>
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
  methods: {
    async handleSubmit(event) {
      try {
        let res = await this.$axios({
          url: "auth/local/register",
          method: "post",
          data: {
            email: event.target.email.value,
            password: event.target.password.value,
            username: event.target.email.value,
          },
        });
        this.$swal.fire({
          padding: "0.2rem",
          title:
            "<p class='h3'>" +
            "Verification mail sent, Please check Inbox" +
            "</p>",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false,
          icon: "success",
          width: "20rem",
        });
        this.$router.replace({
          path: "/",
        });
      } catch (err) {}
    },
  },
};
</script>