import axios from 'axios'
import { getEnvVariables } from '../helpers/getEnvVariables'

const { VITE_API_URL } = getEnvVariables()

const calendarApi = axios.create({
  baseURL: VITE_API_URL
})

// * Interceptores
// Un interceptor de axios tiene "request" y "response", en este caso usamos request porque estamos enviando una request al backend, y antes de que esa request se envíe quiero que mi interceptor la modifique, en otras palabras, dentro de un interceptor podremos añadir o modificar headers o lo que sea de esa request
calendarApi.interceptors.request.use(config => {
  // Agrego en los headers de la request que se envía al backend un nuevo header llamado 'x-token' con el token que se toma del localStorage
  config.headers = {
    ...config.headers, // Agregamos esta linea por si hay mas headers personalizados que tienen que ser enviados
    'x-token': localStorage.getItem('token')
  }

  return config
})

export default calendarApi
