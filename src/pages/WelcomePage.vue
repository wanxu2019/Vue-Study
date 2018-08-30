<template>
    <div id="welcome-page">
        <img src="./../assets/logo.png">
        <div>
            <el-button @click="startHacking">开启Vue学习之旅</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WelcomePage",
        methods:{
            startHacking(){
                //跳转至MainPage
                this.$router.push('/main');
            }
        }
    }
</script>

<style scoped>
    #welcome-page {
        font-family: Helvetica, sans-serif;
        text-align: center;
    }
</style>