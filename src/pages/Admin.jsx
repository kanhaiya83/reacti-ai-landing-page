import React, { useState } from "react";
import { useEffect } from "react";
import CodeForm from "../components/CodeForm";

const AdminPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(()=>{
        if(localStorage.getItem("isAdminLoggedIn")){
            setIsLoggedIn(true)
        }
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(e);
        if(e.target["password"].value ==="admin@123"){
            setIsLoggedIn(true)
            localStorage.setItem("isAdminLoggedIn",true)
        }
    }

  return (isLoggedIn ? <AdminPanel/> : <LoginScreen handleSubmit={handleSubmit}/>);
};
const LoginScreen=({handleSubmit})=>{
    return  <div className="w-full min-h-[80vh] flex justify-center items-center">
    <div className="flex flex-col items-stretch gap-6">
    <h1 className="text-4xl text-center">Admin Panel</h1>
     <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
       <input
         type="password"
         name="password"
         placeholder="Enter password"
         className="bg-transparent border-slate-500 rounded border p-1"
       />
       <button className="bg-primary rounded py-1">Login</button>
     </form>
    </div>
   </div>
}
const AdminPanel=({setIsLoggedIn})=>{
  const [modalIsOpen, setIsOpen] = useState(false);
  
    return <div className="w-full px-[5%]">
      <div className="w-full flex justify-end">
        <button className="bg-primary p-3" onClick={()=>{setIsOpen(true)}}>Generate</button>
      </div>
      <CodeForm  modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </div>
}
export default AdminPage;
