<script setup>

import { RouterView, RouterLink } from 'vue-router'
import router from './router'
import Logo from './components/Logo.vue'
import Modal from './components/Modal.vue'
import { useUserStore } from './stores/user'
import { useModalStore } from "./stores/modal"
import { useRoute } from "vue-router"

const user = useUserStore()

// seria interessante colocar isso em um arquivo definindo várias coisas de ambito global.
const opcoes = [
  {link :"/resumo", nome : "Resumo"},
  {link: "/despesas", nome : "Despesas"},
  {link: "/receitas", nome : "Receitas"}
]

  const desativado=false
</script>

<style>

@import "https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/journal/bootstrap.min.css";
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .shake-enter-active{
    animation: shake 0.4s 4;
  }
  .shake-leave-active{
    transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .shake-enter-from,
  .shake-leave-to{
    transform: rotate3d(0, 1, 0, 90deg);
    opacity:0;
  }

  @keyframes shake{
    25%,50%{
      transform: translate3d(-10px,0,0);
    }
    0%,75%{
      transform: translate3d(10px,0,0);
    }
  }


  .slide-fade-enter-active {
    transition: all 0.25s ease-out;
  }
  .slide-fade-leave-active {
    transition: all 0.25s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: rotate3d(0, 1, 0, 90deg);
    opacity: 0;
  }
</style>

<template>
  <Logo/>
  <Modal/>
  <section style="margin-top:50mm; background-color: white; z-index:10">
    <header class="page-header">
      <div class="container pulsando">
          <div class="navbar">
            <h1>{{user.titulo}}</h1>
            <span v-if="user.logged">Olá, {{user.nome}}! <a href="#" @click="user.logout()">(fazer logout)</a></span>
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
                  <RouterLink class="nav-link" :to="opcao.link">{{opcao.nome}}</RouterLink>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </header>
    <div class="container">
      <RouterView />
    </div>
  </section>
</template>
