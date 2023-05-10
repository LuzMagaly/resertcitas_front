import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import AppRouter from "./routes/appRouter";



function App() {



  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <AppRouter/>


    </ThemeProvider>
  );
}

export default App