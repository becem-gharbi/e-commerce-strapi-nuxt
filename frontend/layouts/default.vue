<template>
  <div>
    <header>
      <div class="brand">{{ $config.brand }}</div>
      <div class="navigation">
        <nuxt-link
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
        </nuxt-link>
        <div class="flex-btn">
          <a-icon type="logout" />
          <span @click="handleLogout" style="cursor: pointer">Logout</span>
        </div>
      </div>
    </header>
    <main v-if="!$fetchState.pending"><nuxt /></main>
  </div>
</template>

<script>
export default {
  fetchOnServer: false,

  async fetch() {
    if (!this.$store.state.initialized) {
      await this.$store.dispatch("init");
    }
  },

  data: function () {
    return {
      paths: [
        { name: "Home", route: "/", icon: "home" },
        { name: "Dashboard", route: "/dashboard", icon: "appstore" },
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
  margin: auto 7px;
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
main {
  padding: 30px 10px;
}
@media (max-width: 570px) {
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
