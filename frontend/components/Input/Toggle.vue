<template>
  <div class="mb-3 d-flex align-items-center">
    <label class="form-label">{{ label }}</label>
    <span class="ms-2 form-check form-switch">
      <input
        :name="name"
        class="form-check-input"
        type="checkbox"
        :checked="value"
    /></span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>