<template>
  <div
    style="position: relative"
    class="card"
    :class="{ 'is-invalid': isInvalid }"
  >
    <img :src="image" alt="" height="300px" style="object-fit: contain" />

    <input
      :name="name"
      :required="required"
      @change="handleFileUpload"
      ref="inputFile"
      type="file"
      class="form-control"
      placeholder="Input placeholder"
      hidden
    />

    <button
      style="position: absolute; right: 0.8rem; bottom: 0.8rem"
      class="btn btn-icon"
      type="button"
      @click="onUploadClicked"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="icon icon-tabler icon-tabler-upload"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke-width="1.25"
        stroke="currentColor"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <desc>
          Download more icon variants from https://tabler-icons.io/i/upload
        </desc>
        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2"></path>
        <polyline points="7 9 12 4 17 9"></polyline>
        <line x1="12" y1="4" x2="12" y2="16"></line>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: false,
      default: require("~/assets/no_image.png"),
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      image: this.value
        ? this.value + `?rand=${Math.random()}`
        : require("~/assets/no_image.png"),
      isInvalid: false,
    };
  },
  mounted() {
    this.$refs.inputFile.addEventListener("invalid", (_) => {
      this.isInvalid = true;
    });
  },
  methods: {
    onUploadClicked() {
      this.$refs.inputFile.click();
    },
    handleFileUpload(event) {
      this.isInvalid = false;
      if (event.target.files.length > 0) {
        const imageFile = event.target.files[0];
        this.image = URL.createObjectURL(imageFile);
      }
    },
  },
};
</script>

<style scoped>
.is-invalid {
  box-shadow: 0 0 3px 1px red;
}
</style>