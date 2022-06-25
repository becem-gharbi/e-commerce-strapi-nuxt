<template>
  <button
    :type="type"
    :class="[className, { disabled: isLoading }]"
    @click="$emit('click')"
  >
    <!-- <span
      v-if="isLoading"
      class="spinner-border spinner-border-sm me-2"
      role="status"
    ></span
    > -->
    {{ label }}
  </button>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      required: false,
      default: "btn",
    },
  },
  data: function () {
    return {
      isLoading: false,
    };
  },
  mounted() {
    this.$axios.onRequest((config) => {
      this.isLoading = true;
    });
    this.$axios.onResponse((config) => {
      this.isLoading = false;
    });
    this.$axios.onError((config) => {
      this.isLoading = false;
    });
  },
};
</script>