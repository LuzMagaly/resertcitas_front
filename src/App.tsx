import "bootstrap/dist/css/bootstrap.min.css"
import "./styles/App.css"
import AppRouter from "./routes/appRouter"



import { AuthProvider } from './providers/authContext';







//tezt
import io from 'socket.io-client'
import { useEffect } from "react"
import { url } from "./server/api"
const socket = io(url)



function App() {
  

  //tezt
  useEffect(() => {
    socket.emit('message', 'Hello from client')
    socket.on('message', (message) => {
      //console.log(message)
    })
  }, [])

  return (

      <AuthProvider>
        <AppRouter/>
      </AuthProvider>

  );
}

export default App