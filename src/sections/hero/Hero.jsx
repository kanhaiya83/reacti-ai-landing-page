import React from "react";
import "./hero.css";
import Calendar from "../../assets/Calendar.png";
import InfoBox from "../../components/InfoBox";
import FollowersIcon from "../../assets/followers.png";
import Show from "../../assets/Show.png";
import Chart from "../../assets/Chart.png";
import arrow from "../../assets/Rightarrow.png";
import notif from "../../assets/Notification.png";
import person from "../../assets/People.png";
import { FaSearch } from "react-icons/fa";
import useGsap from "../../hooks/useGsap";
import useGsapOpacity from "../../hooks/useGsapOpacity";

const infoBoxesItems = [
  {
    labelName: "Followers",
    labelImg: FollowersIcon,
    value: 92680,
    realVal: "92,680",
    valueSign: ",",
    decimal: 0,
    sign: "",
    valColor: "#DDEFFA",
    percent: "+3,840 (26,80%)",
    percentColor: "white",
    bgColor: "#0329E8",
  },
  {
    labelName: "Tweet views",
    labelImg: Show,
    value: 580.5,
    realVal: "580.5",
    valueSign: ".",
    decimal: 1,
    sign: "k",
    valColor: "#17B1EA",
    percent: "+210K (16,20%)",
    percentColor: "#00DE73",
    bgColor: "#282D45",
  },
  {
    labelName: "Bounce rates",
    labelImg: Chart,
    value: 15.43,
    realVal: "15.43",
    valueSign: ".",
    decimal: 2,
    sign: "%",
    valColor: "#17B1EA",
    percent: "-0.74 (0.74%)",
    percentColor: "#F21010",
    bgColor: "#282D45",
  },
];

const Hero = () => {
  const slideUpRef = useGsap();
  const opacityRef = useGsapOpacity();
  return (
    <div className="hero">
      <div className="section1">
        <h1>Don't just post, engage!</h1>
        <h2>Boost your Twitter power by replying more and posting less.</h2>

        <p>
          Reinvent Your Twitter Game: Go Beyond Posting and Start Engaging by
          Replying More and <br /> Posting Less with Reacti.ai.
        </p>

        <div className="btns">
          <button className="btn1">Get a demo</button>
          <button className="btn2">View pricing</button>
        </div>
      </div>

      <div ref={opacityRef} className="section2">
        <div className="labels">
          <div className="left">
            <h1>Tweet perfomance</h1>
            <p>Today vs 7 days ago</p>
          </div>

          <div className="right">
            <img src={Calendar} alt="calendar Calendar" /> June 03, 22 to July
            02, 22
          </div>
        </div>

        <div className="info-boxes">
          {infoBoxesItems.map((info, index) => (
            <InfoBox key={index} info={info} />
          ))}
          <p>
            View all <img src={arrow} alt="right arrow" />
          </p>
        </div>

        <div ref={slideUpRef} className="navbar">
          <div className="input">
            <input type="search" placeholder="Search..." />
            <FaSearch />
          </div>

          <ul>
            <li>
              <a href="#about">Analytics</a>
            </li>
            <li>
              <a href="#about">Following</a>
            </li>
            <li>
              <a href="#about">Reply count</a>
            </li>
          </ul>

          <div>
            <img src={notif} alt="notif icon" />
            <img className="person-img" src={person} alt="person" />
            <div>
              <p>Welcome</p>
              <h1>Daniel Estasmos</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
