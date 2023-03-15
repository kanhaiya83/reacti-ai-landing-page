import React from "react";
import "./footer.css";
import logo from "../../assets/logo.png";

const Footer = () => {
  return (
    <footer>
      <div className="left">
        <img src={logo} alt="logo" />
        <div className="sub">
          <h1>Subscribe to our newsletter</h1>
          <input type="email" placeholder="Enter Your Email" />
          <button>Subscribe</button>
        </div>
      </div>

      <div className="links-wrap">
        <ul>
          <h1>Pages</h1>
          <li>Home</li>
          <li>About</li>
          <li>Contact</li>
          <li>Blog</li>
          <li>Blog post</li>
          <li>Pricing</li>
          <li>Pricing single</li>
        </ul>
        <ul>
          <li>Features</li>
          <li>Careers</li>
          <li>Careers single</li>
          <li>Request a demo</li>
          <li>Login</li>
          <li>SIgn Up</li>
        </ul>
        {/* <ul>
          <h1>Utlity Pages</h1>
          <li>Style guide</li>
          <li>Password protected</li>
          <li>404 not found</li>
          <li>Licenses</li>
          <li>Changelog</li>
        </ul> */}
      </div>
    </footer>
  );
};

export default Footer;
