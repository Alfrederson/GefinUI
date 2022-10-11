//const API = "http://127.0.0.1:5000"
const API = "https://challenge-backend-9254d.web.app"

const status = {
    logged : false,
    refresher : undefined,
    pageLoadHandler : undefined
}
const corsMode = "cors"


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
    async post(path, options){
        let headers = new Headers()
        if(options)
            headers.append("Content-Type", "application/x-www-form-urlencoded")
        
        let requestOptions = {
            method: 'POST',
            mode : corsMode,
            headers: headers,
            credentials: 'include',
            body   : options ? (new URLSearchParams(options)).toString() : ""
        }
    
        return fetcher(API+path, requestOptions)
    },
    
    async get(path){
    
        let headers = new Headers()
        let requestOptions = {
            method: 'GET',
            mode : corsMode,
            credentials: 'include',
            headers: headers
        }
    
        return fetcher(API+path, requestOptions)
    }    
} 