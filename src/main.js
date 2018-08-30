import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import WelcomePage from './pages/WelcomePage'
import MainPage from './pages/MainPage'
import ComplexComponentsContainer from './nav-projects/ComplexComponentsContainer'
import PageableTableTest from './nav-projects/complex-components/PageableTableTest'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(VueAxios, axios);
//设置axios跨域带cookie
axios.defaults.withCredentials = true;


//指定主路由
const routes = [
    {
        path: '/', component: WelcomePage,
    },
    {
        path: '/welcome', component: WelcomePage
    },
    {
        path: '/main', component: MainPage,
        children:[
            {
                path:'/ComplexComponents',
                component:ComplexComponentsContainer,
                children:[
                    {
                        path:'PageableTableTest',
                        component:PageableTableTest
                    }
                ]
            }
        ]
    },
];
const router = new VueRouter({
    routes: routes
});
//全局状态管理
const store = new Vuex.Store({
    state: {
        //导航栏是否收起
        isSidebarCollapsed: false,
        //导航栏激活态
        defaultActive:"1-1",
        //面包屑数据
        firstBreadCrumb:"面包屑1",
        secondBreadCrumb:"面包屑2",
        thirdBreadCrumb:"面包屑3",
    },
    mutations: {
        //切换sidebar折叠状态
        toggleSidebarCollapsed(state) {
            state.isSidebarCollapsed = !state.isSidebarCollapsed;
        },
    }
});
//事件总线
let EventHub = new Vue(); //创建事件中心,注意Hub要放在全局
Vue.prototype.EventHub=EventHub;

const app = new Vue({
    store,
    router,
}).$mount('#app');
