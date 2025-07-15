import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bg from '../assets/authBg.png';

import { IoEyeOff, IoEye } from "react-icons/io5";

import { userDataContext } from '../context/userContext';
import axios from 'axios';


function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl, handleCurrentUser, userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { email, password },
        { withCredentials: true }
      );

      setUserData(result.data);
      setLoading(false)
      console.log('Signin successful:', result.data);

      await handleCurrentUser(); // ✅ refresh context with current user
      navigate("/");
    } catch (error) {
      console.error("Signin error:", error);
      setUserData(null);
      setErrorMsg(error.response?.data?.message || "Signin failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-[100vh] bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-[90%] h-[600px] max-w-[500px] bg-[#00000083] backdrop-blur-md rounded-xl shadow-xl p-6 flex flex-col items-center justify-center gap-[20px]"
        onSubmit={handleSignin}
      >
        <h1 className="text-white text-[30px] font-semibold mb-[10px] text-center">
          Sign In to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        {errorMsg && (
          <p className="text-red-400 text-center text-[16px]">{errorMsg}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="w-full h-[60px] border-2 border-white bg-transparent rounded-full text-[18px] relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className="w-full h-full rounded-full outline-none bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px]"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {showPassword ? (
            <IoEyeOff
              className="absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <IoEye
              className="absolute top-[18px] right-[20px] w-[25px] h-[25px] text-white cursor-pointer"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="min-w-[150px] h-[60px] bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition duration-300 disabled:opacity-60"
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>

        <p
          className="text-white text-[18px] cursor-pointer"
          onClick={() => navigate('/signup')}
        >
          Don't have an account?{' '}
          <span className="text-blue-400">Sign Up</span>
        </p>
      </form>
    </div>
  );
}

export default Signin;
