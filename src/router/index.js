import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Callback from '@/components/Callback'
import Graph from '@/components/Graph'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      props: true
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback,
      props: true
    },
    {
      path: '/completeGraph',
      name: 'Graph',
      component: Graph,
      props: true
    },
    {
      path: '/graph/:searchtext',
      name: 'Graph',
      component: Graph,
      props: true
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})

export default router
