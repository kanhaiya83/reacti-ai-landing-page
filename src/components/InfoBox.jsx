import React from "react";
import { IoSwapVertical } from "react-icons/io5";

const InfoBox = ({ info }) => {
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
        <h1 className="value">{info.value}</h1>
        <div className="percent">
          <p style={{ color: info.percentColor }}>{info.percent}</p>
          <IoSwapVertical color={info.percentColor} />
        </div>
      </div>
    </div>
  );
};

export default InfoBox;
