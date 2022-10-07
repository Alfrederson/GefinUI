<script>
    import { useUserStore } from '../stores/user'
    import api from '../api'
    import util from '../util'
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
                email : "",
                password : "",
                erro : "",
                user : useUserStore(),
                titulo: tipo.titulo,
                listFunc: tipo.func,
                tipo    : tipo.tipo,
                dados   : undefined,
                temDados: false,
                dadosVazios : false,
                criando: false,

                novaData : undefined,
                novaValor : undefined,
                novaCategoria : undefined,
                novaDescricao : undefined

            }
        },

        methods : {
            // deveria ser uma função de utilidade?
            // alterna  a janelina de criar nova despesa/receita      
            alternaCriacao(){
                this.criando = ! this.criando
            },
            // cancela a criação
            cancelar(){
                this.criando = false
            },
            // cria a criação
            async criar(){
                if(!this.novaData)
                    return
                if(!this.novaDescricao)
                    return
                if(!this.novaValor)
                    return
                let data = this.novaData.replaceAll("-","")
                this.user.criar(this.tipo,
                                data,
                                this.novaDescricao,
                                this.novaValor,
                                this.novaCategoria)
                .then( r =>{
                    this.puxarDados()
                    this.criando = false
                })
            },
            async puxarDados(){
                let json = await api[this.listFunc]()
                this.dados = JSON.parse(json).sort( (a,b) => b.data - a.data )
                this.temDados = true
                this.dadosVazios = this.dados.length == 0
            }            
        },
        async mounted(){
            await this.user.prepare()
            this.puxarDados()
        }        
    })
</script>
<template>
    <!-- botar isso em um componente.-->
    <Transition name="fade">
        <div v-if="this.criando" style="display:block; position:fixed; left:0px; top:0px; width:100vw; height:100vh; background-color:rgba(0,0,0,0.3)">
        </div>
    </Transition>
    <Transition name="slide-fade">
    <div v-if="this.criando" class="modal fade show" style="display:block">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Registrar nova {{this.tipo}}
                    </h5>
                </div>
                <div class="modal-body mx-2">
                    <div class="mb-3">
                        <label for="data" class="col-form-label">Data</label>
                        <input type="date" class="form-control" v-model="novaData"/>
                    </div>
                    <div class="mb-3">
                        <label for="descricao" class="col-form-label">Descrição</label>
                        <input class="form-control" v-model="novaDescricao"/>
                    </div>
                    <div class="mb-3">
                        <label for="valor" class="col-form-label">Valor</label>
                        <input type="number" step="0.01" min="0" class="form-control" v-model="novaValor"/>
                    </div>
                    <div class="mb-3" v-if="this.tipo =='despesa'">
                        <label for="categoria" class="col-form-label">Categoria</label>
                        <input type="text" class="form-control" v-model="novaCategoria"/>
                    </div>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button type="button" class="btn btn-primary" @click="criar">Criar</button>
                    <button type="button" class="btn btn-primary" @click="cancelar">Cancelar</button>
                </div>
            </div>
        </div>
    </div> 
    </Transition>

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
                        <table class="table table-md">
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
                            <tr v-for="item in this.dados">
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
            <button type="button" class="btn btn-primary" @click="alternaCriacao">Registrar uma nova {{this.tipo}}.</button>
        </div>


    <div v-if="!this.temDados" style="display:flex">
        <Spinner/>
    </div>
    
</div>
</template>