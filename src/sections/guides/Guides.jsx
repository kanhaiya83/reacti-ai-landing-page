import React from "react";
import "./guides.css";
import image1 from "../../assets/frame43.png";
import image2 from "../../assets/Frame 48.png";
import image3 from "../../assets/frame20.png";

const Guides = () => {
  return (
    <div className="guides">
      <div className="heading">
        <h1>How to Install Reacti.ai Extension</h1>
        <p>
          Installing the Reacti.ai extension is quick and easy. Follow these
          steps to get started:
        </p>
      </div>

      <div className="card1">
        <div>
          <h1>7 Simple Steps to Install and Use Reacti.ai </h1>
          <ol type="1">
            <li>Go to the Chrome Web Store or Brave Store.</li>
            <li>
              Search for "Reacti.ai" or visit the page via the "Install
              Extension" link on the top navigation bar.
            </li>
            <li>
              Click "Add to Chrome" or "Add to Brave" to install the extension.
            </li>
          </ol>
          <button>Learn More</button>
        </div>

        <img src={image1} alt="extension" />
      </div>

      <div className="card2">
        <div>
          <div>
            <h1>Pin the extension for easy access.</h1>
            <ol type="1">
              <li>Visit Twitter and select a tweet you want to reply to.</li>
              <li>
                In the comment section, select one of the suggested tones based
                on the tweet's context and hit enter.
              </li>
              <li>Reacti.ai will generate a reply for you to post.</li>
              <li>
                Boost your engagement by replying more and connecting with your
                audience.
              </li>
            </ol>
          </div>

          <img src={image3} alt="stats" />
        </div>

        <img src={image2} alt="Twitter" />
      </div>

      <div className="btns">
        <div>
          <button className="btn1">Get a Started</button>
          <button className="btn2">Browse all feature</button>
        </div>
      </div>
    </div>
  );
};

export default Guides;
