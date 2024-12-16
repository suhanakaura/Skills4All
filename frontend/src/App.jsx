import {Route,Routes,useNavigate} from "react-router-dom"
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"
import "./App.css";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
  
  <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/Register' element={<Register/>}></Route>
      <Route path='/Login' element={<Login/>}></Route>
      <Route path='/ForgotPassword' element={<ForgotPassword/>}></Route>
  </Routes>
  )
}

export default App;