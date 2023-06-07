import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { successToast } from "../../utils/notify";

const PromptPanel = () => {
  const { adminQuery, adminAxios } = useOutletContext();
  useEffect(() => {
    if (adminQuery.data && adminQuery.data.prompt) {
      setCustomPrompt(adminQuery.data.prompt);
    }
  }, [adminQuery.isSuccess]);
  const [customPrompt, setCustomPrompt] = useState("Loading...");
  const handlePromptChange = (e) => {
    setCustomPrompt(e.target.value);
  };
  const handlePromptSave = async () => {
    if (!customPrompt.includes("<tone>") || !customPrompt.includes("<tweet>")) {
      alert("Invalid syntax");
    }
    const res = await adminAxios.post("/admin/prompt",{ prompt: customPrompt }
    );
    if (res.data && res.data.success) {
      successToast("Prompt changed successfully!");
    }
  };
  return (
    <div className="my-10 flex flex-col">
      <h1 className="text-2xl text-medium">Custom Prompt</h1>
      <textarea
        className="bg-slate-900 border-slate-400 border w-full max-w-[500px] rounded"
        rows="10"
        value={customPrompt}
        onChange={handlePromptChange}
      ></textarea>
      <button
        onClick={handlePromptSave}
        className="bg-primary w-fit my-4 p-3 rounded"
      >
        Save
      </button>
    </div>
  );
};

export default PromptPanel;
