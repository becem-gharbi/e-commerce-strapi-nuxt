<template>
  <button
    class="switch-icon switch-icon-scale"
    :class="{ active: isFavourite }"
    @click="toggelFavourite()"
    data-bs-toggle="switch-icon"
  >
    <span class="switch-icon-a text-muted">
      <!-- Download SVG icon from http://tabler-icons.io/i/star -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-star"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="white"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <desc>
          Download more icon variants from https://tabler-icons.io/i/star
        </desc>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path
          d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
        ></path>
      </svg>
    </span>
    <span class="switch-icon-b text-yellow">
      <!-- Download SVG icon from http://tabler-icons.io/i/star -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-star icon-filled"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        stroke-width="2"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <desc>
          Download more icon variants from https://tabler-icons.io/i/star
        </desc>
        <path stroke="none" d="M0 0h40v40H0z" fill="none"></path>
        <path
          d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
        ></path>
      </svg>
    </span>
  </button>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },

  computed: {
    isFavourite() {
      return this.$auth.user.favouriteProducts?.some(
        (el) => el.id === this.product.id
      );
    },
  },

  methods: {
    async toggelFavourite() {
      const formData = new FormData();
      let data = [];

      if (this.isFavourite) {
        for (let el of this.$auth.user.favouriteProducts) {
          if (el.id !== this.product.id) {
            data.push(el.id);
          }
        }
      } else {
        for (let el of this.$auth.user.favouriteProducts) {
          data.push(el.id);
        }
        data.push(this.product.id);
      }

      formData.append("data", JSON.stringify({ favouriteProducts: data }));

      await this.$axios.put(`/users/me`, formData);

      await this.$auth.fetchUser();
    },
  },
};
</script>