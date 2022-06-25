<template>
  <a-carousel arrows>
    <div
      slot="prevArrow"
      class="custom-slick-arrow"
      style="left: 10px; z-index: 1"
    >
      <a-icon type="left-circle" />
    </div>
    <div slot="nextArrow" class="custom-slick-arrow" style="right: 10px">
      <a-icon type="right-circle" />
    </div>
    <div v-for="image of images" :key="image">
      <img :src="image" />
    </div>
  </a-carousel>
</template>

<script>
export default {
  props: {
    images: Array,
  },
};
</script>

<style scoped>
.ant-carousel >>> .slick-slide {
  line-height: 0;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: rgb(222, 222, 222);
  background-color: transparent;
  opacity: 1;
}

.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}

.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}

img {
  margin: auto;
  height: auto;
  border-radius: 8px;
}
</style>