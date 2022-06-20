<template>
  <div>
    <a
      href="#"
      class="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#product-filter-id"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-filter"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.25"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <desc>
          Download more icon variants from https://tabler-icons.io/i/filter
        </desc>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path
          d="M5.5 5h13a1 1 0 0 1 .5 1.5l-5 5.5l0 7l-4 -3l0 -4l-5 -5.5a1 1 0 0 1 .5 -1.5"
        ></path>
      </svg>
      Filter
    </a>

    <div
      class="modal modal-blur fade"
      id="product-filter-id"
      tabindex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Filters</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <form @submit.prevent="handleSubmit">
              <InputBase label="Search" name="search"></InputBase>

              <InputToggle
                label="Only Favourites"
                name="onlyFavourites"
              ></InputToggle>

              <InputCategory></InputCategory>

              <InputLocation :value="$auth.user.location"></InputLocation>
              <div class="mb-3">
                <label class="form-label"
                  >Max Price
                  <span class="badge badge-pill bg-primary ms-1">{{
                    selectedPriceMax + " " + currency
                  }}</span></label
                >
                <input
                  type="range"
                  name="selectedPriceMax"
                  v-model="selectedPriceMax"
                  class="form-range mb-2"
                  value="40"
                  min="0"
                  :max="priceMax"
                  step="10"
                />
              </div>
              <div class="modal-footer p-0">
                <button
                  data-bs-dismiss="modal"
                  type="submit"
                  class="btn btn-primary"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},

  data: function () {
    return {
      priceMax: 3000,
      selectedPriceMax: 3000,
      currency: this.$auth.user.location
        ? this.$auth.user.location.currency
        : null,
    };
  },

  computed: {
    favouriteProducts() {
      let data = [-1];
      for (let el of this.$auth.user.favouriteProducts) {
        data.push(el.id);
      }
      return data;
    },
  },

  methods: {
    async handleSubmit(event) {
      const filters = {
        id: !event.target.onlyFavourites.checked
          ? {}
          : {
              $in: this.favouriteProducts,
            },
        name: {
          $containsi: event.target.search.value,
        },
        category:
          !event.target.category.value || event.target.category.value == 1
            ? {}
            : event.target.category.value,
        price: {
          $lt: event.target.selectedPriceMax.value,
        },
        user: {
          location:
            event.target.state.value === "Unspecified"
              ? {
                  country: event.target.country.value,
                }
              : {
                  country: event.target.country.value,
                  state: event.target.state.value,
                },
        },
      };

      this.$store.dispatch("getProducts", {
        filters,
        pagination: {
          page: this.$route.query.page ? this.$route.query.page : 1,
          pageSize: 20,
        },
      });
    },
  },
};
</script>