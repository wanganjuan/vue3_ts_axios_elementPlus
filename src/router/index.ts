import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { store } from '@/store/store'
const Home = () => import(/* webpackChunkName: "layout" */ '../views/Home.vue')
const Layout = () =>
  import(/* webpackChunkName: "Login" */ '@/components/layout/main-layout.vue')
const Login = () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main/home'
  },
  {
    path: '/main',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  // const store = useStore()
  if (to.path === '/login') {
    next()
    return
  }
  if (!store.state.userInfo || !store.state.userInfo.loginName) {
    store.dispatch('initUserInfo', {
      next: () => {
        next(to.fullPath)
      },
      login: () => {
        next('/login')
      }
    })
    return
  }
  next()
})

export default router
