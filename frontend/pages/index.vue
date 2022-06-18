  <template>
  <div class="container-tight">
    <form
      class="card card-md"
      @submit.prevent="handleSubmit"
      autocomplete="off"
    >
      <div class="card-body">
        <h2 class="card-title text-center mb-4">Login to your account</h2>
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
        <div class="mb-3 float-end">
          <NuxtLink to="/user/forgot-password">Forgot password ?</NuxtLink>
        </div>

        <div class="form-footer">
          <button type="submit" class="btn btn-primary w-100">Sign in</button>
        </div>
      </div>
    </form>
    <div class="text-center text-muted mt-3">
      Don't have account yet?
      <NuxtLink to="/user/register">Sign up</NuxtLink>
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
        await this.$auth.loginWith("local", {
          data: {
            identifier: event.target.email.value,
            password: event.target.password.value,
          },
        });
        this.$router.replace("/home");
      } catch (err) {}
    },
  },
};
</script>