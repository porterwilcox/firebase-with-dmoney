<template>
    <div class="post text-center mb-1">
        <h4>{{p.title}}</h4>
        <p>{{p.content}}</p>
    </div>
</template>

<script>
export default {
    name: 'post',
    props: ['p']
}
</script>

<style scoped>
.post {
    box-shadow: 0 2px 5px #5b5b5b;
}
</style>
