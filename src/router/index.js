import Vue from 'vue'
import VueRouter from 'vue-router'
import Questionnaire from '../views/Questionnaire.vue'
import Stadistics from '../views/Stadistics.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Questionnaire',
    component: Questionnaire
  },
  {
    path: '/stadistics',
    name: 'Stadistics',
    component: Stadistics
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
