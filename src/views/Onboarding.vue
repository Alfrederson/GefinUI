<script setup>
    import { onMounted } from 'vue';
    import { useUserStore } from '../stores/user'
    import { useModalStore } from '../stores/modal';
    const user = useUserStore()
    const modal = useModalStore()
    onMounted(()=>{
        user.titulo = "Olá, pessoa que usa isso!"
    })
</script>

<template>
    <div class="container">
        <p>O Gefin Turbo é uma maneira fácil e prática de GErir as suas FINanças.</p>
        <p>A última palavra em Engenharia de Gestão de Eficiência.</p>

        <h4>
            <RouterLink to="/signup">Criar conta</RouterLink>
        </h4>
        <br/>
        <h4>
            <RouterLink to="/signin">Já tem conta? Faça login</RouterLink>
        </h4>
    </div>
</template>