<template>
    <div class="post clickable text-center mb-1" @click="$router.push({name: 'post', params: {pId: p.id}})">
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
    box-shadow: 0 1px 1px #5b5b5b;
    transition: all .25s ease;
    padding: 0
}
.post:hover {
    padding: 10px 0 1px;
    box-shadow: 0 2px 5px #5b5b5b;
}
</style>
