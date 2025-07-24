import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import bg from '../assets/authBg.png';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { userDataContext } from '../context/userContext';


function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const { serverUrl, handleCurrentUser, setUserData , userData } = useContext(userDataContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );
      setUserData(result.data)
      setLoading(false)

      await handleCurrentUser(); // ✅ Fetch user after signup
      
      navigate("/customize");
    } catch (error) {
      console.log(error)
      setUserData(null)
      setLoading(false)
      setErrorMsg(error.response?.data?.message)
    }
  };

  return (
    <div
      className="w-full h-[100vh] bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form
        className="w-[90%] h-[600px] max-w-[500px] bg-[#00000083] backdrop-blur-md rounded-xl shadow-xl p-6 flex flex-col items-center justify-center gap-[20px]"
        onSubmit={handleSignUp}
      >
        <h1 className="text-white text-[30px] font-semibold mb-[10px] text-center">
          Register to <span className="text-blue-400">Virtual Assistant</span>
        </h1>

        {errorMsg && (
          <p className="text-red-400 text-center text-[16px]">{errorMsg}</p>
        )}

        <input
          type="text"
          placeholder="Enter Your Name"
          className="w-full h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full text-[18px]"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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
            type={showPassword ? "text" : "password"}
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
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        <p
          className="text-white text-[18px] cursor-pointer"
          onClick={() => navigate("/signin")}
        >
          Already have an account? <span className="text-blue-400">Sign In</span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
