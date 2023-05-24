import { EncryptRSA } from '../hooks/useEncrypt'
import { useLocalStorage } from "../hooks/useLocalStorage"
import { invoke } from "../server/api"

export const Authenticate = async (username: string, password: string, keepSessionOpen: boolean) => {
    const { setItem, keySession } = useLocalStorage()

    const credentialsEncrypt = EncryptRSA(username + '|' + password)

    const data = {
      Credentials: credentialsEncrypt,
      KeepSessionOpen: keepSessionOpen
    }
    const result = await invoke('/auth/login', data, false)

    let session = null
    if(result && result.data && result.data.Sesiones && result.data.Sesiones.length > 0 && result.data.Sesiones[0] && result.data.Sesiones[0].Token){
      session = result.data
      setItem(keySession, session)
    }
    return session
}