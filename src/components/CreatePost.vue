<template>
    <div class="create-post row">
        <form>
            <div class="form-group">
                <label for="title">Title</label><input type="text" v-model="post.title">
                </div>
            <div class="form-group">
                <label for="content">Title</label><textarea type="text" v-model="post.title"></textarea>
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
            post: {
                title: '',
                content: ''
            }
        }
    }
}
</script>
