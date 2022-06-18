<template>
  <div class="page page-center">
    <div class="py-4">
      <div class="text-center mb-4">
        <NuxtLink to="/" class="navbar-brand navbar-brand-autodark"
          ><img :src="require('/assets/logo.svg')" height="36" alt=""
        /></NuxtLink>
      </div>
      <Nuxt></Nuxt>
      <div class="text-center mt-4">
        <a
          href="https://github.com/becem-gharbi/e-commerce-strapi-nuxt"
          class="btn btn-github"
          target="_blank"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-brand-github"
            width="40"
            height="40"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path
              d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
            ></path>
          </svg>
          Open source
        </a>
      </div>
    </div>
  </div>
</template>
