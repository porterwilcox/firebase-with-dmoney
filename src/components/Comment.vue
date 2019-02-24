<template>
  <div class="comment row">
    <em class="col-12" @click="create = !create">{{create ? 'Discard' : 'comment'}}</em>
    <form v-if="create" class="col-12 col-md-4 offset-md-4" @submit.prevent="newComment()">
      <div class="form-group">
        <label for="title">Title</label>
        <input required type="text" class="w-100" v-model="comment.body">
      </div>
      <div class="col-12 d-flex justify-content-center">
        <button class="btn btn-outline-info btn-warning">submit</button>
      </div>
    </form>
    <div v-if="comments.length" v-for="c in comments" class="col-12 d-flex align-items-end">
        <h3>{{c.author.displayName}}:</h3>
        <h4>{{c.body}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  props: [],
  data() {
    return {
      create: false,
      comment: {
        body: ""
      }
    };
  },
  computed: {
      comments() {
          return this.$store.state.comments
      }
  },
  methods: {
    newComment() {
      if (!this.comment.body) return
      this.comment["author"] = this.$store.getters.AuthorCreds
      this.$store.dispatch('addComment', {postId: this.$route.params.pId, comment: this.comment})
      this.comment = {
          body: ""
      }
      this.create = false
    }
  },
  components: {}
};
</script>