import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Table from '../views/Table.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/tables',
    name: 'Table',
    component: Table
    // children: [{
    //   path: ':id/',
    //   component: Table,
    //   props: {
    //     titleTable: 'id',
    //   },
    // }],
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
