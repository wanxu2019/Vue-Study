<template>
    <div>
        <el-table :data="currentTableData"
                  :default-sort="defaultSort"
                  :border="true"
                  :header-cell-style="getHeaderCellStyle"
                  style="width: 100%;border-radius:5px;">
            <el-table-column
                    sortable
                    :prop="col.prop"
                    v-for="col in cols"
                    :label="col.label">
                <template slot-scope="scope">
                    <slot v-bind:row="scope.row" v-bind:prop="col.prop" v-bind:index="scope.$index">
                        {{scope.row[col.prop]}}
                    </slot>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                :small="pgSmall||false"
                :page-sizes="pageSizes||[5,10, 20, 50]"
                :layout="pgLayout||'total,sizes, prev, pager, next,jumper'"
                :page-size="innerPageSize"
                :current-page="pageIndex"
                :total="tableDataCount"
                @size-change="handleSizeChange"
                @current-change="handleIndexChange"
        >
        </el-pagination>
    </div>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "PageableTable",
        props: {
            //从el-table继承的属性
            //自定义的属性
            //是否采用后端分页
            backendPaging: Boolean,
            //后端分页属性
            //后端数据地址
            dataUrl: String,
            //数据总量地址
            dataCountUrl: String,
            //排序列
            orderByKey: String,
            //排序顺序
            orderKey: String,
            //数据起始点
            offsetKey: String,
            //一次取得的数据量
            limitKey: String,
            //请求时需要附加的额外数据
            extraDataMakeup:Function,
            //对接口数据返回的数据重新预处理
            dataFormatter: Function,
            //对接口返回的数据总量重新预处理
            dataCountFormatter: Function,
            //定义列的key与标签
            cols: Array,
            //数据
            tableData: Array,
            headerCellStyle: Function,
            //分页属性
            pgSmall: Boolean,
            pageSize: Number,
            pageSizes: Array,
            pgLayout: String,
        },
        watch: {
            tableData(newData, oldData) {
                //若前端分页，数据改变，则重新加载数据，跳转至第一页
                if (!this.backendPaging) {
                    this.pageIndex = 1;
                    this.allTableData = this.tableData;
                    this.tableDataCount = this.tableData.length;
                    this.fetch();
                }
            }
        },
        data() {
            return {
                defaultSort: {
                    prop: "buildCount",
                    order: "descending"
                },
                allTableData: [],
                currentTableData: [],
                tableDataCount: 100,
                pageIndex: 1,
                innerPageSize: this.pageSizes && this.pageSizes.length > 0 ? this.pageSizes[0] : 5,
                orderByValue: "none",
                orderValue: "none"
            }
        },
        computed: {
            realOrderByKey() {
                return this.orderByKey || 'orderby';
            },
            realOrderKey() {
                return this.orderKey || 'order';
            },
            realOffsetKey() {
                return this.offsetKey || 'offset';
            },
            realLimitKey() {
                return this.limitKey || 'limit';
            },
            realDataUrl() {
                let url = this.dataUrl;
                let index = url.length - 1;
                while (index >= 0 && url[index] === "/") {
                    index--;
                }
                return url.substring(0, index + 1);
            },
            realDataFormatter() {
                return this.dataFormatter || ((data) => {
                    return data
                });
            },
            realDataCountFormatter() {
                return this.dataCountFormatter || ((data) => {
                    return data
                });
            },
            getHeaderCellStyle: {
                get() {
                    if (this.headerCellStyle) {
                        return this.headerCellStyle;
                    } else {
                        return this.defaultHeaderCellStyle;
                    }
                }
            },
        },
        methods: {
            //设置获取分页数据时的排序依据列
            setOrderBy(orderby){
                this.orderByValue=orderby;
            },
            //设置获取分页数据时的顺序
            setOrder(order){
                this.orderValue=order;
            },
            //用于后端数据变化后及时刷新表格
            updateData(){
                this.pageIndex=1;
                this.fetch();
            },
            jumpToPage(pageIndex){
                let maxPageIndex=this.tableDataCount/this.pageSize;
                if(pageIndex>maxPageIndex)
                    pageIndex=Math.ceil(maxPageIndex);
                if(pageIndex<1)
                    pageIndex=1
                this.pageIndex=pageIndex;
                this.fetch();
            },
            //表头默认样式
            defaultHeaderCellStyle({row, column, rowIndex, columnIndex}) {
                return {
                    textAlign: "center",
                }
            },
            //每页展示数量变化
            //处理：跳转至首页
            handleSizeChange(size) {
                this.innerPageSize = size;
                this.pageIndex = 1;
                this.fetch(this.pageIndex, size);
            },
            //页码变化
            //处理：加载相应的数据
            handleIndexChange: function (index) {
                this.pageIndex = index;
                this.fetch(index, this.innerPageSize);
            }, fetch(index = this.pageIndex, size = this.innerPageSize) {
                if (this.backendPaging) {
                    //后端分页：当前页数据应当实时获取
                    //构造url
                    let offsetValue = size * (index - 1);
                    //后台数据地址
                    let url = this.realDataUrl + "?"
                        //起始点
                        + this.realOffsetKey + "=" + offsetValue + "&"
                        //要获取的数据量
                        + this.realLimitKey + "=" + size + "&"
                        //数据排序依据
                        + this.realOrderByKey + "=" + this.orderByValue + "&"
                        //数据升序/降序还是无序
                        + this.realOrderKey + "=" + this.orderValue + "&";
                    //附加额外的数据
                    let extraParamsString="";
                    if(this.extraDataMakeup){
                        let extraData=this.extraDataMakeup(index);
                        for(let key of Object.keys(extraData)){
                            extraParamsString+=key+"="+extraData[key]+"&"
                        }
                    }
                    url+=extraParamsString;
                    console.log("get data from:" + url);
                    let vm = this;
                    axios.get(url).then(function (data) {
                        // console.log("从后台获取的原始数据：");
                        // console.log(data);
                        //通过用户指定的前置函数预处理数据后渲染到表格
                        let formattedData = vm.realDataFormatter(data);
                        // console.log("经用户函数预处理后的数据：");
                        // console.log(formattedData);
                        //后端分页情况下若获取的数据多于pagesize则截断，只取前面的
                        formattedData = formattedData.slice(0, size);
                        vm.currentTableData = formattedData;
                    });
                    axios.get(this.dataCountUrl+"?"+extraParamsString).then(function (data) {
                        //预处理数据总量响应结果
                        vm.tableDataCount = vm.realDataCountFormatter(data);
                    });
                } else {
                    //前端分页：当前页数据直接从所有数据中切割即可
                    this.currentTableData = this.allTableData.slice((index - 1) * size, index * size);
                }
            },
        },
        created() {
            if (!this.backendPaging) {
                this.allTableData = this.tableData;
                this.tableDataCount = this.tableData.length;
            }
            if (this.pageSize) {
                this.innerPageSize = this.pageSize;
            }
            this.fetch();
        }
    }
</script>

<style scoped>

</style>