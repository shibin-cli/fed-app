import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('@/layout/index.vue'),
    children: [{
      path: '/',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
      meta: { requiresAuth: true }
    }, {
      path: '/advert',
      name: 'Advert',
      component: () => import('@/views/advert/index.vue'),
      meta: { requiresAuth: true }
    }, {
      path: '/course',
      name: 'Course',
      component: () => import('@/views/course/index.vue'),
      meta: { requiresAuth: true }
    }, {
      path: '/role',
      name: 'Role',
      component: () => import('@/views/role/index.vue'),
      meta: { requiresAuth: true }
    }, {
      path: '/menu',
      name: 'Menu',
      component: () => import('@/views/menu/index.vue'),
      meta: { requiresAuth: true }
    }, {
      path: '/user',
      name: 'User',
      component: () => import('@/views/user/index.vue'),
      meta: { requiresAuth: true }
    }, {
      path: '/resourse',
      name: 'Resource',
      component: () => import('@/views/resource/index.vue'),
      meta: { requiresAuth: true }
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

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.user) {
      next({
        name: 'Login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
