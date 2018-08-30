<template>
    <el-row type="flex" class="row-bg middle-items" style="width: 100%;">
        <el-button v-on:click="toggleNav" type="info" v-bind:icon="toggleButtonClassWithState()"
                   circle></el-button>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left:20px;flex:1;">
            <el-breadcrumb-item>
                <slot name="firstBreadCrumb">面包屑1</slot>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <slot name="secondBreadCrumb">面包屑2</slot>
            </el-breadcrumb-item>
            <el-breadcrumb-item>
                <slot name="thirdBreadCrumb">面包屑3</slot>
            </el-breadcrumb-item>
        </el-breadcrumb>
    </el-row>
</template>

<script>
    export default {
        name: "Header",
        props:{
            username:String,
        },
        data() {
            return {

            }
        },
        methods: {
            toggleButtonClassWithState() {
                if (this.$store.state.isSidebarCollapsed) {
                    return "el-icon-d-arrow-right";
                } else {
                    return "el-icon-d-arrow-left";
                }
            },
            toggleNav() {
                this.$store.commit("toggleSidebarCollapsed");
                console.log("toggleSidebarCollapsed:" + this.$store.state.isSidebarCollapsed);
            },
        }
    }
</script>

<style scoped>
    .middle-items{
        display:-webkit-flex;
        align-items: center;
    }
</style>