<template>
  <div
    class="card card-link rounded-2"
    style="position: relative; cursor: pointer"
  >
    <div v-if="!enableEdit" style="position: absolute; left: 10px; top: 10px">
      <ProductFavourite :product="product"></ProductFavourite>
    </div>

    <div
      class="btn-group"
      v-if="enableEdit"
      style="position: absolute; right: 5px; top: 5px; z-index: 10"
    >
      <button class="btn btn-icon" @click="handleDelete()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-x"
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
            Download more icon variants from https://tabler-icons.io/i/x
          </desc>
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <NuxtLink class="btn btn-icon" :to="`/product/${product.id}/update`">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-pencil"
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
            Download more icon variants from https://tabler-icons.io/i/pencil
          </desc>
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"></path>
          <line x1="13.5" y1="6.5" x2="17.5" y2="10.5"></line>
        </svg>
      </NuxtLink>
    </div>

    <ProductMore :modalId="`product-${product.id}-more-id`"></ProductMore>

    <div
      data-bs-toggle="modal"
      :data-bs-target="`#product-${product.id}-more-id`"
      @click="$store.dispatch('getProduct', product.id)"
    >
      <img
        :src="product.image"
        height="200px"
        style="object-fit: contain"
        class="card-img-top"
      />
    </div>

    <div class="card-body">
      <div class="d-flex align-items-center">
        <div>
          <div>{{ product.name }}</div>
          <div class="text-muted">
            {{ $dayjs().to($dayjs(product.createdAt)) }}
          </div>
        </div>
        <div class="ms-auto">
          <div class="badge bg-green">
            <span>
              <!-- Download SVG icon from http://tabler-icons.io/i/eye -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-coin"
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
                  https://tabler-icons.io/i/coin
                </desc>
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <circle cx="12" cy="12" r="9"></circle>
                <path
                  d="M14.8 9a2 2 0 0 0 -1.8 -1h-2a2 2 0 0 0 0 4h2a2 2 0 0 1 0 4h-2a2 2 0 0 1 -1.8 -1"
                ></path>
                <path d="M12 6v2m0 8v2"></path>
              </svg>
              {{ product.price + " " + currency }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    enableEdit: {
      type: Boolean,
      default: false,
    },
  },

  data: function () {
    return {
      currency: this.$auth.user.location
        ? this.$auth.user.location.currency
        : null,
    };
  },

  methods: {
    async handleDelete() {
      this.$store.dispatch("deleteProduct", this.product.id);
    },
  },
};
</script>
