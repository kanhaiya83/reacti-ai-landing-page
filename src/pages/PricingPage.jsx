import React from "react";
import CrossIcon from "./../assets/icons/cross.svg";
import TickIcon from "./../assets/icons/tick.svg";
import axios from "axios"
import Layout from "../components/Layout";
import { useAuthContext } from "../context/authContext";
const featurePoints=[
  "Personal Bot Setup",
  "Personalized Bot Dashboard",
  "Sentiment Analysis",
  "Users Analysis",
  "Conversation threads",
  "Keyword Analysis & Many More"
]
export const pricingPlansData = [
  {
    price: 0,
    plan_id:0,
    name: "Free",
    heading: "Perfect to start with",
    heading2: "No credit card required",
    credits:1000,
    features:featurePoints.slice(0,2),
    monthly_limit: 30,
    daily_limit: 30,
    premium_support: false,
  },
  {
    price: 5,
    plan_id:5,
    name: "Starter",
    heading: "For Beginners",
    heading2: "$60/year per account",
    credits:5000,
    features:[...featurePoints.slice(0,2),"Basic Insights on User Engagements"],
    monthly_limit: 200,
    daily_limit: 5,
    premium_support: true,
  },
  {
    price: 15,
    plan_id:15,
    name: "Basic",
    heading: "For the Active Users",
    heading2: "$180/year per account",
    credits:-1,
    features:featurePoints.slice(0),

    monthly_limit: 1500,
    daily_limit: 50,
    premium_support: false,
  },
  {
    price: 30,
    plan_id:30,
    name: "Professional",
    heading: "For the Real Influencers",
    heading2: "$360/year per account",
    credits:-1,
    features:featurePoints.slice(0),

    monthly_limit: 1500,
    daily_limit: 50,
    premium_support: true,
  },
];
const PricingPage = () => {
  const {user,userDataQuery} = useAuthContext()
  const userPlanId = (userDataQuery.isSuccess) ? userDataQuery.data.current_plan_id : 0
  console.log({userDataQuery});
  const handlePayment=async (id)=>{
    if(id == 0)return;
    const res =await  axios.get("/user/createorder/"+id)
    if(res.data && res.data.success){
      window.open(res.data.payment_url, '_blank');
    }
  }
  return (
    <Layout>    <section class=" body-font overflow-hidden">
      <div class="container px-5 py-24 mx-auto">
        <h1 className="text-5xl text-gray-100 mb-3 text-center">Simple Straight forward Pricing</h1>
        <h4 className="text-xl text-center text-gray-400 mb-8">Choose the plan that's right for your business.</h4>
        <div class="flex flex-wrap -m-4">
          {pricingPlansData.map((d) => {
            return <PricingCard key={d.price} data={d} onClick={()=>{handlePayment(d.plan_id)}} currentPlan={userPlanId === d.plan_id}/>;
          })}
        </div>
      </div>
    </section>
    </Layout>

  );
};
const PricingCard = ({ currentPlan, onClick, data }) => {
  return (
    <div class="p-4 lg:w-1/4 md:w-1/2 w-full">
      <div
        class={`h-full p-6 rounded-lg border-2  flex flex-col relative overflow-hidden ${
          currentPlan ? "border-indigo-500" : "border-gray-700"
        }`}
      >
        {currentPlan && (
          <span class="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
            Subscribed
          </span>
        )}
        <div className="flex flex-col rounded-lg text-center border-2 border-gray-700 mb-2">
          <h2 class="text-sm tracking-widest text-gray-400 title-font font-medium py-2 uppercase">
            {data.name}
          </h2>
          <div className="w-full border border-gray-700"></div>
          <h2 className="text-gray-100   py-2">{data.heading}</h2>
          <h1 class="text-5xl text-white leading-none flex items-center justify-center py-2 border-gray-800">
            <span>${data.price}</span>
            <span class="text-lg ml-1 font-normal text-gray-400">/mo</span>
          </h1>
          <h2 className="font-thin  text-gray-300  py-2">{data.heading2}</h2>
        </div>
        <p class="flex items-center text-gray-400 mb-2">
          <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
            <img src={TickIcon} alt="" />
          </span>
          {data.heading2}
        </p>
        <p class="flex items-center text-gray-400 mb-2">
          <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
            <img src={TickIcon} alt="" />
          </span>
          {"All type of reactions"}
        </p>
        <p
          class={`flex items-center  mb-2 ${
            data.premium_support ? "text-green-500" : "text-red-500"
          }`}
        >
          <span class="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
            {data.premium_support ? (
              <img src={TickIcon} alt="" />
            ) : (
              <img src={CrossIcon} alt="" />
            )}
          </span>
          Premium Support
        </p>
        <button 
          class={`flex items-center mt-auto text-white  border-0 py-2 px-4 w-full focus:outline-none  rounded  ${
            data.price==0 || currentPlan  ?"bg-gray-700 ": "bg-indigo-500 hover:bg-indigo-600"
          }`} onClick={onClick} disabled={currentPlan}
        >
          {data.price ==0 ?"Free" :(currentPlan ?"Current Plan" :"Buy")}
          {data.price != 0 && <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            class="w-4 h-4 ml-auto"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>}
        </button>
      </div>
    </div>
  );
};
export default PricingPage;
