<template>
  <div class="card">
    <div class="card-body p-2">
      <div class="row align-items-center">
        <div class="col-auto">
          <span
            class="avatar"
            :style="{
              backgroundImage: `url(${product.user.image})`,
            }"
          ></span>
        </div>
        <div class="col text-truncate">
          <a href="#" class="text-body d-block">{{ product.user.fullname }}</a>
          <div class="text-muted text-truncate mt-n1">
            {{ product.user.state }}
          </div>
        </div>
        <div class="col text-end">
          <a
            v-show="product.user.facebookLink"
            :href="product.user.facebookLink"
            target="_blank"
            class="btn btn-primary btn-icon"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-brand-facebook"
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
                d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3"
              ></path>
            </svg>
          </a>
          <a
            :href="`mailto:${product.user.email}`"
            class="btn btn-warning btn-icon"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-mail"
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
                Download more icon variants from https://tabler-icons.io/i/mail
              </desc>
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <rect x="3" y="5" width="18" height="14" rx="2"></rect>
              <polyline points="3 7 12 13 21 7"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["product"]),
  },
};
</script>