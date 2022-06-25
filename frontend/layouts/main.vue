<template>
  <div>
    <a-row align="middle" style="width: 100%; padding:5px">
      <a-col :span="12">BRAND</a-col>
      <a-col :span="12" style="text-align: right">
        <NuxtLink to="/user/login"><a-button>Login</a-button></NuxtLink>
        <NuxtLink to="/user/register"
          ><a-button>Register</a-button></NuxtLink
        ></a-col
      >
    </a-row>

    <Nuxt />
  </div>
</template>