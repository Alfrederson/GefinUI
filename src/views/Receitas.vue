<script setup>
    import Operacoes from "./Operacoes.vue"
    import { onMounted } from "vue";
    import {useUserStore} from "../stores/user"
    const user = useUserStore()
    onMounted( ()=>{
        user.titulo = "Receitas"
    })    
</script>
<template>
    <Operacoes pagina="/receitas" />
</template>
