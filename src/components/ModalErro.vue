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
        <button class="btn btn-primary" @click="this.modal.dismiss">
            Não quero saber.
        </button>
    </div>
</template>