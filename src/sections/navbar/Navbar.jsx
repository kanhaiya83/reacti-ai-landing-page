import React, { useState } from "react";
import "./navbar.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleHide = () => {
    setShow(false);
  };

  return (
    <nav>
      <h1 className="logo">REACT.AI</h1>

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
          <a href="#About">Pricing</a>
        </li>
        <li onClick={handleHide}>
          <a href="#About">Blog</a>
        </li>
      </ul>
<div>
      <a className="external-link" href="https://chrome.google.com/webstore/detail/reacti-ai/pmikjafnekojjckgdhcdmimoegkemdfj" target="blank">
        Get a demo
      </a>
      <Link className="profile-link ml-4" to="/profile">
        Profile
      </Link>
      </div>
      <FaBars onClick={handleShow} />
    </nav>
  );
};

export default Navbar;
