import Vue from 'vue'
import VueRouter from 'vue-router'
import recommend from '../views/recommend.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect:"/login"
  },
  {
    path:"/login",
    name:"login",
    meta:{
      headerflag:true
    },
    component:() => import('../components/base/login.vue')
  },


  
  {
    path:"/userInfo",
    name:"userInfo",
    meta:{
      headerflag:true
    },
    component:() => import('../components/userInfo/index.vue'),
    // 独享路由守卫
    beforeEnter: (to, from, next) => {
      // let login = store.state.login || window.localStorage.getItem("login");
      let login = store.state.login;

        // 判断登录情况
        if(!login){
          next("/login");
          return;
        }else{
          next();
        }

      }
  },


  {
    path:"/recommend",
    name:"recommend",
    component:recommend,
  },
  {
    path:"/recommend/musiclist",
    meta:{
      headerflag:true
    },
    component:() => import('../components/recommend/musiclist.vue')
  },
  {
    path:"/singer",
    name:"singer",
    component:() => import('../views/singer.vue')
  },
  {
    path:"/singer/singerlist",
    meta:{
      headerflag:true
    },
    component:() => import('../components/singer/singerlist.vue')
  },
  {
    path:"/rank",
    name:"rank",
    component:() => import('../views/rank.vue')
  },
  {
    path:"/rank/ranklist",
    meta:{
      headerflag:true
    },
    component:() => import('../components/rank/ranklist.vue')
  },
  {
    path:"/newmv",
    name:"newmv",
    component:() => import('../views/newmv.vue')
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// router.beforeEach((to, from, next) => {
//   console.log(to.path);
//   console.log(from.path);
//   console.log(store.state.login)
//   let login = store.state.login || window.localStorage.getItem("login");

//   // 登录界面`
//   if(to.path == "/login"){
//     next();
//     return;
//   }else{
//     // 判断登录情况
//     if(!login){
//       next("/login");
//       return;
//     }else{
//       next();
//     }

//   }

// })

export default router
