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
    }        
}