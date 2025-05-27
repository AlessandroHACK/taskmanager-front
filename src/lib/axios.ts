import axios from 'axios'


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

api.interceptors.request.use( config => {
    const token = localStorage.getItem('AUTH_TOKEN') //obtiene el token de localstorage
    
    if(token){ 
        config.headers.Authorization =  `Bearer ${token}` //mandamos el token desde la peticion en beareer
    }

    return config
})

export default api