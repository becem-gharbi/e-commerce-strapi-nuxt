<template>
  <div>
    <div
      class="page theme-light"
      :class="{ 'theme-dark': $auth.user.themeDark }"
    >
      <Navigation></Navigation>
      <div class="page-wrapper">
        <div class="container-fluid my-3">
          <Nuxt></Nuxt>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>