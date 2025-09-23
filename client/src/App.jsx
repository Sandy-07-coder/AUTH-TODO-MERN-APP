import { useState } from 'react'
import './App.css'
import LandingPage from './Components/LandingPage'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useNavigate,
    Outlet,
} from "react-router-dom";
import LoginPage from './Components/LoginPage'
import SignUpPage from './Components/SignupPage'
import ProtectedRoutes from './utils/ProtectedRoutes'
import Dashboard from './Components/Dashboard'
import { useAuth } from './contexts/AuthContext';

function App() {

  return (
    <Router>
      <main className=' bg-slate-900 min-h-screen '>
        <Routes>
          <Route path="/" element={<LandingPage />} />
             <Route path='/auth/login' element={<LoginPage/>}/>
             <Route path='/auth/signup' element={<SignUpPage/>}/>
             <Route element={<ProtectedRoutes/>}>
               <Route path='users/:userID/dashboard/' element={<Dashboard />} />
             </Route>
             
        </Routes>
      </main>
    </Router>
  )
}

export default App
