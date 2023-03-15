import React from "react";
import "./reviews.css";
import card from "../../assets/Card.svg";
import bg from "../../assets/twBg.png";
import card2 from "../../assets/Card (1).svg";
import card3 from "../../assets/Card (2).svg";
import bg2 from "../../assets/Mask group (1).png";
import bg3 from "../../assets/Mask group (2).png";
import { BsArrowRightSquare, BsArrowLeftSquare } from "react-icons/bs";

const Reviews = () => {
  return (
    <div className="reviews">
      <div className="heading">
        <h1>What our clients say</h1>
        <p>
          Rmet facilisi arcu odio urna aenean erat. Pellentesque in vitae
          lobortis orci tincidunt facilisis. Pulvinar lacus ultricies turpis
          urna sapien.
        </p>
      </div>

      <div className="reviews-wrap">
        <div className="review-box">
          <img className="review" src={card} alt="card" />
          <img className="bg" src={bg} alt="background" />
        </div>
        <div className="review-box">
          <img className="review" src={card2} alt="card" />
          <img className="bg" src={bg2} alt="background" />
        </div>
        <div className="review-box">
          <img className="review" src={card3} alt="card" />
          <img className="bg" src={bg3} alt="background" />
        </div>
      </div>

      <div className="nav-wrap">
        <div>
          <BsArrowLeftSquare />
          <BsArrowRightSquare />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
