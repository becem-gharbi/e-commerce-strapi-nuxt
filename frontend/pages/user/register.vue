  <template>
  <div class="container-tight">
    <form
      class="card card-md"
      @submit.prevent="handleSubmit"
      autocomplete="off"
    >
      <div class="card-stamp">
        <div class="card-stamp-icon bg-blue">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-list-details"
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
            <path d="M13 5h8"></path>
            <path d="M13 9h5"></path>
            <path d="M13 15h8"></path>
            <path d="M13 19h5"></path>
            <rect x="3" y="4" width="6" height="6" rx="1"></rect>
            <rect x="3" y="14" width="6" height="6" rx="1"></rect>
          </svg>
        </div>
      </div>
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
        <InputBase label="Name" name="fullname" :required="true"></InputBase>
        <InputLocation :countryVisible="true" :required="true"></InputLocation>
        <div class="form-footer">
          <button
            type="submit"
            class="btn btn-primary w-100"
            :class="{ disabled: loading }"
          >
            Sign up
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
        let res = await this.$axios({
          url: "auth/local/register",
          method: "post",
          data: {
            fullname: event.target.fullname.value,
            location: {
              country: event.target.country.value,
              state: event.target.state.value,
              currency: event.target.currency.value,
            },
            email: event.target.email.value,
            password: event.target.password.value,
            username: event.target.email.value,
          },
        });
        this.loading = false;
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
      } catch (err) {
        this.loading = false;
      }
    },
  },
};
</script>