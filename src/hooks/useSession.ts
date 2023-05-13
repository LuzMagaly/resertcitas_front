import { useEffect, useContext } from 'react'
import { useLocalStorage } from './useLocalStorage'
import { AuthContext } from '../providers/authContext'

export interface Session {
    id: string
    email: string
    name?: string
    lastname?: string
    authToken?: string
    photo?: string
}

export const useSession = () => {
    /*const { session, setSession } = useContext(AuthContext)
    const { getItem, setItem, removeItem } = useLocalStorage()

  useEffect(() => {
    const sessionFound = getItem('session')
    console.log(sessionFound)
    if (sessionFound) {
      login(JSON.parse(sessionFound))
    }
  }, [])

  const login = (_session: Session) => {
    console.log('initializing login: ' + _session)
    setSession(_session)
    setItem('session', JSON.stringify(_session))
  }

  const logout = () => {
    setSession(null)
    removeItem('session')
  }

  return { session, setSession, login, logout }*/
}