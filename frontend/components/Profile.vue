<template>
  <a-card hoverable size="small">
    <img
      slot="cover"
      alt="example"
      :src="image"
      height="200px"
      style="object-fit: contain"
    />
    <template slot="actions" class="ant-card-actions">
      <a :href="facebookLink" target="_blank"
        ><a-icon v-show="facebookLink" key="facebook" type="facebook"
      /></a>
      <a :href="`mailto:${email}`"> <a-icon key="mail" type="mail" /></a>
    </template>
    <a-card-meta :title="fullname">
      <template slot="description">
        {{ location.country + ", " + location.state }}
      </template>
    </a-card-meta>
  </a-card>
</template>

<script>
import qs from "qs";
export default {
  props: {
    user: [Number, String],
  },

  data() {
    return {
      fullname: "",
      location: {},
      facebookLink: "",
      email: "",
      image: "",
    };
  },

  async fetch() {
    const query = qs.stringify({
      populate: ["image", "location"],
    });

    const res = await this.$axios.get("/users/" + this.user + "?" + query);

    this.fullname = res.data.fullname;
    this.location = res.data.location;
    this.facebookLink = res.data.facebookLink;
    this.email = res.data.email;
    this.image = res.data.image
      ? process.env.NODE_ENV === "production"
        ? res.data.image.url + `?rand=${Math.random()}`
        : `${process.env.STRAPI_URL}${res.data.image.url}` +
          `?rand=${Math.random()}`
      : require("@/assets/no_profile.png");
  },
};
</script>