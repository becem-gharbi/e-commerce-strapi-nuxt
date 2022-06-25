<template>
  <ProductList />
</template>

<script>
export default {
  auth: false,
  layout: (context) => (context.$auth.loggedIn ? "default" : "main"),
  // layout() {
  //   return this.$auth.loggedIn ? "default" : "main";
  // },
};
</script>