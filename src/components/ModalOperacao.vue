<script>
    import { useModalStore } from '../stores/modal';
    import  util from "../util"

    export default({
        data(){
            return{
                modal : useModalStore(),
                novaData : util.deformatData(new Date(Date.now())),
                novaDescricao : "Descrição",
                novaValor : 0.0,
                novaCategoria : ""
            }
        },
        computed :{
            modo(){
                return this.modal.modo[1]
            },
            tipo(){
                return this.modal.modo[0]
            },
            invalido(){
                if(!this.novaData)
                    return "Preencha a data."
                if(!this.novaDescricao)
                    return "Preencha a descrição."
                if(!this.novaValor || parseFloat(this.novaValor) == 0.0)
                    return "Preencha o valor com um número diferente de zero."          
                return "";
            }
        },
        methods : {
            confirmar(){
                this.modal.confirma({
                    data      : this.novaData,
                    descricao : this.novaDescricao,
                    valor     : this.novaValor,
                    categoria : this.novaCategoria
                })
            }
        }
    })
</script>
<template>
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
    <span class="mb-1 mx-2">{{invalido}}</span>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="this.modal.cancela">Cancelar</button>
        <button type="button" :disabled="invalido !==''" class="btn btn-primary" @click="confirmar" >Confirmar</button>
    </div>
</template>