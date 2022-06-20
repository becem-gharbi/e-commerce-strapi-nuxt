<template>
  <div v-if="pagination.pageCount > 1" class="d-flex">
    <ul class="pagination ms-auto me-auto">
      <li class="page-item" :class="{ disabled: pagination.page === 1 }">
        <NuxtLink
          class="page-link"
          :to="{ query: { page: pagination.page - 1 } }"
          tabindex="-1"
          aria-disabled="true"
        >
          <!-- Download SVG icon from http://tabler-icons.io/i/chevron-left -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="15 6 9 12 15 18" />
          </svg>
        </NuxtLink>
      </li>
      <li
        v-for="page in pagination.pageCount"
        :key="page"
        class="page-item mx-1"
        :class="{ active: pagination.page === page }"
      >
        <NuxtLink class="page-link rounded-circle" :to="{ query: { page } }">{{
          page
        }}</NuxtLink>
      </li>
      <li
        class="page-item"
        :class="{ disabled: pagination.page === pagination.pageCount }"
      >
        <NuxtLink
          class="page-link"
          :to="{ query: { page: pagination.page + 1 } }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    pagination: {
      page: {
        type: Number,
        required: true,
      },
      pageCount: {
        type: Number,
        required: true,
      },
    },
  },
};
</script>