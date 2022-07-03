<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <header>
      <div class="brand">
        <img :src="require('@/assets/logo.png')" height="30px" />
      </div>
      <div class="navigation">
        <NuxtLink
          v-for="path in paths"
          :key="path.name"
          :to="path.route"
          active-class="nuxt-link-active"
          exact
        >
          <div class="flex-btn">
            <a-icon :type="path.icon" />
            <span>{{ path.name }}</span>
          </div>
        </NuxtLink>
        <div class="flex-btn">
          <a-icon type="logout" />
          <span @click="handleLogout" style="cursor: pointer">Logout</span>
        </div>
      </div>
    </header>

    <a-layout-content style="padding: 10px 5px">
      <Nuxt />
    </a-layout-content>

    <a-layout-footer style="text-align: center">
      <a
        href="https://github.com/becem-gharbi/e-commerce-strapi-nuxt"
        target="_blank"
        ><a-button icon="github"> Open Source Project</a-button></a
      >
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  data: function () {
    return {
      paths: [
        { name: "Home", route: "/home", icon: "home" },
        { name: "Dashboard", route: "/dashboard", icon: "appstore" },
        { name: "Activity", route: "/activity", icon: "history" },
        { name: "Account", route: "/user/update", icon: "user" },
      ],
    };
  },

  methods: {
    handleLogout() {
      this.$auth.logout();
      this.$router.replace("/user/login");
    },
  },
};
</script>

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
.flex-btn {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  margin: auto 5px;
  color: #474747;
}
.flex-btn span {
  padding-left: 5px;
}
.nuxt-link-active {
  border-bottom: 3px solid #f5222d;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 576px) {
  .flex-btn {
    flex-direction: column;
  }

  .brand {
    display: none;
  }
  .navigation {
    justify-content: space-between;
    width: 100%;
  }
}
</style>
