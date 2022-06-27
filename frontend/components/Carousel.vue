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
    <div v-for="(image, index) of images" :key="index">
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
/* For demo */
.ant-carousel >>> .slick-slide {
  text-align: center;
  height: 300px;
  line-height: 300px;
  background: #364e791c;
  overflow: hidden;
  border-radius: 5px;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(213, 213, 213, 0);
  opacity: 0.7;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.8;
}

.ant-carousel >>> .slick-slide h3 {
  color: #fff;
}

img {
  object-fit: contain;
  height: 300px;
  margin: auto;
}
</style>