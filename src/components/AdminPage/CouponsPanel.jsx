import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import CodeForm from "../CodeForm";
import { downloadExcel } from "../../utils";
const CouponsPanel = () => {
  const { adminQuery } = useOutletContext();
  const [modalIsOpen, setIsOpen] = useState(false);

  const coupons = adminQuery.isSuccess ? adminQuery.data.coupons : [];
  return (
    <div>
     
      <div className="w-full flex justify-center">
        <button
          className="bg-slate-700 p-3"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Generate Codes
        </button>
      </div>
      <div className="grid grid-cols-[repeat(24,1fr)] w-full bg-slate-900 text-center mt-10 max-h-[600px] overflow-scroll ">
        <div className=" col-span-1 p-2">
          <h1 className="text-xl ">S No</h1>
        </div>
        <div className=" col-span-6 p-2">
          <h1 className="text-xl ">Manager Name</h1>
        </div>
        <div className=" col-span-3 p-2">
          <h1 className="text-xl ">Codes Count</h1>
        </div>
        <div className=" col-span-3 p-2">
          <h1 className="text-xl ">Codes Used</h1>
        </div>
        <div className=" col-span-3 p-2">
          <h1 className="text-xl ">Requests Per Code</h1>
        </div>
        <div className=" col-span-3 p-2">
          <h1 className="text-xl ">Status</h1>
        </div>
        <div className=" col-span-3 p-2">
          <h1 className="text-xl ">Date of Generation</h1>
        </div>
        <div className=" col-span-2 p-2">
          <button></button>
        </div>
        {coupons.map((c, i) => {
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
      <CodeForm
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        adminQuery={adminQuery}
      />
    </div>
  );
};
const RowItem = ({ data, index }) => {
  const [open, setOpen] = useState(false);
  const handleRevoke = async () => {
    const res = await fetch(
      import.meta.env.VITE_SERVER_URL +
        "/admin/" +
        (data.isRevoked ? "activate" : "revoke") +
        "/" +
        data.key
    );
    const response = await res.json();
    if (response.success) {
      let dataArr = [];
      for (const key in response.data) {
        dataArr.push({ ...response.data[key], key });
      }
      // setCouponsData(dataArr);
    }
  };
  const handleDownload = async () => {
    await downloadExcel(data.codes, data.managerName);
  };
  return (
    <>
      <div className=" col-span-1 p-2">
        <h1>{index + 1}</h1>
      </div>
      <div className=" col-span-6 p-2">
        <h1>{data.managerName}</h1>
      </div>
      <div className=" col-span-3 p-2">
        <h1>{data.count}</h1>
      </div>
      <div className=" col-span-3 p-2">
        <h1>{data?.usedCodes?.length || 0}</h1>
      </div>
      <div className=" col-span-3 p-2">
        <h1>{data.requestCount}</h1>
      </div>
      <div className=" col-span-3 p-2">
        <h1>
          {data.isRevoked ? (
            <span className="bg-red-500 p-1 rounded">Revoked</span>
          ) : (
            <span className="bg-green-500 p-1 rounded">Active</span>
          )}
        </h1>
      </div>
      <div className=" col-span-3 p-2">
        <h1>
          {data.date
            ? new Date(data.date._seconds * 1000).toDateString()
            : new Date().toDateString()}
        </h1>
      </div>
      <div className=" col-span-2 p-2">
        <button
          className="relative"
          onMouseEnter={() => {
            setOpen(true);
          }}
          onMouseLeave={() => {
            setOpen(false);
          }}
        >
          <img src="/images/three-dot.svg" alt="" />
          {open && (
            <div className="absolute left-full top-[50%] text-black bg-slate-300 z-10 rounded">
              <button
                className="px-2 w-full py-2 border-b border-slate-500"
                onClick={handleRevoke}
              >
                {data.isRevoked ? "Activate" : "Revoke"}
              </button>
              <button className="px-2 w-full py-2" onClick={handleDownload}>
                Download
              </button>
            </div>
          )}
        </button>
      </div>
    </>
  );
};
export default CouponsPanel;
