import "bootstrap/dist/css/bootstrap.min.css"
import "styles/App.css"
import AppRouter from "routes/appRouter"
import { AuthProvider } from 'providers/authContext';

//test
import io from 'socket.io-client'
import { useEffect } from "react"
import { url } from "server/api"
import { DataProvider } from "providers/dataContext";
const socket = io(url)



export const App = () => {

  //tezt
  useEffect(() => {
    socket.emit('message', 'Hello from client')
    socket.on('message', (message) => {
    })
  }, [])

  return (

      <AuthProvider>
        <DataProvider>
          <AppRouter/>
        </DataProvider>
      </AuthProvider>

  );
}