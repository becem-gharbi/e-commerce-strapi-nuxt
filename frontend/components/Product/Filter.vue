<template>
  <div
    class="modal modal-blur fade"
    :id="modalId"
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

            <button data-bs-dismiss="modal" type="submit" class="btn">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modalId: {
      type: String,
      required: true,
    },
  },

  data: function () {
    return {
      selectedPriceMax: 50,
      priceMax: 3000,
      currency: this.$auth.user.location.currency,
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
        category: !event.target.category.value
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