import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/UsersView.vue'),
    },
    { 
      path: '/createUsers',
      name: 'createUsers',
      component: () => import('../views/CreateUsersView.vue'),
    },
    {
      path: '/updateUsers/:id',
      name: 'updateUsers',
      component: () => import('../views/UpdateUsersView.vue'),
    },
  ],
})

export default router
