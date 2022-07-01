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

        <template slot="description">
          {{ $dayjs().to($dayjs(post.createdAt)) }}

          <a-space align="end" style="float: right">
            {{ likesCount }}
            <a-rate
              :count="1"
              :value="isLiked * 1"
              @change="toggleLike()"
              :disabled="!$auth.loggedIn"
            >
              <a-icon slot="character" type="like" theme="filled"
            /></a-rate>
          </a-space>
        </template>
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
      <h4>Description</h4>
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

  computed: {
    isLiked() {
      return this.$auth.loggedIn
        ? this.$auth.user.likes.some((el) => el.id === this.post.id)
        : false;
    },
  },

  data() {
    return {
      modalVisible: false,
      likesCount: this.post.likedBy.length,
    };
  },

  methods: {
    async toggleLike() {
      let likes = [];

      if (this.isLiked) {
        for (let el of this.$auth.user.likes) {
          if (el.id !== this.post.id) {
            likes.push(el.id);
          }
        }

        this.likesCount--;
      } else {
        for (let el of this.$auth.user.likes) {
          likes.push(el.id);
        }
        likes.push(this.post.id);

        this.likesCount++;
      }

      await this.$axios.put(`/users/${this.$auth.user.id}`, {
        likes,
      });

      await this.$auth.fetchUser();

      this.modalVisible = false;
    },

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

