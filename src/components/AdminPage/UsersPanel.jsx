import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Scrollbar } from "react-scrollbars-custom";
const planName = {
  0: "Free",
  5: "Starter",
  15: "Basic",
  30: "Professional",
};
const UsersPanel = () => {
  const { adminQuery } = useOutletContext();
  const data = adminQuery.isSuccess ? adminQuery.data.users : [];
  console.log(data.slice(100));
  const [sortBy,setSortBy] = useState("plan-asc")
  const sortedData = [...data].sort((a,b)=>{
    if(sortBy==="plan-asc"){
      return b.current_plan_id  - a.current_plan_id
    }
    if(sortBy==="plan-dsc"){
      return a.current_plan_id - b.current_plan_id
    }
    if(sortBy==="daily-asc"){
      return b.daily_requests_count  - a.daily_requests_count
    }
    if(sortBy==="daily-dsc"){
      return a.daily_requests_count  - b.daily_requests_count
    }
    if(sortBy==="monthly-asc"){
      return b.monthly_requests_count  - a.monthly_requests_count
    }
    if(sortBy==="monthly-dsc"){
      return a.monthly_requests_count  - b.monthly_requests_count
    }
    
  })
  const handleSortChange=(e)=>{
    setSortBy(e.target.value)
  }
  return (
    <div className="w-full mt-10">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold mb-4">Users</h1>
        <div className="flex flex-col gap-2">
          <label htmlFor="" className="text-xs text-slate-100">
            Sort By
          </label>
          <select onChange={handleSortChange} className="bg-transparent border-2 border-slate-500 py-2 px-4 rounded-md">
            <option className="bg-slate-800 text-white" value="plan-asc">Plan(ASC)</option>
            <option className="bg-slate-800 text-white" value="plan-dsc">Plan(DSC)</option>
            <option className="bg-slate-800 text-white" value="daily-asc">Daily Requests(ASC)</option>
            <option className="bg-slate-800 text-white" value="daily-dsc">Daily Requests(DSC)</option>
            <option className="bg-slate-800 text-white" value="monthly-asc">Monthly Requests(ASC)</option>
            <option className="bg-slate-800 text-white" value="monthly-dsc">Monthly Requests(DSC)</option>
          </select>
        </div>
      </div>

      {/* <Scrollbar style={{width:"100%",height:"70vh"}}> */}
      <div className="grid grid-cols-[repeat(16,1fr)] w-full bg-slate-900 text-center mt-10 max-h-[1000px] overflow-scroll ">
        <div className=" col-span-1 p-2">
          <h1 className="text-xl ">S No</h1>
        </div>
        <div className=" col-span-4 p-2">
          <h1 className="text-xl ">Email</h1>
        </div>
        <div className=" col-span-3 p-2">
          <h1 className="text-xl ">Current Plan</h1>
        </div>
        <div className=" col-span-3 p-2">
          <h1 className="text-xl ">Request Today</h1>
        </div>
        <div className=" col-span-3 p-2">
          <h1 className="text-xl ">Request this month</h1>
        </div>
        <div className=" col-span-2 p-2">
          <button></button>
        </div>

        {sortedData.map((c, i) => {
          return (
            <RowItem
              data={c}
              index={i}
              key={i}
              // setCouponsData={setCouponsData}
            />
          );
        })}
      </div>

      {/* </Scrollbar> */}
    </div>
  );
};

const RowItem = ({ data, index }) => {
  const [open, setOpen] = useState(false);
  // const handleRevoke = async () => {
  //   const res = await fetch(
  //     import.meta.env.VITE_SERVER_URL +
  //       "/admin/" +
  //       (data.isRevoked ? "activate" : "revoke") +
  //       "/" +
  //       data.key
  //   );
  //   const response = await res.json();
  //   if (response.success) {
  //     let dataArr = [];
  //     for (const key in response.data) {
  //       dataArr.push({ ...response.data[key], key });
  //     }
  //     // setCouponsData(dataArr);
  //   }
  // };
  // const handleDownload = async () => {
  //   await downloadExcel(data.codes, data.managerName);
  // };
  return (
    <>
      <div className=" col-span-1 p-2">
        <h1>{index + 1}</h1>
      </div>
      <div className=" col-span-4 p-2">
        <h1>{data.email}</h1>
      </div>
      <div className=" col-span-3 p-2">
        <h1>{planName[data.current_plan_id]}</h1>
      </div>
      <div className=" col-span-3 p-2">
        <h1>{data.daily_requests_count}</h1>
      </div>
      <div className=" col-span-3 p-2">
        <h1>{data.monthly_requests_count}</h1>
      </div>

      <div className=" col-span-2 p-2">
        <h1>
          {data.date
            ? new Date(data.date._seconds * 1000).toDateString()
            : new Date().toDateString()}
        </h1>
      </div>
    </>
  );
};
export default UsersPanel;
