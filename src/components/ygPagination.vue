<template type="text/template" id="template_pagination">
  <section class="pages-wrap" v-show="pageInfo.total>pageInfo.pagenum">
    <ul class="pagination clearfix">
      <li class="pagination__show">共{{pageInfo.total}}条</li>
      <li :class="{'disabled': pageInfo.current == 1}"><a href="javascript:;" @click="clickCurrent(1)"> 首页 </a></li>
      <span :class="{'disabled': pageInfo.current == 1}"><span href="javascript:;"
                                                               class="pagination__icon yungan yg-arrow-right"
                                                               @click="clickCurrent(pageInfo.current - 1)"> </span></span>
      <li v-for="p in setList" :key="p" :class="{'active': pageInfo.current == p.val}">
        <a href="javascript:;" v-if="pageInfo.current == p.val"
           :style="{backgroundColor:pageInfo.skin , borderColor:pageInfo.skin}" @click="clickCurrent(p.val)"> {{ p.text
          }} </a>
        <a href="javascript:;" v-else @click="clickCurrent(p.val)"> {{ p.text }} </a>
      </li>
      <li :class="{'disabled': pageInfo.current == pageInfo.page}"><span href="javascript:;"
                                                                         class="pagination__icon yungan yg-arrow-left"
                                                                         @click="clickCurrent(pageInfo.current + 1)"></span>
      </li>
      <li :class="{'disabled': pageInfo.current == pageInfo.page}"><a href="javascript:;"
      @click="clickCurrent(pageInfo.page)"> 尾页 </a></li>
    </ul>
  </section>
</template>
<script>
import Vue from 'vue'
export default {
    name: 'ygPagination',
    props: ['pageInfo'],
    computed: {
        page: function () {
            return Math.ceil(this.pageInfo.total / this.pageInfo.pagenum)
        },
        setList: function () {
            var len = this.page
            var temp = []
            var list = []
            var count = Math.floor(this.pageInfo.pagegroup / 2)
            var center = this.pageInfo.current
            if (len <= this.pageInfo.pagegroup) {
                while (len--) {
                    temp.push({text: this.page - len, val: this.page - len})
                }
                return temp
            }
            while (len--) {
                temp.push(this.page - len)
            }
            var idx = temp.indexOf(center)
            if (idx < count) {
                center = center + count - idx
            }
            if (this.pageInfo.current > this.page - count) {
                center = this.page - count
            }
            temp = temp.splice(center - count - 1, this.pageInfo.pagegroup)
            do {
                var t = temp.shift()
                list.push({
                    text: t,
                    val: t
                })
            } while (temp.length)
            if (this.page > this.pageInfo.pagegroup) {
                if (this.pageInfo.current > count + 1) {
                    list.unshift({text: '...', val: list[0].val - 1})
                }
                if (this.pageInfo.current < this.page - count) {
                    list.push({text: '...', val: list[list.length - 1].val + 1})
                }
            }
            return list
        }
    },
    created: function (argument) {
    },
    methods: {
        clickCurrent: function (idx) {
            if (this.pageInfo.current !== idx && idx > 0 && idx < this.page + 1) {
                this.pageInfo.current = idx
                this.$emit('change', this.pageInfo.current)
            }
        }
    }
}
</script>
<style scoped lang="scss">
  .clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden
  }

  * {
    font-family: "Helvetica Neue", Helvetica, "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  #template_pagination {
    margin-bottom: 50px;
    /*font-family: "Microsoft Himalaya";*/
  }

  .pages-wrap {
    text-align: right;
    /*margin-top: 20px;*/
    margin-right: 100px;
  }

  .pagination {
    display: inline-block;
    padding-left: 0;
    margin: 20px 0;
    border-radius: 4px;
  }

  .pagination > li {
    display: inline;
  }

  .pagination > .active > a, .pagination > .active > a:hover, .pagination > .active > span, .pagination > .active > span:hover {
    z-index: 3;
    color: #fff;
    cursor: default;
    background-color: green;
    border-color: green;
  }

  .pagination > .disabled > a, .pagination > .disabled > a:hover, .pagination > .disabled > span, .pagination > .disabled > span:hover {
    color: gray;
    cursor: not-allowed;
    background-color: #fff;
    border-color: #ddd;
  }

  .pagination > li > a:hover, .pagination > li > span:hover {
    z-index: 2;
    color: rgba(0, 0, 0, 0.5);
    background-color: #e1f3d8;
    border-color: #ddd;
  }

  .pagination > li > a {
    position: relative;
    float: left;
    padding: 3px 12px;
    line-height: 1.42857143;
    color: #000;
    text-decoration: none;
    background-color: #fff;
    /*border: 1px solid #ddd;*/
  }

  .pagination__show {
    position: relative;
    float: left;
    padding: 3px 12px;
    line-height: 1.42857143;
  }

  .pagination__icon {
    position: relative;
    float: left;
    padding: 3px 6px;
    line-height: 1.42857143;
    color: white;
    background-color: green;
    cursor: pointer;
  }
</style>
