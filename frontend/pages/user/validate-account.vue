<template>
  <div class="container-tight">
    <div class="card card-md">
      <div class="card-body text-center">
        <div class="modal-status bg-success"></div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon mb-2 text-green icon-lg"
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
          <circle cx="12" cy="12" r="9" />
          <path d="M9 12l2 2l4 -4" />
        </svg>
        <h3 card-title>Your account is successfully validated</h3>
        <div class="text-muted">Welcome on board !</div>
        <div class="form-footer">
          <NuxtLink to="/"
            ><button type="button" class="btn btn-success w-100">
              Sign in
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  layout: "auth",
};
</script>