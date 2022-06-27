<template>
  <a-upload
    name="avatar"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    :before-upload="beforeUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" height="200px" />
    <div v-else>
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
</template>

<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  props: ["value"],

  data() {
    return {
      imageUrl: this.value,
    };
  },

  methods: {
    beforeUpload(file) {
      getBase64(file, (imageUrl) => {
        this.imageUrl = imageUrl;
      });
      this.$emit("input", file);
      return false;
    },
  },
};
</script>

<style>
.avatar-uploader > .ant-upload {
  width: 100%;
  height: auto;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>