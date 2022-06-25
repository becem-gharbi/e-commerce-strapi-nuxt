<template>
  <a-button
    :icon="icon"
    :type="type"
    :html-type="htmlType"
    :disabled="isLoading"
    :loading="isLoading"
    :block="block"
    @click="$emit('click')"
    >{{ label }}</a-button
  >
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    htmlType: {
      type: String,
      default: "button",
    },
    type: {
      type: String,
      default: "primary",
    },
    icon: {
      type: String,
      default: "",
    },
    block: {
      type: Boolean,
      default: false,
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