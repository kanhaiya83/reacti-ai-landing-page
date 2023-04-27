import React, { useState } from "react";
import { IoSwapVertical } from "react-icons/io5";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";

const InfoBox = ({ info }) => {
  const [counterOn, setCounterOn] = useState(false);
  const [counterPlayed, setCounterPlayed] = useState(false);

  const setCounterTrue = () => {
    if (counterPlayed) {
      return;
    } else {
      setCounterOn(true);
      setCounterPlayed(true);
    }
  };
  return (
    <div>
      <div className="info-box" style={{ backgroundColor: info.bgColor }}>
        <div className="label">
          <p>{info.labelName}</p>
          <img
            src={info.labelImg}
            width="28"
            height="28"
            alt="followers Icon"
          />
        </div>
        <ScrollTrigger
          onEnter={setCounterTrue}
          onExit={() => setCounterOn(false)}
        >
          <h1 className="value">
            {counterOn ? (
              <CountUp
                end={info.value}
                duration={2}
                delay={0}
                separator={info.valueSign}
                decimals={info.decimal}
                decimal={info.valueSign}
              />
            ) : (
              info.realVal
            )}
            {info.sign}
          </h1>
        </ScrollTrigger>
        <div className="percent">
          <p style={{ color: info.percentColor }}>{info.percent}</p>
          <IoSwapVertical color={info.percentColor} />
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
