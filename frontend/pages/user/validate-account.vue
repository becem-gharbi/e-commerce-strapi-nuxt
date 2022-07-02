<template>
  <a-result
    status="success"
    title="Your account is created"
    sub-title="Welcome on board!"
  >
    <template #extra>
      <NuxtLink to="/user/login">
        <a-button key="console" type="primary">
          Login to your account
        </a-button>
      </NuxtLink>
    </template>
  </a-result>
</template>

<script>
export default {
  auth: "guest",
  layout: "auth",
};
</script>