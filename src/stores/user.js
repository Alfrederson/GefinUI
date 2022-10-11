import { defineStore } from 'pinia'
import api from "../api"
import { useModalStore } from './modal'
import { useRoute, useRouter } from "vue-router"




export const useUserStore = defineStore({
  id: 'user',

  state: () => {
    return {
      logged: false,
      route: useRoute(),
      router: useRouter(),
      nome: "",
      redirecionar: undefined,
      titulo: "",
      modal: useModalStore(),

      refresherAtivado : false,
      timeoutRefresher : undefined
    }
  },

  actions: {
    _refresher(){
      api.post("/user/refresh").then( resultado =>{
        console.log(`${resultado}`)
        setTimeout( this._refresher, 6000)
      }).catch( erro =>{
        console.log("Aconteceu um erro!")
      })
    },
    /**
     * Ativa o refresher.
     */
    async ativaRefresher(){
      if(this.refresherAtivado){
        console.log("Refresher já está ativado.")
        return
      }
        
      this.refresherAtivado=true

      this.timeoutRefresher = setTimeout( this._refresher, 2000)
    },
    async desativaRefresher(){
      this.refresherAtivado=false
      clearTimeout(this.timeoutRefresher)
    },
    /**
     * Checa se o usuário está logado.
     * Se a pessoa precisar fazer login, redireciona para a rota
     * em que a função foi chamada.
     * @returns 
     */
    async prepare() {
      // se a api disser que tem perfil, então a pessoa está logada.
      // se der erro, não está logada!
      return api.get("/user/profile").then( result =>{
        this.logged = true
        let perfil = JSON.parse(result)
        this.nome = perfil.nome
  
        this.ativaRefresher()

      }).catch( error =>{
        this.logged = false
        this.router.push({path : "/signin"})
        this.modal.erro("Ops!","Você não está logado.")
      })
    },
    // Por que eu estou chamando uma função pra chamar uma função?
    // acho que é porque assim eu consigo alterar coisas no store.
    async signup(name, email, pass) {
      return api.post("/user/signup", {
        email: email,
        senha: pass,
        nome: name
      })
    },
    async login(email, pass) {
      console.log("Tentando logar... "+email+" "+pass)
      return api.post("/user/signin",{
        email:email,
        senha:pass
      }).then( resultado =>{
        console.log("Deu certo!")
        return resultado
      })
    },
    async logout() {
      // 2- 
      api.post("/user/signout").then(msg => {
        this.logged = false
        this.nome = undefined
        this.desativaRefresher()
        this.router.push({path:"/"})
      })
    }, 
    /**
     * 
     * @param {string} tipo é receitas ou despesas 
     * @param {string} data no formato yyyymmdd
     * @param {string} descricao é a descrição do negócio
     * @param {number} valor é o valor
     * @param {string} categoria é a categoria se tipo for despesas
     * @returns uma promise com a resposta do servidor pra uma requisição post.
     */
    async criar(tipo, data, descricao, valor, categoria) {
      let alvo = tipo === "receita" ? "/receitas" : "/despesas"
      let dados = {
        data: data,
        descricao: descricao,
        valor: valor
      }
      if (tipo === "despesa")
        dados.categoria = categoria

      return api.post(alvo, dados)
    },

    /** Cada despesa tem o formato:
     * {
     *  id : string,
     *  valor : number,
     *  data  : ddddmmyy,
     *  categoria : string,
     *  descricao : string
     * }
     * 
     * Cada receita tem o mesmo formato, porém sem categoria.
     * @param {String} tipo é "receitas" ou "despesas"
     * @returns um array de operacoes.
     */

    async operacoes(tipo) {
        if (tipo !== "receitas" && tipo !== "despesas") {
          throw "Não sei a que tipo de operação " + tipo + " se refere."
        }
        return api.get("/" + tipo, true)
      },

      /**
       * Retorna um objeto contendo o resumo de um mês no seguinte padrão:
       * {
       *  inicio : data de inicio do resumo no formato yyyymmdd
       *  fim    : data de fim do resumo no formato yyyymmdd
       *  receitas : somatório de receitas
       *  despesas : somatório de despesas
       *  saldo    : receitas - despesas
       *  categorias : array de { categoria : string, valor : number}
       * }
       * @param {string | number} ano é o ano do resumo no formato YYYY 
       * @param {string | number} mes é o mês do resumo no formato MM
       * @returns 
       */
      async resumo(ano,mes){
        return api.get("/resumo/"+ano+"/"+mes,true)
    }
  }
})
