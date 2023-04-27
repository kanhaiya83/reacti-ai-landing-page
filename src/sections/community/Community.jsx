import React from "react";
import "./community.css";
import logo from "../../assets/discordLogo.png";
import useGsap from "../../hooks/useGsap";

const Community = () => {
  const slideUpRef = useGsap();
  return (
    <div ref={slideUpRef} className="community">
      <div className="bg">
        <img src={logo} alt="discord logo" />
        <h1>Join the community</h1>
        <p>
          Join our Beta Tester community and contribute to a more private and
          decentralized internet. Start for free.
        </p>
        <button>Join Discord</button>
      </div>
    </div>
  );
};

export default Community;
