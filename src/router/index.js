import { createRouter, createWebHistory } from 'vue-router'
import Onboarding from '../views/Onboarding.vue'
import SignUp from "../views/SignUp.vue"
import SignIn from "../views/SignIn.vue"
import Resumo from "../views/Resumo.vue"

import Receitas from "../views/Receitas.vue"
import Despesas from "../views/Despesas.vue"


const routes = [

  {
    path: '/',
    name: 'home',
    component: Onboarding
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/resumo',
    name: 'resumo',
    component: Resumo
  },
  {
    path: '/receitas',
    name: 'receitas',
    component: Receitas
  },
  {
    path: '/despesas',
    name: 'despesas',
    component: Despesas
  }    

]
// const logged = routes.filter( x => x.logged ).map( x => x.name )

const router = createRouter({
  history: createWebHistory('/'),
  routes: routes
})

export default router
