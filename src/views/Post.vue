<template>
  <div class="post container-fluid h-90">
    <div class="row">
      <div class="col-12 col-md-10 offset-md-1">
        <div class="card bg-info text-white">
            <div class="card-header py-3 text-dark d-flex justify-content-between align-items-end">
                <h2 @blur="updatePost($event, 'title')" spellcheck="false" :contenteditable="$store.getters.IsAuthor(post.author.uId)">{{post.title}}</h2>
                <h5>-{{post.author.displayName.toLowerCase()}}</h5>
            </div>
            <div class="card-body row">
            <div class="mx-5">
              <p @blur="updatePost($event, 'content')" spellcheck="false" :contenteditable="$store.getters.IsAuthor(post.author.uId)">{{post.content}}</p>
            </div>
            <hr>
            <comment class="col-12"></comment>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from '@/components/Comment.vue'
export default {
  name: "post",
  mounted() {
    this.$store.dispatch('getComments', this.post.id)
  },
  props: [],
  data() {
    return {}
  },
  computed: {
    post() {
      return this.$store.state.posts.find(p => p.id == this.$route.params.pId);
    },
    userId() {
      return this.$store.state.user.uid
    }
  },
  methods: {
    updatePost(e, prop) {
      this.post[prop] = e.target.textContent
      this.$store.dispatch('updatePost', this.post)
    }
  },
  components: {
    Comment
  }
};
</script>

<style scoped>
[contenteditable="true"]:focus {
    border: none;
    border-bottom: 1px solid white;
    color: black;
    outline: none;
}
</style>
