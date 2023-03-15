import React, { useState } from "react";
import { useEffect } from "react";
import CodeForm from "../components/CodeForm";
import Header from "../components/Header";
import { downloadExcel } from "../utils";
import { successToast } from "../utils/notify";

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customPrompt, setCustomPrompt] = useState("Loading...");
  const [couponsData, setCouponsData] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("isAdminLoggedIn")) {
      setIsLoggedIn(true);
    }
  }, []);
  useEffect(() => {
    if (!isLoggedIn) return;
    (async () => {
      const res = await fetch(
        import.meta.env.VITE_SERVER_URL + "/admin/fetchcoupons"
      );
      const response = await res.json();
      if (response.success) {
        let dataArr = [];
        for (const key in response.data) {
          dataArr.push({ ...response.data[key], key });
        }
        console.log(dataArr);
        setCouponsData(dataArr);
      }
    })();(async () => {
      const res = await fetch(
        import.meta.env.VITE_SERVER_URL + "/admin/prompt"
      );
      const response = await res.json();
      if (response.success) {
          setCustomPrompt(response.prompt)        
      }
    })();
  }, [isLoggedIn]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    if (e.target["password"].value === "admin@123") {
      setIsLoggedIn(true);
      localStorage.setItem("isAdminLoggedIn", true);
    }
    else{
      alert("Wrong password!")
    }
  };

  const content = isLoggedIn ? (
    <AdminPanel
      _hooks={{
        couponsData,
        setCouponsData,
        setIsLoggedIn,
        customPrompt,
        setCustomPrompt,
      }}
    />
  ) : (
    <LoginScreen handleSubmit={handleSubmit} />
  );
  return <>{content}</>;
};
const LoginScreen = ({ handleSubmit }) => {
  return (
    <div className="w-full min-h-[80vh] flex justify-center items-center">
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
  );
};
const AdminPanel = ({ _hooks }) => {
  const {
    couponsData,
    setCouponsData,
    setIsLoggedIn,
    customPrompt,
    setCustomPrompt,
  } = _hooks;
  const [modalIsOpen, setIsOpen] = useState(false);
  const handlePromptChange = (e) => {
    setCustomPrompt(e.target.value);
  };
  const handlePromptSave = async() => {
    if (!customPrompt.includes("<tone>") || !customPrompt.includes("<tweet>")) {
      alert("Invalid syntax");
    }
      const res = await fetch(
        import.meta.env.VITE_SERVER_URL + "/admin/prompt",
        {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prompt:customPrompt})}
      );
      const response = await res.json();
      if (response.success) {
       successToast("Prompt changed successfully!")
      }
    }
  
  return (
    <div className="w-full px-[5%] py-8">
      <div className="w-full flex justify-end">
        <button
          className="bg-primary p-3"
          onClick={() => {
            localStorage.removeItem("isAdminLoggedIn");
            setIsLoggedIn(false);
          }}
        >
          Logout
        </button>
      </div>
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
        {couponsData.map((c, i) => {
          return (
            <RowItem
              data={c}
              index={i}
              key={i}
              setCouponsData={setCouponsData}
            />
          );
        })}
      </div>
      <div className="my-10 flex flex-col">
        <h1 className="text-2xl text-medium">Custom Prompt</h1>
        <textarea
          className="bg-slate-900 border-slate-400 border w-full max-w-[500px] rounded"
          rows="10"
          value={customPrompt}
          onChange={handlePromptChange}
        ></textarea>
        <button onClick={handlePromptSave} className="bg-primary w-fit my-4 p-3 rounded">Save</button>
      </div>
      <CodeForm modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
const RowItem = ({ data, index, setCouponsData }) => {
  const [open, setOpen] = useState(false);
  let codeUsed = 0;
  let requestCount = 0;
  data.codes.forEach((c) => {
    if (c.isUsed) {
      codeUsed++;
    }
    requestCount = c.requestCount;
  });
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
      setCouponsData(dataArr);
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
        <h1>{data.codes.length}</h1>
      </div>
      <div className=" col-span-3 p-2">
        <h1>{codeUsed}</h1>
      </div>
      <div className=" col-span-3 p-2">
        <h1>{requestCount}</h1>
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
            ? new Date(data.date).toDateString()
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
export default AdminPage;
