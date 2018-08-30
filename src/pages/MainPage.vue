<template>
    <div>
        <el-container>
            <el-aside style="max-width:200px;width:auto;">
                <SideBar></SideBar>
            </el-aside>
            <el-container style="height: 100vh;">
                <el-header class="middle-items">
                    <Header></Header>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer>footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Header from "~/components/common/Header";
    import SideBar from "~/components/common/SideBar";
    export default {
        name: "MainPage",
        components: {SideBar, Header}
    }
</script>

<style scoped>
    .middle-items{
        display:-webkit-flex;
        align-items: center;
    }
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 60px;
    }

    .el-main {
        background-color: #E9EEF3;
        color: #333;
        text-align: center;
        /*line-height: 160px;*/
    }

    body > .el-container {
        margin-bottom: 40px;
    }


</style>