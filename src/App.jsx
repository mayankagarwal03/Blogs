import React,{ useEffect } from "react"
import { useState } from "react"
import {useDispatch} from "react-redux"
import authService from "./appwrite/Auth"
import { login, logout } from "./store/authSlice"
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import {Outlet} from "react-router-dom"

function App() {
  const [loading,setloading]=useState(true)
  const dispatch=useDispatch()
  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setloading(false))
  },[])

  return !loading ? (
  <div className="min-h-sc flex flex-wrap content-between bg-gray-400">
    <div className="w-full block">
      <Header/>
      <main>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  </div>):(null)
}

export default App
