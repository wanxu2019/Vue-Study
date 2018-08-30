<template>
    <div>
        <div class="label-title" style="text-align: center;">
            <span>{{title()}}</span>
        </div>

        <el-menu
                ref="menu"
                class="el-menu-vertical-demo"
                :collapse-transition="false"
                :default-active="defaultActive"
                :collapse="isCollapse()"
                @open="handleOpen"
                @close="handleClose"
                @select="handleSelect"
        >
            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>复合组件</span>
                </template>
                <el-menu-item-group>
                    <router-link to="/ComplexComponents/PageableTableTest" class="route-link">
                        <el-menu-item index="1-1">
                            后端分页表格
                        </el-menu-item>
                    </router-link>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">菜单2</span>
                </template>
                <el-menu-item-group>
                    <router-link to="/" class="route-link">
                        <el-menu-item index="2-1">选项1</el-menu-item>
                    </router-link>
                    <router-link to="/" class="route-link">
                        <el-menu-item index="2-2">选项2</el-menu-item>
                    </router-link>
                    <router-link to="/" class="route-link">
                        <el-menu-item index="2-3">选项3</el-menu-item>
                    </router-link>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <i class="el-icon-document"></i>
                    <span slot="title">菜单3</span>
                </template>
                <el-menu-item-group>
                    <router-link to="/" class="route-link">
                        <el-menu-item index="3-1">选项1</el-menu-item>
                    </router-link>
                    <router-link to="/" class="route-link">
                        <el-menu-item index="3-2">选项2</el-menu-item>
                    </router-link>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>


<script>
    export default {
        //定义所使用的子组件
        components: {},
        data() {
            return {
            }
        },
        //计算属性：
        computed:{
                defaultActive(){
                    return this.$store.state.defaultActive;
                },
        },
        //方法
        methods: {
            handleSelect(index){
                //每次选择之后将选择的作为下一次收起展开后的默认值
                this.$store.state.defaultActive=index;
            },
            isCollapse() {
                return this.$store.state.isSidebarCollapsed;
            },
            title() {
                if (this.$store.state.isSidebarCollapsed) {
                    return "菜单";
                } else {
                    return "导航菜单";
                }
            },
            handleOpen(key, keyPath) {
                console.log("SideBar:handleOpen");
                console.log(key, keyPath);
                console.log(this.$refs['menu']);
                console.log(this.$refs);
                console.log(this);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            }
        },
        //侦听属性：观察和响应 Vue 实例上的数据变动
        watch: {},
        //生命周期钩子函数
        beforeCreate: function () {
            console.log("before create:");
        },
        created: function () {
            console.log("created:");
        },
        beforeMount: function () {
            console.log("before mount:");
        },
        mounted: function () {
            console.log("mounted");
        },
        beforeUpdate: function () {
            console.log("before update:");
        },
        updated: function () {
            console.log("updated:");
        },
        beforeDestroy: function () {
            console.log("before destroy:");
        },
        destroyed: function () {
            console.log("destroyed:");
        }
    }
</script>

<style>
    .route-link {
        text-decoration: none;
        color: #303133;
    }

    .route-link:active, .route-link:visited {
        /*color:#409EFF;*/
    }
    .el-menu{
        border:0;
    }
</style>
