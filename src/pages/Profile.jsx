import React, { useState } from 'react'

import { useAuthContext } from '../context/authContext';
import { auth } from '../utils/firebase';
import Header from '../components/Header';
import Layout from '../components/Layout';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { pricingPlansData } from './PricingPage';
import ReactModal from "react-modal";
import { errorToast, successToast } from '../utils/notify';
import Cookies from 'js-cookie';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
    border: "none",
    backgroundColor: "transparent",
  },
  overlay: {
    backgroundColor: "rgb(0,0,0,.9)",
  },
};

ReactModal.setAppElement("#root");

ChartJS.register(ArcElement, Tooltip, Legend);

const ProfilePage = () => {

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
const {user,userDataQuery}   = useAuthContext()
     
      const limit = userDataQuery?.data?.monthly_limit || 30
      const count = userDataQuery?.data?.monthly_requests_count || 0
      const currentPlanID = userDataQuery?.data?.current_plan_id || 0
  return (
    <>
    <Layout>
      <div className="w-full px-[10%]">

      <div className="w-full flex justify-end items-center ">
          <button
          onClick={openModal}
            className="text-primary text p-3 rounded text-lg underline"
          >
            Got a referral code?
          </button>
      </div>
        <div className="flex items-center justify-center gap-4">
          <img src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${user.email.replaceAll(".","")}`} alt="" className='w-20 h-20'/>
          <div>
          <h1 className="text-2xl text-center text-slate-200 mb-2">{user.email}</h1> 
          <h4 className="text-slate-400">{pricingPlansData.find(plan=>plan.plan_id===currentPlanID).name}</h4>
          </div>
        </div>
        <div className="w-full min-h-[250px] flex justify-center items-center flex-col">
       <div className="flex justify-center gap-x-4 items-stretch">
       </div>
        <div className="my-6 mx-auto w-[30%] relative">
          <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center'>
            <h1 className='text-3xl text-[#54B64E] font-bold'>{limit}</h1>
            <h1 className='text-sm'>Total credits</h1>
          </div>
        <Doughnut data={ {
    labels: ['', ''],
    datasets: [
      {
        data: [count,limit-count],
        backgroundColor: [
          '#FF0054',
          '#54B64E',
        ],
        borderWidth: 0,
      },
    ],
   
  }}
  options={ {
    cutout: 60,
    plugins: {
      legend: {
        display: false
      }
    }
  }}/>
        </div>
        <div className="flex justify-between w-full max-w-[70%] mb-4">
      <button className=" p-2 rounded bg-[#54B64E] font-medium text-sm">{limit-count} credits left</button>
      <button className=" p-2 rounded bg-[#FF0054] font-medium text-sm">{count} credits used</button>

        </div>
     
    </div>
  
      </div>
      <ReferModal
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          user={user}
        />
</Layout></>
  )
}

const ReferModal = ({ modalIsOpen, setIsOpen, user }) => {
  const { userDataQuery ,setCounter} = useAuthContext();
  const [enteredCode, setEnteredCode] = useState("");
  const [enteredRedeemCode, setEnteredRedeemCode] = useState("");
  const [copied,setCopied] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  const userData = userDataQuery?.data || {}
  const handleRefer = async () => {
    if(enteredCode.length!=10){
      return errorToast("Invalid Code!")
    }
    console.log(enteredCode);
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER_URL + "/refer/" + enteredCode,
        {
          headers: {
            "fb-session": Cookies.get("fb-session"),
          },
        }
      );
      const response = await res.json();
      if (response.success) {
        successToast(response.message);
        setCounter(prev=>prev+1)
      } else if (response.message) {
        errorToast(response.message);
      } else {
        errorToast("Some error occurred!!");
      }
      setIsOpen(false);
      setEnteredCode("")

    } catch (e) {
      console.log(e);
      errorToast("Some error occurred!!");
    }
  };
  const handleRedeem = async () => {
    console.log(enteredRedeemCode);
    if(enteredRedeemCode.length!=20){
      return errorToast("Invalid Code!")
    }
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER_URL + "/redeem/" + enteredRedeemCode,
        {
          headers: {
            "fb-session": Cookies.get("fb-session"),
          },
        }
      );
      const response = await res.json();
      if (response.success) {
        successToast(response.message);
        setCounter(prev=>prev+1)

      } else if (response.message) {
        errorToast(response.message);
      } else {
        errorToast("Some error occurred!!");
      }
      setIsOpen(false);
      setEnteredRedeemCode("")
    } catch (e) {
      console.log(e);
      errorToast("Some error occurred!!");
    }
  };
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Refer Modal"
    >
      <div className="bg-slate-800 text-white px-5 py-4 flex flex-col items-stretch">
        <h1 className="text-2xl text-center mb-2">Refer a friend</h1>
        <div className="flex mb-3 pb-3 border-b border-slate-600">
          <h1 className="bg-slate-700 p-2 flex-[3]">{userData.referralCode}</h1>
          <button
            className="bg-primary p-2 flex-1"
            onClick={() => {
              navigator.clipboard.writeText(userData.referralCode);
              setCopied(true)
              setTimeout(()=>{
                setCopied(false)
              },2000)
            }}
          >
            {copied?"Copied":"COPY"}
          </button>
        </div>
        <h1 className="text-xl mb-1">Got a referral code?</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={enteredCode}
            onChange={(e) => {
              setEnteredCode(e.target.value);
            }}
            className=" bg-slate-500 p-2 flex-[3]"
          />
          <button
            className="bg-primary p-2 flex-1"
            onClick={handleRefer}
          >
            Submit
          </button>
        </div>
        <h1 className="text-xl mb-1">Got a coupon code?Redeem here</h1>
        <div className="flex">
          <input
            type="text"
            value={enteredRedeemCode}
            onChange={(e) => {
              setEnteredRedeemCode(e.target.value);
            }}
            className=" bg-slate-500 p-2 flex-[3]"
          />
          <button
            className="bg-primary p-2 flex-1"
            onClick={handleRedeem}
          >
            Redeem
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
export default ProfilePage