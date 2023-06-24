import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuthContext } from "../context/authContext";
import axios from "axios";
import Loader from "./Loader";
import { firestoreDB } from "../utils/firebase";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { errorToast, successToast } from "../utils/notify";


const TonesTab = () => {
    const queryClient = useQueryClient()
    const {user} = useAuthContext()
    const userRef = doc(firestoreDB,"users",user?.uid)
    const [enteredTone,setTone] = useState("")
    const handleRemove=async (toneData)=>{
        const res = await updateDoc(userRef,{
            tones:arrayRemove(toneData)
        })
        queryClient.invalidateQueries(["tones"])
        successToast("Tone deleted successfully")

    }
    const tonesQuery = useQuery(["tones"],async()=>{
        const res = await axios.get("/user/tones?uid="+user.uid)
        if(res.data && res.data.success){
            return res.data.data
        }
    },null,{enabled:user})
    const addToneMutation = useMutation({mutationFn:async()=>{
        if(tonesQuery.data.find(d=>d.tone===enteredTone)){
            return errorToast("Tone already exists!")
        }
        const res = await updateDoc(userRef,{
            tones:arrayUnion({tone:enteredTone,selected:false})
        })
        queryClient.invalidateQueries(["tones"])
        successToast("Tone added successfully")
        setTone("")

    }})
    if(tonesQuery.isLoading){
        return <Loader/>
    }
  return (
    <div>
      <h1 className="text-2xl font-semibold">You tones</h1>
      <div className="mt-4">
        <div className="bg-slate-900 rounded-lg  py-6 px-4">
            <div className="flex items-center gap-4 flex-wrap">
                {tonesQuery.data?.map(t=>{
                    return <ToneButton key={t.tone} data={t} onClick={()=>{handleRemove(t)}}/>
                })}
            </div>
        </div>
      </div>
      <div className="bg-slate-800 h-[1px] my-6"></div>
      <h1 className="text-2xl font-semibold">Add tone</h1>
      <div className="mt-4">
        <div className="flex">
            <input type="text" value={enteredTone} onChange={(e)=>{setTone(e.target.value)}} className="bg-transparent py-2 px-4 rounded-l border-slate-700 border-2 border-r-0 focus:outline-none" />
            <button className="bg-primary px-4 py-2 rounded-r" onClick={addToneMutation.mutate}>{addToneMutation.isLoading ?"Adding.." :"Add tone"}</button>
        </div>
      </div>
    </div>
  );
};
const ToneButton = ({ data, onClick }) => {
  return (
    <div className="bg-slate-800 rounded py-1 px-2  relative">
        <span className="text-lg font-medium">{data.tone}</span>
        <button onClick={onClick} className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-slate-700 rounded-full h-6 w-6 flex justify-center items-center">
            x
        </button>
    </div>
  );
};
export default TonesTab;
