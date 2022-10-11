<script>
    import { useUserStore } from '../stores/user'
    import { useModalStore } from "../stores/modal"

    import router from '../router'


    export default {
        data(){
            return {
                email : "",
                pass1 : "",
                pass2 : "",
                name  : "",
                user : useUserStore(),
                modal: useModalStore()
            }
        },  
        mounted(){
            this.user.titulo = "Crie sua conta"
        },
        methods : {
            enviar(){

                // pré-validação
                if(!this.name){
                    this.modal.erro("Preste atenção!","Preciso saber o seu nome.")
                    return
                }
                if(!this.email){
                    this.modal.erro("Cadê seu e-mail?","Você precisa me dizer seu e-mail.")
                    return
                }
                if(!this.pass1){
                    this.modal.erro("Preste atenção","Você deve fornecer uma senha.")
                    return
                }
                if(!this.pass2){
                    this.modal.erro("Preste atenção","Você precisa escrever a sua senha de novo.")
                    return
                }

                if(this.pass1 !== this.pass2){
                    this.modal.erro("Preste atenção.","Você deve escrever a sua senha duas vezes do mesmo jeito.")
                    return
                }


                this.user.signup(this.name, this.email, this.pass1)
                .then( resposta =>{
                    alert("Parece que deu certo. Faça login.")
                    router.replace({ path : "/signin"})
                })
                .catch( erro =>{
                    // se o servidor não estiver rodando, 
                    // vai dar failed to fetch.
                    this.modal.erro("Não consegui registrar sua conta, chefe.",erro)
                })
            }
        }
    }
</script>
<template>
    <main>
        <div class="container">
            <div class="container fluid">
                <div class="row">
                    <div class="card-body col-4">
                        É gratuito!
                    </div>
                    <div class="card-body col-4">
                        Você controla seus gastos!
                    </div>
                    <div class="card-body col-4">
                        A gente vende seus dados!
                    </div>
                </div>
            </div>
            <div class="card-header">
                Já tem uma conta? <RouterLink to="/signin">Faça login.</RouterLink>             
            </div>
            <div class="card-body">
                <p>Seu nome de usuário será o seu endereço de e-mail.</p>
                <div class="row mb-3">
                    <div class="col-md-4">
                        Nome:
                    </div>
                    <div class="col-md-8">
                        <input type="nome" class="form-control form-control" v-model="name"/>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-4">
                        E-mail:
                    </div>
                    <div class="col-md-8">
                        <input type="email" class="form-control form-control" v-model="email"/>
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col-md-4">
                        Senha:
                    </div>
                    <div class="col-md-8">
                        <input type="password" class="form-control form-control" v-model="pass1"/>
                    </div>
                </div>
                
                <div class="row mb-3">
                    <div class="col-md-4">
                        Repita a sua senha:<br/>
                        <div v-if="this.pass1">
                            (ela é {{this.pass1}} )
                        </div>
                    </div>
                    
                    <div class="col-md-8">
                        <input type="password" class="form-control form-control" v-model="pass2"/>
                    </div>
                </div>        
                <div class="col-sm-12">
                    <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked/>
                    <p>Aceito que esta plataforma é falha. Aceito que os operadores da plataforma possam usar e vender meus dados ou órgãos para quem e da forma que quiserem. Aceito que a plataforma é só uma demonstração, e que não é possível garantir a minha integridade física durante o uso. Abdico de minha condição de ser humano e aceito ser tratado como uma cobaia en um teste clínico envolvendo a ingestão de substâncias desconhecidas.</p>
                </div>
                <div class="col-sm-9 mb-3">
                    <button class="btn btn-primary" @click.preventDefault="enviar" >Criar minha conta</button>
                </div>
            </div>
            <div class="card-footer">
                <p>Provavelmente é só isso o que a API pede para criar conta.</p>
            </div>            
        </div>

    </main>
</template>