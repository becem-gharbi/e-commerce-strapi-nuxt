<template>
  <a-result
    :status="error.statusCode.toString()"
    :title="error.statusCode"
    sub-title="Sorry, an error occured"
  >
    <template #extra>
      <NuxtLink to="/"
        ><a-button type="primary"> Back Home </a-button></NuxtLink
      >
    </template>
  </a-result>
</template>

<script>
export default {
  props: ["error"],
  layout: "auth",
};
</script>