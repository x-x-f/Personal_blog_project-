<template>
    <div class="footer">
        <a>备案号：</a>
        <a href="https://beian.miit.gov.cn/" class="record">赣ICP备2022009202号</a>
        <p>Blog ©2022 Created xxfCloud</p>
    </div>
</template>
<script>
export default {
    name: 'Footer'
}
</script>
<style scoped>
.footer {
    width: 100%;
    padding: 40px 0 5px 0;
    text-align: center;
    background: rgb(207, 228, 236);
}

.record:hover {
    color: white;
}

p {
    margin-top: 10px;
}
</style>