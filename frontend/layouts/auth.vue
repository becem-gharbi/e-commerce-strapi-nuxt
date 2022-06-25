<template>
  <div class="page-center">
    <NuxtLink to="/">BRAND</NuxtLink>
    <br />
    <Nuxt></Nuxt>
    <br />
    <a
      href="https://github.com/becem-gharbi/e-commerce-strapi-nuxt"
      target="_blank"
      ><a-button icon="github"> Open Source </a-button></a
    >
  </div>
</template>

<script>
export default {};
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