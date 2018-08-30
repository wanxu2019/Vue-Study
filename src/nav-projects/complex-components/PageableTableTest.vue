<template>
    <div>
        <div>
            前端分页表格示例
        </div>
        <pageable-table
            ref="frontend_table"
            :cols="frontendDataCols"
            :tableData="tableData"
        >
            <!--自定义需要特殊展示的列数据-->
            <template slot-scope="scope">
                <!--通过scope.row可获得当前行所有数据-->
                <!--通过scope.prop可获得当前列的prop-->
                <!--通过scope.index可获得当前行的index-->

                <!--自定义状态展示-->
                <div v-if="scope.prop==='state'" class="name-wrapper">
                    <el-tag size="medium" type="success" v-if="scope.row[scope.prop]%2===0">偶数</el-tag>
                    <el-tag size="medium" type="danger" v-else>奇数</el-tag>
                </div>
                <!--自定义操作按钮-->
                <div v-else-if="scope.prop==='op'">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.index, scope.row,scope.prop)">删除
                    </el-button>
                </div>
                <!--默认直接展示数据-->
                <span v-else>{{ scope.row[scope.prop] }}</span>
            </template>
        </pageable-table>

        <div>
            后端分页表格示例
        </div>
        <pageable-table
            ref="backend_table"
            pg-layout="total,sizes, prev, pager,next"
            :pg-small="true"
            :page-size="6"
            :page-sizes="[6,13,20,31]"
            :backend-paging="true"
            data-url="api"
            data-count-url="api"
            offset-key="offset"
            limit-key="limit"
            order-by-key="orderby"
            order-key="order"
            :data-formatter="dataFormatter"
            :data-count-formatter="dataCountFormatter"
            :extra-data-makeup="extraDataMakeup"
            :cols="backendDataCols"
        >
        </pageable-table>
    </div>
</template>

<script>
    import PageableTable from "~/components/PageableTable";
    export default {
        name: "PageableTableTest",
        components: { PageableTable},
        data(){
            return {
                backendDataCols:[
                    {
                        prop:"data1",
                        label:"数据1"
                    },
                    {
                        prop:"data2",
                        label:"数据2"
                    },
                    {
                        prop:"data3",
                        label:"数据3"
                    },
                ],
                frontendDataCols:[
                    {
                        prop:"data1",
                        label:"数据1"
                    },
                    {
                        prop:"data2",
                        label:"数据2"
                    },
                    {
                        prop:"data3",
                        label:"数据3"
                    },
                    {
                        prop:"state",
                        label:"状态"
                    },
                    {
                        prop:"op",
                        label:"操作"
                    },
                ],
                tableData:[
                    {
                        data1:"名称1",
                        data2:"未通过",
                        data3:100,
                        state:1,
                    },
                    {
                        data1:"名称2",
                        data2:"通过",
                        data3:100,
                        state:2,
                    },
                ]
            }
        },
        methods:{
            //请求得到分页数据后对后端原始数据进行预处理
            dataFormatter(data){
                return data.data.data;
            },
            //请求得到数据总量后对后端原始数据进行预处理
            dataCountFormatter(data){
                return data.data.data.length||100;
            },
            //请求分页数据时需要附加的额外参数
            extraDataMakeup(pageIndex){
                return{
                    "param1":"1111",
                    "param2":"2222",
                }
            },
            getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1) + min);
            },
            //自定义Cell中的相关处理函数
            handleDelete(index, row,prop){
                console.log(index);
                console.log(row);
                console.log(prop);
            }
        },
        created(){
            for(let i=0;i<20;i++){
                this.tableData.push({
                    data1:"名称1",
                    data2:"未通过",
                    data3:100,
                    state:this.getRandomInt(1,3),
                })
            }
            let vm=this;
            setTimeout(()=>{
                vm.$refs['backend_table'].setOrderBy("data3");
                vm.$refs['backend_table'].setOrder("asc");
                vm.$refs['frontend_table'].jumpToPage(3);
                vm.$refs['backend_table'].updateData();
                setTimeout(()=>{
                    vm.$refs['frontend_table'].jumpToPage(-1);
                    vm.$refs['backend_table'].updateData();
                    vm.$refs['backend_table'].jumpToPage(5);
                },3000);
            },3000);
        }
    }
</script>

<style scoped>

</style>