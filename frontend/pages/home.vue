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
  auth: true,
};
</script>