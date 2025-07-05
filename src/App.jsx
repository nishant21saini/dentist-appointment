import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Dashboard } from "./components/Dashboard";
import {SignIn} from "./components/Signin";

function App() {
  return (
    <>
  <Router>
        <Routes> 
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/signin" element={<SignIn/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
