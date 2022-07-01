<template>
  <PostGroup
    title="Latest Posts"
    :inFilters="{
      author: {
        location: {
          country: $store.state.country,
        },
      },
    }"
  />
</template>

<script>
export default {
  auth: false,
  layout({ $auth }) {
    return $auth.loggedIn ? "default" : "main";
  },
};
</script>