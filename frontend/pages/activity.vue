<template>
  <PostGroup
    title="My Reviews"
    :inFilters="{
      reviews: {
        user: $auth.user.id,
      },
    }"
  />
</template>
