<template>
  <div class="mb-3">
    <label class="form-label" :class="{ required: required }">{{
      label
    }}</label>

    <textarea
      :name="name"
      :value="value"
      :required="required"
      :class="{ 'is-invalid': error.message }"
      ref="inputAutosize"
      @keypress="error.message = null"
      class="form-control"
      data-bs-toggle="autosize"
    ></textarea>

    <div class="invalid-feedback">
      {{ error.message }}
    </div>
  </div>
</template>

<script>
import autosize from "autosize";

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
    value: {
      type: String,
      default: "",
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

  mounted() {
    autosize(this.$refs.inputAutosize);
  },
};
</script>