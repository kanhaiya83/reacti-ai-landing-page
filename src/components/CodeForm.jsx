import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import writeXlsxFile from "write-excel-file";
import { convertToExcelFormat } from "../utils";
import { errorToast, successToast } from "../utils/notify";
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
    backgroundColor: "rgb(0,0,0,.4)",
  },
};

ReactModal.setAppElement("#root");
const CodeForm = ({ modalIsOpen, setIsOpen, user }) => {
  // const {userData} =  useAuthContext()
  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    const data= {
        managerName: e.target["managerName"].value,
        codeCount: e.target["codeCount"].value,
        requestCount: e.target["requestCount"].value,
    }
    try {
      const res = await fetch(
        import.meta.env.VITE_SERVER_URL + "/generate",
        {
            method:"POST",
          headers: {
            "Content-Type":"application/json"
          },
          body:JSON.stringify(data)
        }
      );
      const response = await res.json();
      if (response.success) {
        successToast(response.message);
        setIsOpen(false)
        return await writeXlsxFile(convertToExcelFormat(response.data.codes), {
            fileName: response.data.managerName+'.xlsx'
          })
      } else if (response.message) {
        errorToast(response.message);
      } else {
        errorToast("Some error occurred!!");
      }
      setIsOpen(false);
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
        <h1 className="text-2xl">Refer a friend</h1>
      <form action="" className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="">Manager Name</label>
        <input required={true} type="text" className="bg-slate-500 p-2 flex-[3] mb-4" name="managerName"/>
        <label htmlFor="">Amount of Codes</label>
        <input required={true} type="number" className="bg-slate-500 p-2 flex-[3] mb-4" name="codeCount"/>
        
        <label htmlFor="">Requests per code</label>
        <input required={true} type="number" className="bg-slate-500 p-2 flex-[3] mb-4" name="requestCount"/>
        
        <button className="bg-primary p-3">Generate</button>
        

      </form>
      </div>
    </ReactModal>
  );
};
export default CodeForm