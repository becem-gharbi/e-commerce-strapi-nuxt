<template>
  <div>
    <header>
      <div class="brand">
        <NuxtLink to="/"
          ><img :src="require('@/assets/logo.png')" height="30px"
        /></NuxtLink>
      </div>
      <a-space>
        <NuxtLink to="/user/login"><a-button>Login</a-button></NuxtLink>
        <NuxtLink to="/user/register"><a-button>Register</a-button></NuxtLink>
      </a-space>
    </header>
    <main><Nuxt /></main>
    <footer>
      <a
        href="https://github.com/becem-gharbi/e-commerce-strapi-nuxt"
        target="_blank"
        ><a-button icon="github"> Open Source </a-button></a
      >
    </footer>
  </div>
</template>

<script>
export default {
  name: "MainLayout",
};
</script>

<style scoped>
header {
  padding: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: white;
  box-shadow: 0 0 1px 0px #0352c9;
}

main {
  padding: 1rem 0.3rem;
}

footer {
  position: fixed;
  bottom: 1rem;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
