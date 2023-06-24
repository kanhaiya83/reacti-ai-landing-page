import React from 'react'

const ProfileMenu = ({tab,setTab}) => {
    const handleClick=(id)=>{
        setTab(id)
    }
  return (
    <div className=" border-r border-slate-800 p-4 flex flex-col min-h-screen h-full">
            <TabLink text={"Dashboard"} onClick={()=>{handleClick(0)}} selected={tab==0}/>
            <TabLink text={"Prompt"} onClick={()=>{handleClick(1)}} selected={tab==1}/>
            <TabLink text={"Tones"} onClick={()=>{handleClick("tones")}} selected={tab=="tones"}/>
            <TabLink text={"Refer"} onClick={()=>{handleClick(2)}} selected={tab==2}/>
            <TabLink text={"Profile"} onClick={()=>{handleClick(3)}} selected={tab==3}/>
    </div>
  )
}
const TabLink=({text,onClick,selected})=>{
    return <button className={`px-6 py-4 rounded-lg hover:bg-slate-900 font-semibold text-slate-200 text-left ${selected && "bg-slate-800"}`} onClick={onClick}>{text}</button>
}
export default ProfileMenu