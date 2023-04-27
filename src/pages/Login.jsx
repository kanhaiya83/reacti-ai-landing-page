import React, { useEffect, useState } from 'react'
import {
    signInWithPopup,
    GoogleAuthProvider,
  } from "firebase/auth";
import googleIcon from "../assets/google.svg";
import { useAuthContext } from '../context/authContext';
import { auth } from '../utils/firebase';
import Layout from '../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
const LoginPage = () => {
const {user,userData}   = useAuthContext()
const location = useLocation()
const navigate = useNavigate()
useEffect(()=>{
  if(user){
    if(location.state && location.state.from){
      navigate(location.state.from)
    } 
    else{
      navigate("/")

    }
  }
},[user])
  const [isChecked, setIsChecked] = useState(false);
  const provider = new GoogleAuthProvider();
      const handleClick = async () => {
        signInWithPopup(auth, provider)
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          });
      };
  return (
   <Layout>
    <div className="border border-slate-600 rounded py-4 mx-auto max-w-[700px] my-20">
            <h1 className="text-slate-300 text-2xl border-b border-slate-600 pb-2 mb-2 px-5">
              Login
            </h1>
            <div className="px-5">
              <h5 className="text-xl mb-3 text-slate-200">
                Please login with your Google account to continue.
              </h5>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="w-5 h-5 mr-2"
                  value={isChecked}
                  onChange={(e) => {
                    setIsChecked(e.target.checked);
                  }}
                />
                <span className="text-lg">
                  I agree to the <span className=" text-blue-400">Terms</span>{" "}
                  and <span className="text-blue-400">Privacy Policy</span>
                </span>
              </div>
              <button
                onClick={handleClick}
                className={`bg-slate-800 p-5 rounded mt-3 mx-auto block ${
                  !isChecked && "opacity-50"
                }`}
                disabled={!isChecked}
              >
                <div className="flex items-center">
                  <img src={googleIcon} alt="" className="w-6 mr-1" />
                  <span>Login with Google</span>
                </div>
              </button>
            </div>
          </div>
   </Layout>
  )
}

export default LoginPage