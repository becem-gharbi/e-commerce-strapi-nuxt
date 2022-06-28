<template>
  <div class="clearfix">
    <a-upload
      list-type="picture-card"
      :file-list="fileList"
      :remove="handleRemove"
      :before-upload="beforeUpload"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < max">
        <a-icon type="plus" />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default {
  name: "InputImages",
  props: {
    images: {
      type: Array,
      default: () => [],
    },
    max: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      uploading: false,
      previewVisible: false,
      previewImage: "",
      fileList:
        !this.images || !this.images[0]
          ? []
          : this.images.flatMap((el) => ({
              uid: el.id,
              url: this.$getFileUrl(el),
              name: el.attributes ? el.attributes.name : el.name,
              status: "done",
            })),
    };
  },

  methods: {
    handleChange({ fileList }) {
      this.fileList = fileList;
    },

    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },

    handleCancel() {
      this.previewVisible = false;
    },

    handleRemove(file) {
      const index = this.fileList.indexOf(file);
      const newFileList = this.fileList.slice();
      newFileList.splice(index, 1);
      this.fileList = newFileList;

      if (file.url) {
        this.$axios
          .delete("/upload/files/" + file.uid)
          .then(() => {
            this.$message.success("deleted successfully.");
          })
          .catch((err) => {
            this.$message.error("delete failed.");
          });
      }
    },

    beforeUpload(file) {
      this.fileList = [...this.fileList, file];
      return false;
    },

    async upload(modelId, entryId, field) {
      const { fileList } = this;
      const formData = new FormData();

      fileList.forEach((file) => {
        if (file.originFileObj) {
          formData.append("files", file.originFileObj);
        }
      });

      if (!formData.get("files")) {
        return;
      }

      this.uploading = true;

      formData.append("ref", modelId);
      formData.append("refId", entryId);
      formData.append("field", field);

      try {
        const res = await this.$axios.post("/upload", formData);

        this.uploading = false;
        this.$message.success("upload successfully.");

        this.fileList = this.fileList.filter((el) => el.url);

        Array.from(res.data).forEach((el) => {
          this.fileList.push({
            uid: el.id,
            url: this.$getFileUrl(el),
            name: el.name,
            status: "done",
          });
        });
      } catch (err) {
        this.uploading = false;
        this.$message.error("upload failed.");
      }
    },
  },
};
</script>
