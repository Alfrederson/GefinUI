export default {
    /**
     * Transforma data de YYYYMMDD para DD/MM/YYYY
     * @param {string} data no formato YYYYMMDD 
     * @returns 
     */
    formataData( d ){
        d = d.toString()
        let ano = d.substring(0,4),
            mes = d.substring(4,6),
            dia = d.substring(6,8)
        return dia + "/" + mes + "/" + ano 
    },
    deformatData( d ){
        return d.getFullYear() + "-" + (d.getMonth()+1).toString().padStart(2,"0") + "-" + d.getDate().toString().padStart(2,"0")
    }        
}