<script>
    import util from '../util'

    import { useUserStore } from '../stores/user'
    import { useModalStore } from '../stores/modal'
    
    import Spinner from "../components/Spinner.vue"
    
    export default({
        props : ["pagina"],

        components : {
            Spinner
        },

        data(){
            let path = this.pagina
            let titulos = {
                "/receitas" : {titulo : "Receitas", func: "receitas", tipo : "receita"},
                "/despesas" : {titulo:  "Despesas", func: "despesas", tipo : "despesa"}
            }

            let tipo = titulos[path]

            return{
                util : util,
                user : useUserStore(),
                modal: useModalStore(),
                titulo: tipo.titulo,
                listFunc: tipo.func,
                tipo    : tipo.tipo,
                dados   : undefined,
                temDados: false,
                dadosVazios : false,
                criando: false,
                detalhando: undefined
            }
        },

        methods : {
            // deveria ser uma função de utilidade?
            // alterna  a janelina de criar nova despesa/receita      
            comecaCriacao(){
                //this.criando = ! this.criando
                this.modal.operacoes(this.tipo, "criar", dados =>{                   
                    this.criar(dados)
                })
            },
            // cancela a criação
            detalhar(id){
                this.detalhando = id
            },
            // cria a criação
            // generalizar para edição também?
            async criar(dados){                    
                if(!dados.descricao){
                    this.modal.erro("Preste atenção!","Faltou descrição. Vai ter que fazer tudo de novo.",this.comecaCriacao)
                    
                    return
                }
                console.log((parseFloat(dados.valor)<0.01))
                if(!dados.valor || (parseFloat(dados.valor)<0.01)){
                    console.log("ops")
                    this.modal.erro("Preste atenção!","Faltou o valor. Vai ter que fazer tudo de novo.",this.comecaCriacao)
                    return
                }


                let data = dados.data.replaceAll("-","")
                this.user.criar(this.tipo,
                                data,
                                dados.descricao,
                                dados.valor,
                                dados.categoria)
                .then( r =>{
                    this.puxarDados()
                })
                .catch( e =>{
                    this.modal.erro("Ops!",e)
                })
            },
            async puxarDados(){
                this.temDados = false
                this.user.operacoes(this.tipo+"s").then( resultado =>{
                    this.dados = JSON.parse(resultado).sort( (a,b) => b.data - a.data )
                    this.temDados = true
                    this.dadosVazios = this.dados.length == 0
                })
            }            
        },
        async mounted(){
            await this.user.prepare()
            this.puxarDados()
        }        
    })
</script>
<template>
    <div class="container">
        <div class="card-body">
            <p>Essas são todas as suas {{this.tipo}}s.</p>
            <p>Botar opção de filtrar por mês e ano.</p>
            <Transition name="fade">
                <div v-if="this.temDados" >
                    <div v-if="this.dadosVazios">
                        Parece que não tem nenhuma {{this.tipo}} registrada ainda. Você pode tentar criar uma.
                    </div>
                    <div v-else style="overflow-x:auto">
                        <table class="table table-md table-hover">
                        <thead>
                            <!-- <td>id</td> -->
                            <tr>
                                <th>data</th>
                                <th>valor</th>
                                <th v-if="this.tipo === 'despesa'">categoria</th>
                                <th>descricao</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in this.dados" @click="detalhar(item.id)">
                                <!-- <td>{{item.id}}</td>-->
                                <td>{{this.util.formataData(item.data)}}</td>
                                <td>{{item.valor}}</td>
                                <td v-if="this.tipo === 'despesa'">{{item.categoria}}</td>
                                <td>{{item.descricao}}</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <!-- modalzito -->
                </div>
            </Transition>

        </div>
        <div class="card-footer" v-if="this.temDados">
            <button type="button" class="btn btn-primary" @click="comecaCriacao">Registrar uma nova {{this.tipo}}.</button>
        </div>


    <div v-if="!this.temDados" style="display:flex">
        <Spinner/>
    </div>
    
</div>
</template>