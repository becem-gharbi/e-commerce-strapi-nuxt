<template>
  <a-row type="flex" justify="center" :gutter="[20, 20]">
    <a-col :xs="24" :sm="24" :md="7" :lg="4">
      <Profile :user="$route.params.id" />
    </a-col>
    <a-col :xs="24" :sm="24" :md="17" :lg="20">
      <ProductList :user="$route.params.id" :authorVisible="false" />
    </a-col>
  </a-row>
</template>

<script>
export default {
  auth: false,
  layout({ $auth }) {
    return $auth.loggedIn ? "default" : "main";
  },
};
</script>