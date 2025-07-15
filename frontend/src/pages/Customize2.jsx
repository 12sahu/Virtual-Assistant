import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { userDataContext } from '../context/userContext';
import { MdKeyboardBackspace } from "react-icons/md";


function Customize2() {
  const {
    userData,
    backendImage,
    selectedImage,
    serverUrl,
    setUserData,
  } = useContext(userDataContext);
  
  const [assistantName, setAssistantName] = useState(userData?.assistantName || "");
  const navigate = useNavigate();
  const [loading,setLoading]=useState(false)
  
  const handleUpdateAssistant = async () => {
    setLoading(true)
    try {
      let formData = new FormData();
      formData.append("assistantName", assistantName);

      if (backendImage) {
        formData.append("assistantImage", backendImage);
      } else {
        formData.append("imageUrl", selectedImage);
      }

      const result = await axios.post(`${serverUrl}/api/user/update`, formData, {
        withCredentials: true,
      });
      setLoading(false)
      console.log(result.data)
      setUserData(result.data);
      navigate("/")
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col items-center justify-center px-4 relative'>
      <MdKeyboardBackspace className='absolute top-[30px] left-[30px] text-white cursor-pointer w-[25px] h-[25px]' onClick={()=>navigate("/customize")}/>
      <h1 className='text-white text-[30px] font-semibold mb-8 text-center'>
        Enter Your <span className='text-blue-200'>Assistant Name</span>
      </h1>

      <input
        type='text'
        placeholder='eg. shifra'
        className='w-full max-w-[600px] h-[60px] outline-none border-2 border-white bg-transparent 
                   text-white placeholder-gray-300 px-6 rounded-full text-[18px] mb-6'
        value={assistantName}
        onChange={(e) => setAssistantName(e.target.value)}
        required
      />

      {assistantName && (
        <button 
        disabled={loading}
          onClick={()=>{
            
            handleUpdateAssistant()
          }}
          className='min-w-[250px] h-[60px] bg-white text-black text-[18px] font-semibold 
                     rounded-full hover:bg-gray-200 transition duration-300'
        >
          {!loading ?"Finally Create Your Assistant":"loading..."}
        </button>
      )}
    </div>
  );
}

export default Customize2;
