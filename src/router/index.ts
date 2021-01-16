import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: () => import('@/layout/index.vue'),
    children: [{
      path: '/',
      name: 'Home',
      component: () => import('@/views/course/index.vue'),
      meta: { requiresAuth: true, title: '课程管理' }
    }, {
      path: '/course',
      name: 'Course',
      component: () => import('@/views/course/index.vue'),
      meta: { requiresAuth: true, title: '课程管理' }
    }, {
      path: '/course/create',
      name: 'CreateCourse',
      component: () => import('@/views/course/create.vue'),
      meta: { requiresAuth: true }
    }, {
      path: '/course/:courseId/edit',
      name: 'CourseEdit',
      component: () => import('@/views/course/edit.vue'),
      props: true,
      meta: { requiresAuth: true, title: '课程编辑' }
    }, {
      path: '/course/:courseId/section',
      name: 'CourseSection',
      component: () => import('@/views/course/section.vue'),
      props: true,
      meta: { requiresAuth: true, title: '内容管理' }
    }, {
      path: '/course/:courseId/uploadVideo',
      name: 'UploadVideo',
      component: () => import('@/views/course/upload-video.vue'),
      props: true,
      meta: { requiresAuth: true, title: '上传视频' }
    }, {
      path: '/role',
      name: 'Role',
      component: () => import('@/views/role/index.vue'),
      meta: { requiresAuth: true, title: '角色管理' }
    }, {
      path: '/role/:roleId/alloc-menu',
      name: 'AllocMenu',
      component: () => import('@/views/role/alloc-menu.vue'),
      props: true,
      meta: { requiresAuth: true, title: '分配菜单' }
    }, {
      path: '/role/:roleId/alloc-resource',
      name: 'AllocResource',
      component: () => import('@/views/role/alloc-resource.vue'),
      props: true,
      meta: { requiresAuth: true, title: '分配菜单' }
    }, {
      path: '/menu',
      name: 'Menu',
      component: () => import('@/views/menu/index.vue'),
      meta: { requiresAuth: true, title: '菜单管理' }
    }, {
      path: '/menu/create',
      name: 'MenuCreate',
      component: () => import('@/views/menu/create.vue'),
      meta: { requiresAuth: true, title: '创建菜单' }
    }, {
      path: '/menu/:courseId/edit',
      name: 'MenuEdit',
      component: () => import('@/views/menu/edit.vue'),
      props: true,
      meta: { requiresAuth: true, title: '编辑菜单' }
    }, {
      path: '/user',
      name: 'User',
      component: () => import('@/views/user/index.vue'),
      meta: { requiresAuth: true, title: '用户管理' }
    }, {
      path: '/resourse',
      name: 'Resource',
      component: () => import('@/views/resource/index.vue'),
      meta: { requiresAuth: true, title: '资源管理' }
    }, {
      path: '/advert',
      name: 'Advert',
      component: () => import('@/views/advert/index.vue'),
      meta: { requiresAuth: true, title: '广告列表' }
    }, {
      path: '/advert/:id/edit',
      name: 'AdvertEdit',
      component: () => import('@/views/advert/edit.vue'),
      meta: { requiresAuth: true, title: '编辑广告' },
      props: true
    }, {
      path: '/advert/create',
      name: 'AdvertCreate',
      component: () => import('@/views/advert/create.vue'),
      meta: { requiresAuth: true, title: '新增广告' }
    }, {
      path: '/advert/space',
      name: 'AdvertSpace',
      component: () => import('@/views/advert/space.vue'),
      meta: { requiresAuth: true, title: '广告位列表' }
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
