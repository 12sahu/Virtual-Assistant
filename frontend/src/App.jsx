import React, { useContext } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './pages/SignUp'
import Signin from './pages/Signin'
import Customize from './pages/Customize'
import Customize2 from './pages/Customize2'

import Home from './pages/Home'
import { userDataContext } from './context/userContext';

function App() {
  const {userData,setUserData}=useContext(userDataContext)
  return (
    <Routes>
      <Route path='/' element={(userData?.assistantImage && userData?.assistantName)? <Home/>:<Navigate to={"/customize"}/>}/>
      <Route path='/signup' element={!userData?<SignUp/>:<Navigate to={"/customize"}/>}/>
      <Route path='/signin' element={!userData?<Signin/>:<Navigate to={"/"}/>}/>
      <Route path='/customize' element={userData?<Customize/>:<Navigate to={"/signup"}/>}/>
       <Route path='/customize2'element={userData?<Customize2/>:<Navigate to={"/signup"}/>}/>
    </Routes>
  )
}

export default App
