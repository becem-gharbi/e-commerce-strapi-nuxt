<template>
  <div class="mb-3">
    <label class="form-label" :class="{ required: required }">{{
      label
    }}</label>

    <input
      :name="name"
      :value="value"
      :type="type"
      class="form-control"
      :class="{ 'is-invalid': error.message }"
      @keypress="error.message = null"
      :required="required"
    />

    <div class="invalid-feedback">
      {{ error.message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: [String, Number],
      default: null,
    },
    errors: {
      type: Array,
      default: () => [],
    },
    required: {
      type: Boolean,
      default: false,
    },
  },

  data: function () {
    return {
      error: {},
    };
  },

  watch: {
    errors(value) {
      for (let error of value) {
        if (error["path"][0] === this.name) {
          this.error = error;
        }
      }
    },
  },
};
</script>