<template>
  <div>
    <a-card hoverable size="small">
      <a-badge
        :count="`${post.price} ${post.currency}`"
        style="position: absolute; top: 6px; left: 5px"
      >
      </a-badge>

      <img
        slot="cover"
        :src="post.images[0]"
        height="150px"
        style="object-fit: cover"
        @click="modalVisible = true"
      />

      <a-card-meta>
        <template slot="title">
          {{ post.name }}
        </template>

        <PostReview slot="description" :postId="post.id" />
      </a-card-meta>

      <template v-if="editEnable" slot="actions" class="ant-card-actions">
        <a-icon
          key="edit"
          type="edit"
          @click="$router.push(`/post/${post.id}/update`)"
        />
        <a-popconfirm
          title="Are you sure delete this post?"
          ok-text="Yes"
          cancel-text="No"
          @confirm="handleDelete()"
        >
          <a-icon key="delete" type="delete" />
        </a-popconfirm>
      </template>
    </a-card>

    <a-modal
      v-model="modalVisible"
      :dialog-style="{ top: '20px' }"
      :title="post.name"
      okText="View Author"
      @ok="handleViewAuthor"
    >
      <Carousel :images="post.images" />

      <br />
      <strong>Description</strong>
      <i style="float: right">
        {{ $dayjs().to($dayjs(post.createdAt)) }}
      </i>
      <p>{{ post.description }}</p>
    </a-modal>
  </div>
</template>

<script>
import Carousel from "../Carousel.vue";
import qs from "qs";
export default {
  components: { Carousel },

  name: "Post",

  props: {
    post: {
      type: Object,
      required: true,
    },
    editEnable: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      modalVisible: false,
    };
  },

  methods: {
    async handleDelete() {
      try {
        await this.$axios.delete(`/posts/${this.post.id}`);
        this.$emit("onDelete");
      } catch (err) {}
    },

    async handleViewAuthor() {
      const query = qs.stringify({
        filters: {
          posts: {
            id: this.post.id,
          },
        },
      });
      const res = await this.$axios.get("/users?" + query);

      const userId = res.data[0].id;

      this.$router.push("/user/" + userId);
    },
  },
};
</script>

