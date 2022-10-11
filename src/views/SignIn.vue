<script>
    import { useUserStore } from '../stores/user'
    import { useModalStore } from "../stores/modal"

    export default{
        data(){
            return{
                modal : useModalStore(),
                email : "",
                password : "",
                erro : "",
                user : useUserStore()
            }
        },
        mounted(){
            this.user.titulo="Entrar"
        },
        methods : {
            async login(event) {
                // isso redireciona para a página que é para redirecionar.
                this.user.login(this.email, this.password)
                .then ( msg =>{
                    this.$router.push({path: "/resumo"})
                })
                .catch( msg =>{
                    this.modal.erro("Erro fazendo login, chefe.",msg)
                })
            }
        }
    }
</script>
<template>
    <main>
        <div class="container">
            <ul>
                <li>
                    Seu nome de usuário é o e-mail que você utilizou para criar a conta.
                </li>
                <li>
                    Se você se esqueceu, não é problema meu.
                </li>
                <li>
                    Para não esquecer sua senha, sugerimos que você imprima seu e-mail e senha em uma folha A4 com letras garrafais.
                </li>

            </ul>
            <div v-if="this.erro" class="mb-3">
                <span v-for="erro in this.erro">{{erro}}<br/></span>
            </div>
            <div class="mx-3 mb-3">
                <label for="inputEmail" class="form-label">E-mail</label>
                <input type="email" class="form-control" id="inputEmail" v-model="email" />
                <div class="form-text">Nós não garantimos a segurança do seu e-mail.</div>
            </div>
            <div class="mx-3 mb-3">
                <label for="inputPassword" class="form-label">Senha</label>
                <input type="password" class="form-control" id="inputPassword" v-model="password"/>
                <div class="form-text">Se você perder a sua senha, nada pode ser feito a respeito.</div>
            </div>
            <div class="mx-3 mb-5 d-flex justify-content-center">
                <button class="btn btn-primary col-4" @click.preventDefault="login">Logar</button>
            </div>
            <div class="mx-3">
                <p>Não tem uma conta? <RouterLink to="/signup">crie uma agora mesmo.</RouterLink></p>
            </div>
        </div>
    </main>
</template>