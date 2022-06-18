require('dotenv').config();

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'strapi-nuxt-learn',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://unpkg.com/@tabler/core@latest/dist/css/tabler.min.css' },
      { rel: 'stylesheet', href: 'https://api.mapbox.com/mapbox-gl-js/v2.8.2/mapbox-gl.css' },
    ],
    script: [
      {
        src: 'https://unpkg.com/@tabler/core@latest/dist/js/tabler.min.js',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios', 'vue-sweetalert2/nuxt', '@nuxtjs/auth-next', '@nuxtjs/dayjs', '@nuxtjs/dotenv',
  ],

  dayjs: {
    plugins: [
      'relativeTime',
    ] // Your Day.js plugin
  },

  auth: {
    // Options
    redirect: {
      login: '/',
      logout: '/',
      callback: false,
      home: '/home',
    },
    strategies: {
      local: {
        token: {
          property: 'jwt',
        },
        user: {
          property: false,
        },
        endpoints: {
          login: {
            url: 'auth/local',
            method: 'post',
          },
          user: {
            url: 'users/me',
            method: 'get',
          },
          logout: false,
        },
      },
    },
  },


  router: {
    middleware: ['auth']
  },

  sweetalert: {
    confirmButtonColor: '#d63939',
    cancelButtonColor: '#206bc4',
    padding: "1rem",
    width: "27rem",
    reverseButtons: true,
    focusConfirm: false,
    confirmButtonText: "Delete",
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.STRAPI_URL + '/api',
    progress: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },
}
