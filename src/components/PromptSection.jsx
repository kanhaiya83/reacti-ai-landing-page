import React, { useEffect, useState } from 'react'
import { useAuthContext } from '../context/authContext'
import axios from 'axios'
import { errorToast, successToast } from '../utils/notify'
import { toast } from 'react-toastify'
const paramsArr= ["<tweet>","<tone>","<comment>","<characterLimit>","<language>"]
const PromptSection = () => {
  const [customPrompt, setCustomPrompt] = useState(`Loading...`)

  const {userData} = useAuthContext()
  useEffect(()=>{
    setCustomPrompt(userData.prompt)
  },[userData])
  
  const [invalidParams, setInvalidParams] = useState([])
  const handlePromptChange=(e)=>{
    const val = e.target.value;
    const temp = paramsArr.filter(p=>!val.includes(p))
    setInvalidParams(temp)
    setCustomPrompt(val)
} 
const handlePromptSave=async ()=>{
  if(invalidParams.length){
    return errorToast("Please resolve all error in prompt")
  }
   const res = await  await  toast.promise(axios.post("/user/prompt",{prompt:customPrompt}),{ pending: 'Saving your prompt!',})
   if(res.data && res.data.success){
    successToast("Prompt saved successfully!")
   }
   else{
    errorToast("Could save the prompt")
   }
}
const resetPrompt=async ()=>{
  const res = await  toast.promise(axios.get("/user/prompt/reset"),{ pending: 'Resetting your prompt!',})
  if(res.data && res.data.success){
   successToast("Prompt reset successfully!")
   setCustomPrompt(res.data.prompt)

  }
  else{
   errorToast("Could reset the prompt")
  }
}
  return (
    <div className="w-full">
<h1 className="text-center text-3xl">Your Custom prompt</h1>
<div className="my-10 flex flex-col">
  <div className="flex justify-end gap-4 mb-4">
    <button className="bg-slate-600 py-2 px-7 rounded" onClick={resetPrompt}>Reset to Default</button>
  </div>
        <textarea
          className={`bg-slate-900 focus:outline w-full rounded p-4 ${invalidParams.length>0 ? "border-red-500 border-[2px]":"border-slate-400 border-[2px]"}`}
          rows="10"
          value={customPrompt}
          onChange={handlePromptChange}
        ></textarea>
        <span className={`text-red-500 opacity-0 transition-opacity duration-300 ${invalidParams.length>0 && "opacity-100"}`}>Missing following params:{invalidParams.join(",")}</span>
        <button onClick={handlePromptSave} className="bg-primary w-fit my-4 p-3 rounded">Save</button>
      </div>
      <div className="w-full "><h1 className='text-2xl font-semibold'>Note:</h1>
      <h4 className="text-xl text-slate-400">These parameters in your prompt are compulsory.</h4>
      <ul className=" list-disc">
        <li><span className="font-semibold text-xl mr-4">{"<tweet>"}</span><span> The tweet text fetched from the twitter page</span></li>
        <li><span className="font-semibold text-xl mr-4">{"<tone>"}</span><span>{"The chosen tone. 'Normal' will be passed when using custom comment"}</span></li>
        <li><span className="font-semibold text-xl mr-4">{"<comment>"}</span><span> {"The comment passed by user.Left blank when sing tones"}</span></li>
        <li><span className="font-semibold text-xl mr-4">{"<characterLimit>"}</span><span>Characters limit selected</span></li>
        <li><span className="font-semibold text-xl mr-4">{"<language>"}</span><span>Language selected</span></li>
      </ul>
      </div>
    </div>
  )
}

export default PromptSection