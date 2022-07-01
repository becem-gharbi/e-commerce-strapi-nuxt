<template>
  <div class="page-center">
    <NuxtLink to="/"
      ><img :src="require('@/assets/logo.png')" height="35px"
    /></NuxtLink>
    <br />
    <br />
    <Nuxt />
    <br>
        <!-- <NuxtLink to="/"
      ><img :src="require('@/assets/logo.png')" height="35px"
    /></NuxtLink> -->
  </div>
</template>

<script>
export default {
  name: "Auth",
};
</script>

<style scoped>
.page-center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 1rem;
}
</style>