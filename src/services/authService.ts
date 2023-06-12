import { EncryptRSA } from '../hooks/useEncrypt'
import { useLocalStorage } from "../hooks/useLocalStorage"
import { invoke } from "../server/api"

export const Authenticate = async (username: string, password: string, keepSessionOpen: boolean) => {
    const { setItem, keySession } = useLocalStorage()

    const credentialsEncrypt = EncryptRSA(username + '|' + password)

    const payload = {
      Credentials: credentialsEncrypt,
      KeepSessionOpen: keepSessionOpen
    }

    const result = await invoke('/auth/login', payload, false)

    let data = null
    if(result && result.data && result.data.Sesiones && result.data.Sesiones.length > 0 && result.data.Sesiones[0] && result.data.Sesiones[0].Token){
      data = result.data
      setItem(keySession, data)
    }
    return data
}

export const verifyEmail = async (email: string) => {
  const payload = {
    Email: email
  }
  const result = await invoke('/auth/verifyEmail', payload, false)
  if(result && result.data){
      return result.data
  }
  return null
}