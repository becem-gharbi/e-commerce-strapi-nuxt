<template>
  <header
    class="navbar navbar-horizontal navbar-expand-md navbar-light d-print-none"
    :class="{
      'navbar-vertical': isNavbarVertical,
      'navbar-dark': isNavbarDark,
    }"
  >
    <div class="container-fluid">
      <h1 class="navbar-brand navbar-brand-autodark me-3">
        <NuxtLink to="/home">
          <cite>BRAND</cite>
        </NuxtLink>
      </h1>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar-menu"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- <hr class="mt-0 mb-2" /> -->
      <div class="collapse navbar-collapse" id="navbar-menu">
        <ul class="navbar-nav">
          <!-- My Home -->
          <li
            class="nav-item"
            :class="{ active: $route.path.includes('/home') }"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
            @click="goTo('/home')"
          >
            <a class="nav-link">
              <span class="nav-link-icon d-md-none d-lg-inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-smart-home"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <desc>
                    Download more icon variants from
                    https://tabler-icons.io/i/smart-home
                  </desc>
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M19 8.71l-5.333 -4.148a2.666 2.666 0 0 0 -3.274 0l-5.334 4.148a2.665 2.665 0 0 0 -1.029 2.105v7.2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-7.2c0 -.823 -.38 -1.6 -1.03 -2.105"
                  ></path>
                  <path d="M16 15c-2.21 1.333 -5.792 1.333 -8 0"></path>
                </svg>
              </span>
              <span class="nav-link-title"> Home </span>
            </a>
          </li>
          <!-- Home -->
          <!-- My Products -->
          <li
            class="nav-item"
            :class="{ active: $route.path.includes('/product') }"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
            @click="goTo('/product')"
          >
            <a class="nav-link">
              <span class="nav-link-icon d-md-none d-lg-inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-news"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <desc>
                    Download more icon variants from
                    https://tabler-icons.io/i/news
                  </desc>
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M16 6h3a1 1 0 0 1 1 1v11a2 2 0 0 1 -4 0v-13a1 1 0 0 0 -1 -1h-10a1 1 0 0 0 -1 1v12a3 3 0 0 0 3 3h11"
                  ></path>
                  <line x1="8" y1="8" x2="12" y2="8"></line>
                  <line x1="8" y1="12" x2="12" y2="12"></line>
                  <line x1="8" y1="16" x2="12" y2="16"></line>
                </svg>
              </span>
              <span class="nav-link-title"> My Products </span>
            </a>
          </li>
          <!-- My Products -->
          <!-- My Account -->
          <li
            class="nav-item"
            :class="{ active: $route.path.includes('/user/account') }"
            data-bs-toggle="collapse"
            data-bs-target="#navbar-menu"
            @click="goTo('/user/account')"
          >
            <a class="nav-link">
              <span class="nav-link-icon d-md-none d-lg-inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-user"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <desc>
                    Download more icon variants from
                    https://tabler-icons.io/i/user
                  </desc>
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                </svg>
              </span>
              <span class="nav-link-title"> My Account </span>
            </a>
          </li>
          <!-- My Account -->
          <!-- Logout -->
          <li class="nav-item">
            <a class="nav-link" @click="handleLogout">
              <span class="nav-link-icon d-md-none d-lg-inline-block">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="icon icon-tabler icon-tabler-logout"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <desc>
                    Download more icon variants from
                    https://tabler-icons.io/i/logout
                  </desc>
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path
                    d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"
                  ></path>
                  <path d="M7 12h14l-3 -3m0 6l3 -3"></path>
                </svg>
              </span>
              <span class="nav-link-title"> Logout </span>
            </a>
          </li>
          <!-- Logout -->
        </ul>
      </div>
    </div>
  </header>
</template>
    
<script>
export default {
  props: {
    isNavbarVertical: {
      type: Boolean,
      default: true,
    },
    isNavbarDark: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleLogout() {
      this.$auth.logout();
    },
    goTo(path) {
      this.$router.replace(path);
    },
  },
};
</script>

<style scoped>
a {
  cursor: pointer;
}
</style>