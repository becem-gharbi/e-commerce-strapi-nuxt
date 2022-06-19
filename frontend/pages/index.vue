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
          <ButtonAsync
            label="Sign in"
            type="submit"
            class="btn btn-primary w-100"
          ></ButtonAsync>
          <div class="hr-text">OR</div>
          <a type="button" class="btn w-100 btn-google" :href="googleLoginUrl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-brand-google"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M17.788 5.108a9 9 0 1 0 3.212 6.892h-8"></path></svg
            >Sign with Google</a
          >
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
  data: function () {
    return {
      googleLoginUrl: `${process.env.STRAPI_URL}/api/connect/google`,
    };
  },
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