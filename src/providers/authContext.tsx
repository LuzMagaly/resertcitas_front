import { useState, createContext, Dispatch, SetStateAction } from 'react';

import Login from '../pages/login';

interface IAuthContext {
  session: string | null
  setSession: Dispatch<SetStateAction<string | null>>
}

export const AuthContext = createContext<IAuthContext>({
  session: null,
  setSession: () => {}
})

export const AuthProvider = ({ children }: { children: any }) => {

  const [session, setSession] = useState<string | null>(null);

  return (
    <AuthContext.Provider value={{ session, setSession }}>
        { session? children : <Login />}
      </AuthContext.Provider>
  )
}
