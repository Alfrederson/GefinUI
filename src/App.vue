<script setup>

import { RouterView, RouterLink } from 'vue-router'
import router from './router'
import Logo from './components/Logo.vue'
import { useUserStore } from './stores/user'
import { useRoute } from "vue-router"

const user = useUserStore()
const route = useRoute()

// seria interessante colocar isso em um arquivo definindo várias coisas de ambito global.
const opcoes = [
  {link :"/resumo", nome : "Resumo"},
  {link: "/despesas", nome : "Despesas"},
  {link: "/receitas", nome : "Receitas"}
]
function navegar(url){
  console.log("Navegando para "+url)
  router.push({path : url})
}
</script>

<style>
  @import "https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/minty/bootstrap.min.css";
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-fade-enter-active {
    transition: all 0.1s ease-out;
  }
  .slide-fade-leave-active {
    transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: rotate3d(0, 1, 0, 35deg);
    opacity: 0;
  }
</style>

<template>
  <header class="page-header">
    <Logo/>
    <div class="container">
        <div class="navbar">
          <h1>{{this.user.titulo}}</h1>
          <span v-if="user.nome">Olá, {{user.nome}}! <a href="#" @click="user.logout()">(fazer logout)</a></span>
        </div>
        <div class="navbar">
        </div>        
    </div>

    <div class="container">
      <div v-if="user.nome">

        <nav class="navbar">
          <div class="container">
            <ul class="nav">
              <li class="nav-item" v-for="opcao in opcoes">
                <a class="nav-link" href="#" @click="navegar(opcao.link)">{{opcao.nome}} </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </header>
  <div class="container-fluid">
    <RouterView />
  </div>
</template>
