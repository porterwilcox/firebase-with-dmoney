<template>
    <div class="create-post justify-content-center row mb-3">
        <em class="col-12" @click="create = !create">{{create ? 'Discard' : 'Create new'}}</em>
        <form v-if="create" class="col-12 col-md-4" @submit.prevent="newPost()">
            <div class="form-group">
                <label for="title">Title</label><input required type="text" class="w-100" v-model="post.title">
                </div>
            <div class="form-group">
                <label for="content">Content</label><textarea required type="text" class="w-100" v-model="post.content"></textarea>
                </div>
            <div class="col-12 d-flex justify-content-center"><button class="btn btn-outline-info btn-warning">submit</button></div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'create-post',
    data() {
        return {
            create: false,
            post: {
                title: '',
                content: ''
            }
        }
    },
    methods: {
        newPost() {
            if (!this.post.title || !this.post.content) return
            this.post["author"] = this.$store.getters.AuthorCreds
            this.$store.dispatch('newPost', this.post)
            this.post = {
                title: '',
                content: ''
            },
            this.create = false
        }
    }
}
</script>
