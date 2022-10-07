import { defineStore } from 'pinia'
import api from "../api"
import { useRoute, useRouter } from "vue-router"



export const useUserStore = defineStore({
  id: 'user',

  state: () => {
    return {
      logged : false,
      router : useRouter(),
      route  : useRoute(),
      nome   : "",
      redirecionar : undefined,
      titulo : ""
    }
  },

  actions: {
    /**
     * Checa se o usuário está logado.
     * Se a pessoa precisar fazer login, redireciona para a rota
     * em que a função foi chamada.
     * @returns 
     */
    async prepare(){
      return api.refresh().then(
        x =>{
          const user = useUserStore()
          user.logged = true
          // isso atualiza o nome da pessoa lá no alto.
          user.fetchProfile()
          
        }
      ).catch(
        x => {
          console.log("Quando logar, redirecionar para: "+this.route.path)
          this.redirecionar = this.route.path
          this.router.push({ path : "/signin"})
        }
      )
    },
    async fetchProfile(){ 
      return api.perfil().then(
        perfil => {
          this.nome = perfil.nome
          return perfil
        }
      )
    },
    // Por que eu estou chamando uma função pra chamar uma função?
    // acho que é porque assim eu consigo alterar coisas no store.
    async signup(name, email, pass){
      return api.signup(name,email,pass)
    },
    async login(email, pass){
      return api.login(email, pass).then(
        ()=>{
          this.logged = true
          this.fetchProfile()
          if(this.redirecionar){
            this.router.push({path : this.redirecionar})
            this.redirecionar = undefined
          }else{
            // redireciona para o resumo
            this.router.push({path : "/resumo"})
          }
        }
      )
    },
    async despesas(){
      return api.despesas()
    },
    async receitas(){
      return api.receitas()
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
    async criar(tipo, data, descricao, valor, categoria){
        let alvo = tipo === "receita"? "/receitas" : "/despesas"
        let dados = {
            data  : data,
            descricao : descricao,
            valor : valor
        }
        if(tipo === "despesa")
            dados.categoria = categoria

        return api.post(alvo, dados, true)
    },
    logout(){
      return api.logout().then(
        () =>{
          this.nome = undefined
          this.logged = false
          // login ou tela inicial?
          this.router.push({ path : "/signin"})
        }
      )
    }
  }
})
