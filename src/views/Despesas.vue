<script setup>
    import { onMounted } from "vue"
    import Operacoes from "./Operacoes.vue"
    
    import {useUserStore} from "../stores/user"
    const user = useUserStore()
    onMounted( ()=>{
        user.titulo = "Despesas"
    })
</script>
<template>
    <Operacoes pagina="/despesas" />
</template>
