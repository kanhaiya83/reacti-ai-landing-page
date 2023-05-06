import React, { useState } from "react";

import { useAuthContext } from "../context/authContext";
import { auth } from "../utils/firebase";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { pricingPlansData } from "./PricingPage";
import ReactModal from "react-modal";
import { errorToast, successToast } from "../utils/notify";
import Cookies from "js-cookie";
import WeeklyUsageChart from "../components/WeeklyUsageChart";
import ProfileMenu from "../components/ProfileMenu";
import PromptSection from "../components/PromptSection";

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
  const [tab, setTab] = useState(1);

  const { user, userDataQuery } = useAuthContext();

  const limit = userDataQuery?.data?.monthly_limit || 30;
  const count = userDataQuery?.data?.monthly_requests_count || 0;
  const currentPlanID = userDataQuery?.data?.current_plan_id || 0;
  return (
    <>
      <Layout>
        <div className="flex">
          <div className="flex-1">
              <ProfileMenu setTab={setTab} tab={tab}/>
          </div>
          <div className="flex-[5] bg-[#12111c]">
            {" "}
            <div className="w-full px-[2%] pt-10 pb-20">

            {tab ===0 &&  <div className="w-full min-h-[250px] flex justify-center items-center flex-col">
                <div className="flex justify-center gap-x-4 items-stretch"></div>
                <div className="my-6 w-full relative">
                  {/* <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-center">
                <h1 className="text-3xl text-[#54B64E] font-bold">{limit}</h1>
                <h1 className="text-sm">Total credits</h1>
              </div> */}
                  <div className="flex w-full gap-4">
                    <div className="bg-slate-900 rounded-lg p-4 flex-1">
                      <h1 className="text-lg text-slate-200">Total Usage:</h1>
                      <div className="w-[80%] mx-auto">
                        <Doughnut
                          data={{
                            labels: [
                              `${count} credits Used`,
                              `${limit - count} credits left`,
                            ],
                            datasets: [
                              {
                                data: [count, limit - count],
                                backgroundColor: [
                                  "rgba(200, 200, 200, 0.3",
                                  "rgb(114, 20, 255, 0.3)",
                                ],
                                borderColor: [
                                  "rgba(200, 200, 200, 0.4)",
                                  "rgb(114, 20, 255, 0.4)",
                                ],
                              },
                            ],
                          }}
                          options={{
                            cutout: 100,
                            plugins: {
                              legend: {
                                // display: false,
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                    <div className="bg-slate-900 rounded-lg p-4 flex-[2]">
                      <h1 className="text-lg text-slate-200">
                        Last Week Usage:
                      </h1>

                      <WeeklyUsageChart />
                    </div>
                  </div>
                </div>
              </div>}
              {tab ===1 &&<PromptSection/>}
              {tab ===2 &&<ReferralSection/>}
              {tab ===3 && <div className="flex items-center justify-center gap-4">
                <img
                  src={`https://api.dicebear.com/5.x/bottts-neutral/svg?seed=${user.email.replaceAll(
                    ".",
                    ""
                  )}`}
                  alt=""
                  className="w-20 h-20"
                />
                <div>
                  <h1 className="text-2xl text-center text-slate-200 mb-2">
                    {user.email}
                  </h1>
                  <h4 className="text-slate-400">
                    <div className="text-white font-medium">Plan:</div>{" "}
                    {
                      pricingPlansData.find(
                        (plan) => plan.plan_id === currentPlanID
                      ).name
                    }
                  </h4>
                </div>
              </div>}
              
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

const ReferralSection = () => {
  const { userDataQuery, setCounter } = useAuthContext();
  const [enteredCode, setEnteredCode] = useState("");
  const [enteredRedeemCode, setEnteredRedeemCode] = useState("");
  const [copied, setCopied] = useState(false);
  const userData = userDataQuery?.data || {};
  const handleRefer = async () => {
    if (enteredCode.length != 10) {
      return errorToast("Invalid Code!");
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
        setCounter((prev) => prev + 1);
      } else if (response.message) {
        errorToast(response.message);
      } else {
        errorToast("Some error occurred!!");
      }
      setEnteredCode("");
    } catch (e) {
      console.log(e);
      errorToast("Some error occurred!!");
    }
  };
  const handleRedeem = async () => {
    console.log(enteredRedeemCode);
    if (enteredRedeemCode.length != 20) {
      return errorToast("Invalid Code!");
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
        setCounter((prev) => prev + 1);
      } else if (response.message) {
        errorToast(response.message);
      } else {
        errorToast("Some error occurred!!");
      }
      setEnteredRedeemCode("");
    } catch (e) {
      console.log(e);
      errorToast("Some error occurred!!");
    }
  };
  return (
    <div className=" flex flex-col items-center mt-10">
      <h1 className="text-4xl text-slate-200">Refer and Earn Rewards</h1>
      <h4 className="text-sm  mb-2">
        Earn <span className="text-primary">30 requests </span> on each referral
      </h4>
      <div className="bg-slate-900 p-4 rounded-lg max-w-[700px] w-full">
        <h1 className="text-xl mb-1">Your referral code</h1>
        <div className="flex mb-3y rounded overflow-hidden mb-8">
          <h1 className="bg-slate-800 p-3 flex-[3] ">
            {userData.referralCode}
          </h1>
          <button
            className="bg-primary p-2 flex-1"
            onClick={() => {
              navigator.clipboard.writeText(userData.referralCode);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 2000);
            }}
          >
            {copied ? "Copied" : "COPY"}
          </button>
        </div>
        <h1 className="text-xl mb-1">Got a referral code?</h1>
        <div className="flex mb-8  rounded overflow-hidden">
          <input
            type="text"
            value={enteredCode}
            onChange={(e) => {
              setEnteredCode(e.target.value);
            }}
            className=" bg-transparent border-4 border-slate-800 border-r-0 p-3 flex-[3]"
          />
          <button className="bg-primary p-2 flex-1" onClick={handleRefer}>
            Submit
          </button>
        </div>
        <h1 className="text-xl mb-1">Got a coupon code?Redeem here</h1>
        <div className="flex  rounded overflow-hidden">
          <input
            type="text"
            value={enteredRedeemCode}
            onChange={(e) => {
              setEnteredRedeemCode(e.target.value);
            }}
            className=" bg-transparent border-4 border-slate-800 border-r-0 p-3 flex-[3]"
          />
          <button className="bg-primary p-2 flex-1" onClick={handleRedeem}>
            Redeem
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
