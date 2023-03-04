import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useAuthContext } from "../context/authContext";
import logo from "./../assets/128.png";
import Cookies from "js-cookie";
import { errorToast, successToast } from "../utils/notify";
import { Link } from "react-router-dom";

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
const Header = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user } = useAuthContext();
  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <header className="w-full mb-5 px-[10%] py-6 flex justify-between border-b border-slate-800">
        <div className="flex items-end">
          {/* <img src={logo} alt="" className="w-10 mr-1" /> */}
          <Link to="/" className="text-2xl font-bold whitespace-nowrap text-white">
            REACT.AI
          </Link>
        </div>
        <div>
        {user &&
        <>
          <button className=" text-white  py-4 px-7 rounded-full font-medium bg-primary" onClick={openModal}>
            Refer a friend?
          </button>
          </>
        }
          {/* <Link to="/profile" className="bg-primary ml-4 p-3 rounded">{user ?"Profile" :"Login"} </Link>  */}
        </div>

      </header>
      {user && (
        <ReferModal
          modalIsOpen={modalIsOpen}
          setIsOpen={setIsOpen}
          user={user}
        />
      )}
    </>
  );
};
const ReferModal = ({ modalIsOpen, setIsOpen, user }) => {
  const { userData ,setCounter} = useAuthContext();
  const [enteredCode, setEnteredCode] = useState("");
  const [enteredRedeemCode, setEnteredRedeemCode] = useState("");
  const [copied,setCopied] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  const handleRefer = async () => {
    if(enteredCode.length!=10){
      return errorToast("Invalid Code!")
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
        setCounter(prev=>prev+1)
      } else if (response.message) {
        errorToast(response.message);
      } else {
        errorToast("Some error occurred!!");
      }
      setIsOpen(false);
      setEnteredCode("")

    } catch (e) {
      console.log(e);
      errorToast("Some error occurred!!");
    }
  };
  const handleRedeem = async () => {
    console.log(enteredRedeemCode);
    if(enteredRedeemCode.length!=20){
      return errorToast("Invalid Code!")
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
        setCounter(prev=>prev+1)

      } else if (response.message) {
        errorToast(response.message);
      } else {
        errorToast("Some error occurred!!");
      }
      setIsOpen(false);
      setEnteredRedeemCode("")
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
        <h1 className="text-2xl text-center mb-2">Refer a friend</h1>
        <div className="flex mb-3 pb-3 border-b border-slate-600">
          <h1 className="bg-slate-700 p-2 flex-[3]">{userData.referralCode}</h1>
          <button
            className="bg-primary p-2 flex-1"
            onClick={() => {
              navigator.clipboard.writeText(userData.referralCode);
              setCopied(true)
              setTimeout(()=>{
                setCopied(false)
              },2000)
            }}
          >
            {copied?"Copied":"COPY"}
          </button>
        </div>
        <h1 className="text-xl mb-1">Got a referral code?</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={enteredCode}
            onChange={(e) => {
              setEnteredCode(e.target.value);
            }}
            className=" bg-slate-500 p-2 flex-[3]"
          />
          <button
            className="bg-primary p-2 flex-1"
            onClick={handleRefer}
          >
            Submit
          </button>
        </div>
        <h1 className="text-xl mb-1">Got a coupon code?Redeem here</h1>
        <div className="flex">
          <input
            type="text"
            value={enteredRedeemCode}
            onChange={(e) => {
              setEnteredRedeemCode(e.target.value);
            }}
            className=" bg-slate-500 p-2 flex-[3]"
          />
          <button
            className="bg-primary p-2 flex-1"
            onClick={handleRedeem}
          >
            Redeem
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
export default Header;
