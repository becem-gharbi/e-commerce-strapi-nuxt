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
  layout: (context) => (context.$auth.loggedIn ? "default" : "main"),
};
</script>