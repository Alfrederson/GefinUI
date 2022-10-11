<script>
    import { useModalStore } from '../stores/modal';
    export default({
        data(){
            return{
                modal : useModalStore()
            }
        }
    })
</script>
<template>
    <div class="modal-header">
        <h4>{{this.modal.titulo}}</h4>
    </div>
    <div class="modal-body">
        {{this.modal.mensagem}}
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" @click="this.modal.confirma">
            Sim.
        </button>
        <button class="btn btn-primary" @click="this.modal.cancela">
            Não.
        </button>
    </div>
</template>