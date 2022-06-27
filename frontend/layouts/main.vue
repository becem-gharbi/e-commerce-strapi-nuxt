<template>
  <div>
    <header>
      <div class="brand"><NuxtLink to="/">BRAND</NuxtLink></div>
      <div class="navigation">
        <a
          href="https://github.com/becem-gharbi/e-commerce-strapi-nuxt"
          target="_blank"
          ><a-button icon="github"> Open Source </a-button></a
        >
        <NuxtLink to="/user/login"><a-button>Login</a-button></NuxtLink>
        <NuxtLink to="/user/register"><a-button>Register</a-button></NuxtLink>
      </div>
    </header>
    <main><nuxt /></main>
  </div>
</template>

<style scoped>
header {
  padding: 0 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: white;
  box-shadow: 0 0 1px 0px #0352c9;
}
.brand {
  color: #474747;
  font-weight: 600;
  font-size: medium;
}
.navigation {
  display: flex;
  height: 50px;
  flex-direction: row;
  align-items: center;
  gap: 5px;
}
main {
  padding: 30px 10px;
}
</style>
