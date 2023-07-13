import AppRouter from "routes/appRouter"
import { AuthProvider } from 'providers/authContext';
import { DataProvider } from "providers/dataContext";
import "bootstrap/dist/css/bootstrap.min.css"
import "styles/App.css"

export const App = () => {
  return (
      <AuthProvider>
        <DataProvider>
          <AppRouter/>
        </DataProvider>
      </AuthProvider>
  );
}