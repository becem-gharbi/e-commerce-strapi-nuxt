<template>
  <PostGroup
    title="Liked Posts"
    :inFilters="{
      id: {
        $in: likes,
      },
    }"
  />
</template>

<script>
export default {
  computed: {
    likes() {
      let data = [-1];
      for (let el of this.$auth.user.likes) {
        data.push(el.id);
      }
      return data;
    },
  },
};
</script>