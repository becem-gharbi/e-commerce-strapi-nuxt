<template>
  <a-space direction="vertical" align="center" size="middle">
    <h2>Connecting with Google</h2>
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
    };
  },
  async mounted() {
    try {
      const res = await this.$axios.$get(
        `/auth/google/callback?access_token=${this.access_token}`
      );

      const { jwt } = res;

      await this.$auth.setUserToken(jwt);

      this.$router.replace("/");
    } catch (err) {
      this.$router.replace("/user/login");
      this.$message.error("Failed to connect with Google");
    }
  },
};
</script>