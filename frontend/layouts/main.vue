<template>
  <a-layout
    id="components-layout-demo-top"
    class="layout"
    style="height: 100vh"
  >
    <a-layout-header>
      <NuxtLink to="/"
        ><img :src="require('@/assets/logo.png')" height="30px"
      /></NuxtLink>

      <a-space style="float: right">
        <NuxtLink to="/user/login"><a-button>Login</a-button></NuxtLink>
        <NuxtLink to="/user/register"
          ><a-button type="primary">Register</a-button></NuxtLink
        >
      </a-space>
    </a-layout-header>

    <a-layout-content style="padding: 10px 5px">
      <Nuxt />
    </a-layout-content>

    <a-layout-footer style="text-align: center">
      <a
        href="https://github.com/becem-gharbi/e-commerce-strapi-nuxt"
        target="_blank"
        ><a-icon type="github" /> Open Source Project</a
      >
    </a-layout-footer>
  </a-layout>
</template>
