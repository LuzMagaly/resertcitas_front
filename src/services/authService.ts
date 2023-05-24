import axios from "axios"
import { EncryptRSA } from '../hooks/useEncrypt'
import { useLocalStorage } from "../hooks/useLocalStorage"
import { url } from "../server/api"

export const Authenticate = async (username: string, password: string, keepSessionOpen: boolean) => {
    const { setItem } = useLocalStorage()

    const credentialsEncrypt = EncryptRSA(username + '|' + password)
    const result = await axios.post(url + '/auth/login', {
      Credentials: credentialsEncrypt,
      KeepSessionOpen: keepSessionOpen
    })

    let session = null
    if(result && result.data && result.data.Sesiones && result.data.Sesiones.length > 0 && result.data.Sesiones[0] && result.data.Sesiones[0].Token){
      session = result.data
      setItem('session', JSON.stringify(session))
    }
    return session
}