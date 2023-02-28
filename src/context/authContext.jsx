import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import Cookies from "js-cookie";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import { ref, child, get } from "firebase/database";

const serverURL = import.meta.env.VITE_SERVER_URL;

const authContext = React.createContext({ user: {} });

export const useAuthContext = () => useContext(authContext);

export const AuthContextProvider = ({ children }) => {
  

  const [user, loading, error] = useAuthState(auth);
  const [userData,setUserData] = useState({})
  const [counter,setCounter] = useState(0)
  const value = { user, loading, error ,userData,setCounter};
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;

        Cookies.set("fb-access-token", user.accessToken);
        Cookies.set("fb-session", true);
        fetch(serverURL + "/getcookie?idToken=" + user.accessToken)
          .then((res) => res.json())
          .then((response) => {
            console.log(response);
            if (response.success) {
              Cookies.set("fb-session", response.sessionCookie);
            } else {
              Cookies.remove("fb-session");
            }
          });
        // get userdata

      } else {
        Cookies.remove("fb-session");

        Cookies.remove("fb-access-token");
        Cookies.remove("fb-session");
        setIsLoggedIn(false);
      }
    });
  }, []);
useEffect(()=>{
  if(!user)return 
  get(child(ref(db), `users/${user.uid}`))
  .then((snapshot) => {
    if (snapshot.exists()) {
      
      setUserData(snapshot.val());
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error(error);
  });
},[user,counter])
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
