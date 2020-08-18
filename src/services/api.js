import axios from 'axios'

//Configuração básica do axios.
const api = axios.create({
    baseURL: 'https://api.github.com/'
})

export default api
