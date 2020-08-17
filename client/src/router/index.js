import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/signin',
    name: 'Signin',
    component: () => import('@/views/Signin.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('@/views/Signup.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/user/create',
    name: 'UserCreate',
    component: () => import('@/views/user/Create.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user/:user_id',
    name: 'UserShow',
    component: () => import('@/views/user/Show.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if(requiresAuth && !store.getters.isAuthenticated) {
    // Send user to login if is not authenticated
    next({ path: '/signin' })
  } else if(!requiresAuth && store.getters.isAuthenticated) {
    // Send user to home if is authenticated
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
