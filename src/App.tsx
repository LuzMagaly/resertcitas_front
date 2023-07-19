import AppRouter from "routes/appRouter"
import { AuthProvider } from 'providers/authContext';
import { DataProvider } from "providers/dataContext";
import "bootstrap/dist/css/bootstrap.min.css"
import "styles/App.css"
import { SocketProvider } from "providers/socketProvider";

export const App = () => {
  return (
    <SocketProvider>
      <AuthProvider>
        <DataProvider>
            <AppRouter/>
        </DataProvider>
      </AuthProvider>
    </SocketProvider>
  );
}