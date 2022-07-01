<template>
  <PostGroup
    title="My Posts"
    :inFilters="{
      author: {
        id: this.$auth.user.id,
      },
    }"
    :editEnable="true"
  />
</template>


