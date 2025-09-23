import React, { useState } from 'react'
import api from '../API/axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [error, setError] = useState("");

  const {isAuthenticated,setIsAuthenticated} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== rePassword) {
      setError("Passwords do not match");
      return;
    }
    try{
      setError("");
      const response = await api.post('/auth/register',{name,email,password});
      if(response.data){
        const userID = response.data.user.id;
        
        setIsAuthenticated({...isAuthenticated,userID});
        navigate(`../../auth/login`);
        
      }
    }
    catch(err){
      setError(err.response?.data?.message || "Login failed, try again");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg bg-gray-800 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg">
        {/* Exit button */}
        <button
          className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-400 hover:text-white text-xl sm:text-2xl font-bold focus:outline-none"
          aria-label="Close"
          type="button"
          onClick={() => window.history.back()}
        >
          &times;
        </button>
        <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">Sign Up</h2>
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="rePassword" className="block text-sm font-medium text-gray-300">
              Re-enter Password
            </label>
            <input
              id="rePassword"
              type="password"
              required
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
              placeholder="Re-enter your password"
              value={rePassword}
              onChange={e => setRePassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition duration-200"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignUp
