<template>
  <div class="container-tight">
    <div class="card card-md">
      <div class="card-body text-center">
        <h2 class="card-title text-center mb-4">
          {{ "Connecting by " + provider }}
        </h2>
        <div class="m-4 spinner-grow text-blue" role="status"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  auth: false,
  layout: "auth",
  data() {
    return {
      provider: this.$route.params.provider,
      access_token: this.$route.query.access_token,
    };
  },
  async mounted() {
    try {
      const res = await this.$axios.$get(
        `/auth/${this.provider}/callback?access_token=${this.access_token}`
      );

      const { jwt } = res;

      await this.$auth.setUserToken(jwt);
      this.$router.replace("/home");
    } catch (err) {
      this.$router.replace("/");
    }
  },
};
</script>