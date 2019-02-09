<template>
    <div class="dashboard">
        <h1>Welcome to the dashboard</h1>
    </div>
</template>
<script>
export default {
    name: 'dashboard',
    computed: {
        user() {
            return this.$store.state.user
        }
    }
}
</script>
