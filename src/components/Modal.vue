<script>
    import { shallowRef, ref, computed } from 'vue'
    import ModalErro from "./ModalErro.vue"
    import ModalConfirmar from './ModalConfirmar.vue'
    import ModalOperacao from "./ModalOperacao.vue"
  
    import { useModalStore } from "../stores/modal"

    export default({
        data(){
            return {
                modal : useModalStore(),
                components : {
                    "erro" : shallowRef(ModalErro),
                    "confirmar" : shallowRef(ModalConfirmar),
                    "operacao"  : shallowRef(ModalOperacao)
                }
            }
        },
        props : {
            component : {default : "erro"}
        },
        components : {
            ModalErro,
            ModalConfirmar,
            ModalOperacao
        },
        computed : {
            showing(){
                return this.modal.showing
            },
            transition(){
                if(this.modal.tipo === "erro")
                    return "shake"
                
                return "slide-fade"
            }
        }
    })
</script>

<template>
    <!-- fundo do modal-->
    <Transition name="fade">
        <div v-if="showing" @click="this.modal.dismiss" style="z-index:5; display:block; top: 0px; position:fixed; width:100vw; height:100vh; background-color:rgba(0,0,0,0.8); backdrop-filter:grayscale()">
        </div>
    </Transition>   
    <Transition :name="transition">    
        <div v-if="showing" class="modal fade show " style="display:block; z-index:6">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <component :is="this.components[this.modal.tipo]"></component>                    
                </div>
            </div>
        </div>
    </Transition>   
</template>