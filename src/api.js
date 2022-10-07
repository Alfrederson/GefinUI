const API = "http://127.0.0.1:5000"


const status = {
    logged : false,
    refresher : undefined,
    pageLoadHandler : undefined
}


/*
    Isso serve pra conseguir ler a desgraça do texto de erro do servidor
    dentro do catch.
*/
const fetcher = (path, options) =>
    fetch(path, options)
        .then(r => {
            if (r.ok) return r.text()
            else return r.text().then(e => { throw e })
        })
 



export default {
    refresher(){
        // se já tiver outro timeout, mata ele.
        console.log("Refresher invocado.")
        clearTimeout(status.refresher)
        status.refresher = 
        setTimeout( () =>{
            if(status.logged){
                this.post("/user/refresh")
                .then( mensagem => {
                    console.log(mensagem)
                })
                this.refresher()    
            }
        },6000) // sessão expira em 600 segundos, então a gente renova de 550 em 550.
    },    
    // isso é chamado quando a pessoa entra na página por um link exteron.
    refresh(){
        return this.post("/user/refresh").then( x => {
            if(!status.logged){
                this.refresher()
            }
            status.logged = true
            return x
        })
    },
    /**
     * Tenta criar a conta na API.
     * @param {String} nome 
     * @param {String} email 
     * @param {String} password 
     */
    /*
        perfil = {
            nome : req.body.nome,   // João Feijão
            email: req.body.email,  // joao@feijao.com
            senha: req.body.senha,   // feijão
            criacao: Timestamp.now()
        }
    */    
    signup(nome, email, password){
        return this.post("/user/signup",{
            email : email,
            senha : password,
            nome  : nome
        })
    },
    login(email, password){
        return this.post("/user/signin",{
            email : email,
            senha : password
        }).then( resposta => {
            status.logged = true
            this.refresher()
            // passa pro próximo
            return resposta
        })
    },
    logout(){
        status.logged=false
        clearTimeout(status.refresher) // não faz diferença se ele existe ou não.
        return this.post ("/user/signout")
    },
    perfil(){
        return this.get("/user/profile", true).then( corpo => JSON.parse(corpo))
    },
    despesas(){
        return this.get("/despesas",true)       
    },
    receitas(){
        return this.get("/receitas",true)
    },
    async resumo(ano,mes){
        return this.get("/resumo/"+ano+"/"+mes,true)
    },
    async post(path, options, logado){
        if(logado){
            if(!status.logged)
                throw "Usuário não logado"
        }
        let headers = new Headers()
        if(options)
            headers.append("Content-Type", "application/x-www-form-urlencoded")
        
        let requestOptions = {
            method: 'POST',
            mode : "cors",
            headers: headers,
            credentials: 'include',
            body   : options ? (new URLSearchParams(options)).toString() : ""
        }
    
        return fetcher(API+path, requestOptions)
    },
    
    async get(path, logado){
        if(logado){
            if(!status.logged)
                throw "Usuário não logado"
        }
    
        let headers = new Headers()
        let requestOptions = {
            method: 'GET',
            mode  : "cors",
            credentials: 'include',
            headers: headers
        }
    
        return fetcher(API+path, requestOptions)
    }    
} 