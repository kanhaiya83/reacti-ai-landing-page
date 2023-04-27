import React, { useState } from "react";
import "./navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/authContext";
import {
  signOut,
} from "firebase/auth";
import { auth } from "../../utils/firebase";
const handleLogout = async () => {
      await signOut(auth);
    };
const Navbar = ({ show, setShow }) => {
  const handleShow = () => {
    setShow(true);
  };

  const handleHide = () => {
    setShow(false);
  };
  const { user } = useAuthContext();
  return (
    <nav>
      {/* <h1 className="logo">REACTI.AI</h1> */}
      <Link to="/" className="logo">
            REACTI.AI
          </Link>
      <ul className={`navlinks ${show ? "show" : "hide"}`}>
        <FaTimes onClick={handleHide} />
        <li onClick={handleHide}>
          <a href="#About">Home</a>
        </li>
        <li onClick={handleHide}>
          <a href="#About">About</a>
        </li>
        <li onClick={handleHide}>
          <a href="#About">Features</a>
        </li>
        <li onClick={handleHide}>
          <Link to="/pricing">Pricing</Link>
        </li>
        <li onClick={handleHide}>
          <a href="#About">Blog</a>
        </li>
      </ul>

      <div className="flex gap-4 items-center">
      <Link to={user ? "/profile":"/login"} className="external-link" >
      {user ? "Profile":"Login"}
          </Link>
          {user && <button onClick={handleLogout} className="external-link bg-slate-800" >
      Logout
          </button>}
      </div>

      <FaBars onClick={handleShow} />
    </nav>
    
  );
};

export default Navbar;
