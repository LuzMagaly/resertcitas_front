import { useState, useEffect, createContext } from 'react'
import io from 'socket.io-client'
import { url } from "server/api"

interface ISocketContext {
  socket: any | null
}
//funcmodifi
export const SocketContext = createContext<ISocketContext>({
  socket: null,
})

export const SocketProvider = ({ children }: { children: any }) => {
  const [socket, setSocket] = useState<any | null>(null)

  useEffect(() => {
    const _socket = io(url)
    setSocket(_socket)
  }, [])

  return (
    <SocketContext.Provider value={{ socket }}>
        { children }
    </SocketContext.Provider>
  )
}
