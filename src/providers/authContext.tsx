import { useState, useEffect, createContext, Dispatch, SetStateAction } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Login from '../pages/login'
import Loader from '../pages/loader'

interface IAuthContext {
  session: any | null
  setSession: Dispatch<SetStateAction<any | null>>
}

export const AuthContext = createContext<IAuthContext>({
  session: null,
  setSession: () => {}
})

export const AuthProvider = ({ children }: { children: any }) => {
  const { getItem } = useLocalStorage()
  const [session, setSession] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const _session = JSON.parse(getItem('session') || '{}')
    if(_session?.Sesiones[0].Token){
      setSession(_session)
    }
    setLoading(false)
  }, [])


  return (
    <AuthContext.Provider value={{ session, setSession }}>
        { loading? <Loader/> : ((session?.Sesiones[0].Token)? children : <Login />)}
    </AuthContext.Provider>
  )
}
