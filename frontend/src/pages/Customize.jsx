import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import Card from '../components/Card';
import { RiImageAddLine } from "react-icons/ri";
import { userDataContext } from '../context/userContext';
import { MdKeyboardBackspace } from "react-icons/md";

const images = [image1, image2, image3, image4, image5, image6, image7];

function Customize() {
  const {
    serverUrl,
    userData,
    setUserData,
    backendImage,
    setBackendImage,
    frontendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(userDataContext)

  const navigate = useNavigate();
  const inputImage = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
    setSelectedImage("input");
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-t from-black to-[#030353] flex flex-col items-center pt-20 gap-6'>
       <MdKeyboardBackspace className='absolute top-[30px] left-[30px] text-white cursor-pointer w-[25px] h-[25px]' onClick={()=>navigate("/")}/>
            <h1 className='text-white text-[30px] font-semibold mb-8 text-center'></h1>
      <h1 className='text-white text-[30px] text-center'>
        Select Your <span className='text-blue-200'>Assistant Image</span>
      </h1>

      {/* First Row - 5 Cards */}
      <div className='flex gap-[20px]'>
        {images.slice(0, 5).map((img, index) => (
          <div
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`cursor-pointer ${
              selectedImage === index ? "border-4 border-white shadow-2xl shadow-blue-900" : ""
            }`}
          >
            <Card image={img} />
          </div>
        ))}
      </div>

      {/* Second Row - 2 Cards + Upload */}
      <div className='flex gap-[20px]'>
        {images.slice(5).map((img, index) => (
          <div
            key={index + 5}
            onClick={() => setSelectedImage(index + 5)}
            className={`cursor-pointer ${
              selectedImage === index + 5 ? "border-4 border-white shadow-2xl shadow-blue-900" : ""
            }`}
          >
            <Card image={img} />
          </div>
        ))}

        {/* Upload new image card */}
        <div
          className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#020220] border-2 border-[#0000ff66] rounded-2xl overflow-hidden 
            flex items-center justify-center cursor-pointer 
            hover:shadow-2xl hover:shadow-blue-950 hover:border-4 hover:border-white 
            ${selectedImage === "input" ? "border-4 border-white shadow-2xl shadow-blue-950" : ""}`}
          onClick={() => {inputImage.current.click()
            setSelectedImage("input")}
          }
        >
          {!frontendImage && <RiImageAddLine className='text-white w-[25px] h-[25px]' />}
          {frontendImage && <img src={frontendImage} className='h-full object-cover' />}
        </div>

        {/* Hidden input for uploading image */}
        <input
          type="file"
          accept="image/*"
          ref={inputImage}
          hidden
          onChange={handleImage}
        />
      </div>

      {/* NEXT BUTTON */}
      {selectedImage !== null && (
        <button
          className='min-w-[150px] h-[60px] mt-[30px] text-black font-semibold bg-white rounded-full text-[19px]'
          onClick={() => navigate('/customize2')}
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Customize;
