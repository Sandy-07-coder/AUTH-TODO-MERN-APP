import React from 'react'
import LoginPage from "./LoginPage"
import SignUp from './SignupPage'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate();
    
  return (
    <main className=' h-screen flex flex-col justify-center items-center'>
        <header>
            <h1 className=' text-3xl text-white font-medium text-center pt-4'>Simple Auth App</h1>
        </header>

        <section className=' flex mt-12 gap-4 justify-center '>
            <button onClick={() => navigate("/auth/login")} className=' text-white text-2xl bg-blue-400 rounded-lg px-3 py-1 hover:bg-blue-500 cursor-pointer'>Login</button>
            <button onClick={() => navigate("/auth/signup")} className=' text-white text-2xl bg-green-400 rounded-lg px-3 py-1 hover:bg-green-500 cursor-pointer'>SignUp</button>
        </section>
      
    </main>
  )
}

export default LandingPage
