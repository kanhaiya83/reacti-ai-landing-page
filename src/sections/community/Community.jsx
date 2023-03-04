import React from "react";
import "./community.css";
import logo from "../../assets/discordLogo.png";

const Community = () => {
  return (
    <div className="community">
      <div className="bg">
        <img src={logo} alt="discord logo" />
        <h1>Join the community</h1>
        <p>
          Join our 400,000+ person community and contribute to a more private
          and decentralized internet. Start for free.
        </p>
        <button>Join Discord</button>
      </div>
    </div>
  );
};

export default Community;
