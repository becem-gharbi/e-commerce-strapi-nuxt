<template>
  <a-space align="end">
    <a-rate
      v-model="note"
      @change="handleChange"
      :disabled="!$auth.loggedIn"
      :style="{ fontSize: '1rem' }"
    />{{ "(" + reviewsCount + ")" }}
  </a-space>
</template>

<script>
import qs from "qs";
export default {
  props: {
    postId: Number,
  },
  data() {
    return {
      reviewsCount: 0,
      note: 0,
    };
  },

  async fetch() {
    const query = qs.stringify({
      filters: {
        post: this.postId,
      },
    });

    const res = await this.$axios.get("/reviews?" + query);
    this.reviewsCount = res.data.data.length;
    const total = res.data.data.reduce(
      (total, el) => total + el.attributes.note,
      0
    );

    this.note = Math.round((total * 1.0) / this.reviewsCount);
  },

  methods: {
    async handleChange(value) {
      const query = qs.stringify({
        filters: {
          post: this.postId,
          user: this.$auth.user.id,
        },
      });

      const res = await this.$axios.get("/reviews?" + query);
      const reviewId = res.data.data.length > 0 ? res.data.data[0].id : null;

      const data = {
        user: this.$auth.user.id,
        post: this.postId,
        note: value,
      };

      if (reviewId) {
        await this.$axios.put(`/reviews/${reviewId}`, { data });
      } else {
        await this.$axios.post("/reviews", { data });
      }

      this.$fetch();
    },
  },
};
</script>