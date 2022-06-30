<template>
  <a-space direction="vertical" align="center" size="middle">
    <h2>{{ "Connecting with " + provider }}</h2>
    <a-spin size="large" />
  </a-space>
</template>
<script>
export default {
  auth: false,
  layout: "auth",
  data() {
    return {
      access_token: this.$route.query.access_token,
      provider: this.$route.params.provider,
    };
  },
  async mounted() {
    try {
      const res = await this.$axios.get(
        `/auth/${this.provider}/callback?access_token=${this.access_token}`
      );

      const jwt = res.data.jwt;

      await this.$auth.setUserToken(jwt);

      this.$router.replace("/");
    } catch (err) {
      this.$router.replace("/user/login");
      this.$message.error(err.response.data.error.message);
    }
  },
};
</script>