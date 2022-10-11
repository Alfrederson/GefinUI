import { defineStore } from 'pinia'

export const useModalStore = defineStore({
    id : "modal",
    state : () =>{
        return{
            showing : false,
            titulo  : "titulo do modal",
            tipo    : "erro",
            modo    : undefined,
            mensagem: "mensagem do modal",
            cbConfirmar : () => { console.log("Modal confirmado.")},
            cbDismiss   : () => { console.log("Não quero saber!")},
            cbCancelar  : () => { console.log("Modal cancelado.")}
        }
    },
    actions : {
        reiniciar(){
            this.tipo = undefined
            this.modo = undefined,
            this.showing = false
            this.cbCancelar=undefined
            this.cbConfirmar=undefined
        },
        erro(titulo, mensagem, cbDismiss){
            this.tipo = "erro"
            this.titulo = titulo
            this.mensagem = mensagem
            this.showing=true
            this.cbDismiss = cbDismiss
        },
        confirmar(titulo,mensagem, cbConfirmar, cbCancelar){
            this.tipo = "confirmar"
            this.titulo = titulo
            this.mensagem = mensagem
            this.cbConfirmar = cbConfirmar
            this.cbCancelar = cbCancelar
            this.showing=true
        },
        dismiss(){
            let cb = this.cbDismiss
            this.reiniciar()
            if(cb) cb()
        },
        /**
         * Confirma o modal e executa o callback associado.
         * @param {object} dados é um dicionário com chaves/valor.
         */
        confirma(dados){
            let cb = this.cbConfirmar
            this.reiniciar()
            if(cb) cb(dados)
        },
        /**
         * Cancela o modal e executa o callback associado.
         * * @param {object} dados é um dicionário com chaves/valor.
         */
        cancela(dados){
            let cb = this.cbCancelar
            this.reiniciar()
            if(cb) cb(dados)
        },
        /**
         * @param {string} tipo pode ser receitas ou despesas 
         * @param {string} modo pode ser criar, editar, deletar 
         * @param {string} cbConfirmar callback que é chamado com os dados quando a operação é confirmada 
         * @param {string} cbCancelar callback que é chamado quando a operação é cancelada 
         */
        operacoes(tipo, modo, cbConfirmar, cbCancelar){
            this.tipo = "operacao"
            this.modo = [tipo,modo]
            this.showing=true
            this.cbConfirmar = cbConfirmar
            this.cbCancelar  = cbCancelar
        }
    }

})