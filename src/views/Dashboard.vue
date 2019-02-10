<template>
    <div class="dashboard">
        <h1 class="text-center">Welcome to the dashboard</h1>
        <div class="row justify-content-center">
            <div class="card w-75">
                <h2 class="card-header">posts</h2>
                <div class="card-body h-100">
                    <create-post class="col-12"></create-post>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CreatePost from '@/components/CreatePost.vue'
export default {
    name: 'dashboard',
    computed: {
        user() {
            return this.$store.state.user
        }
    },
    components: {
        CreatePost
    }
}
</script>
