import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    children: [{
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/index.vue')
    }, {
      path: '/advert',
      name: 'Advert',
      component: () => import('@/views/advert/index.vue')
    }, {
      path: '/course',
      name: 'Course',
      component: () => import('@/views/course/index.vue')
    }, {
      path: '/role',
      name: 'Role',
      component: () => import('@/views/role/index.vue')
    }, {
      path: '/menu',
      name: 'Menu',
      component: () => import('@/views/menu/index.vue')
    }, {
      path: '/user',
      name: 'User',
      component: () => import('@/views/user/index.vue')
    }, {
      path: '/resourse',
      name: 'Resource',
      component: () => import('@/views/resource/index.vue')
    }]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  }, {
    path: '*',
    name: '404',
    component: () => import('@/views/error/404.vue')
  }]

const router = new VueRouter({
  routes
})

export default router
