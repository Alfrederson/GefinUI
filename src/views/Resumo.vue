<script>
    import Spinner from '../components/Spinner.vue'    
    import { useUserStore } from '../stores/user';
    import api from "../api"
    import util from "../util"

    export default({

        components : {
            Spinner
        },

        mounted(){
            this.user.prepare().then( x =>{
                this.carregar()
            })
            this.user.titulo = "Resumo"
        },
        data(){
            return{
                resumo : undefined,
                user : useUserStore(),
                coisas : "Isso é pra aparecer lá emcima.",
                resumoInicio : undefined,
                resumoFim    : undefined
            }
        },
        methods : {
            carregar(){
                this.resumo = undefined
                let agora = new Date()
                let ano = agora.getFullYear().toString()
                let mes = (agora.getMonth()+1).toString().padStart(2,"0")

                api.resumo(ano,mes).then( r =>{
                    this.resumo = JSON.parse(r)

                    this.resumoInicio = util.formataData(this.resumo.inicio)
                    this.resumoFim    = util.formataData(this.resumo.fim)
                })
            },
            recarregar(){
                this.carregar()
        }
    }
        
    })

    
</script>
<template>
    <div v-if="this.user.logged" class="container">
        <div class="card-header">
            Resumo deste mês ({{this.resumoInicio}} a {{this.resumoFim}})
        </div>
        <div class="card-body" >
            <p>Algum dia você poderá ver o resumo de cada mês.</p>
            <Transition name="fade">
                <div class="container col-6">                
                    <table class="table" v-if="this.resumo">
                        <tr>
                            <th scope="row">Receitas:</th>
                            <td>{{this.resumo.receitas}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Despesas:</th>
                            <td>{{this.resumo.despesas}}</td>
                        </tr>
                        <tr>
                            <th scope="row">Saldo:</th>
                            <td>{{this.resumo.saldo}}</td>
                        </tr>
                    </table>
                </div>
            </Transition>
            <div v-if="!this.resumo" style="display:flex">
                <Spinner/>
            </div>            
        </div>
        
        <div class="card-header">
            Despesas por categoria:
        </div>
        <div class="card-body" >
            <p>Fazer um grafiquinho com o chart.js?</p>
            <Transition name="fade">
                <div class="container col-6">
                    <table class="table" v-if="this.resumo">
                        <tr v-for="valor, categoria in this.resumo.categorias">
                            <th scope="row">{{categoria}}</th>
                            <td>{{valor}}</td>
                        </tr>
                    </table>
                </div>
            </Transition>
            <div v-if="!this.resumo" style="display:flex">
                <Spinner/>
            </div>              
        </div>
    </div>
</template>
