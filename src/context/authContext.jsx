import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../utils/firebase";
import Cookies from "js-cookie";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import { ref, child, get } from "firebase/database";
import axios from "axios";
import { useQuery } from 'react-query'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

const serverURL = import.meta.env.VITE_SERVER_URL;

const authContext = React.createContext({ user: {} });

export const useAuthContext = () => useContext(authContext);

export const AuthContextProvider = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = useState({});
  const [setupCompleted, setSetupCompleted] = useState(false);
  const [counter, setCounter] = useState(0);
  const userDataQuery = useQuery('user', async ()=>{
    const{ data } = await axios.get("/user/fetchdata")
    console.log(data);
    return data
  },{enabled: !!(user && setupCompleted)})
  const value = { user,setupCompleted, loading, error, userData, setCounter ,userDataQuery,userData: userDataQuery.isSuccess ? userDataQuery.data : false};
  
 
  useEffect(() => {
    (async () => {
      if (user) {
        const accessToken  =  await user.getIdToken()
        axios.defaults.headers.common["access-token"] =accessToken
        const setupResponse = await axios.get("/user/setup")
        setSetupCompleted(true)
        console.log({setupResponse});
        console.log({accessToken});
        fetch(serverURL + "/getcookie?idToken=" + user.accessToken)
          .then((res) => res.json())
          .then((response) => {
            console.log(response);
            if (response.success) {
              Cookies.set("fb-session", response.sessionCookie);
              fetch(serverURL + "/checkauth", {
                headers: { "fb-session": response.sessionCookie },
              }).then(() => {
                setCounter((prev) => prev + 1);
              });
            } else {
              Cookies.remove("fb-session");
            }
          });
      } else {
        Cookies.remove("fb-session");
      }
    })();
  }, [user]);
  useEffect(() => {
    if (!user) return;
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
  }, [user, counter]);
  return <authContext.Provider value={value}>{children}</authContext.Provider>;
};
