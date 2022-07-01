<template>
  <PostGroup
    title="My Posts"
    :inFilters="{
      author: $auth.user.id,
    }"
    :editEnable="true"
  />
</template>


