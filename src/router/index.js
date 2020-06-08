import Vue from 'vue'
import Router from 'vue-router'
import home from '@/views/Home/home'
import login from '@/views/Login/login'
import index from '@/views/Index/index'
import user from '@/views/User/user'

import messageManagement from '@/views/MessageManagement/index'
import comment from '@/views/MessageManagement/comment'
import reply from '@/views/MessageManagement/reply'

import itemManagement from '@/views/ItemManagement/index'
import shelves from '@/views/ItemManagement/shelves'
import soldOut from '@/views/ItemManagement/sold-out'
import pending from '@/views/ItemManagement/pending'



Vue.use(Router)

export default new Router({
  //去掉地址中的哈希#
  mode: 'history',
  routes: [
    {
      path: '/',
      component: login,
      redirect: '/login'
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect:'/home/index',
      children:[
        { path: 'index', name: 'index', component: index},
        { path: 'user', name: 'user', component: user},
        { path: 'messageManagement', name: 'messageManagement', component: messageManagement,children:[
          { path:'comment',name:'comment',component: comment},
          { path:'reply',name:'reply',component: reply},
        ]},
        { path:'itemManagement', name:'itemManagement',component:itemManagement,children:[
          { path: 'shelves', name: 'shelves', component: shelves },
          { path: 'soldOut', name: 'sold-out', component: soldOut },
          { path: 'pending', name: 'pending', component: pending },
        ]}
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
  ]
})
