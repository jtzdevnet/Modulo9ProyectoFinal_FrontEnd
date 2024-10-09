import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss'

function App() {
  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
