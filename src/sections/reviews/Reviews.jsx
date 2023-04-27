import React from "react";
import "./reviews.css";
import card from "../../assets/Card.svg";
import bg from "../../assets/twBg.png";
import card2 from "../../assets/Card (1).svg";
import card3 from "../../assets/Card (2).svg";
import bg2 from "../../assets/Mask group (1).png";
import bg3 from "../../assets/Mask group (2).png";
import { BsArrowRightSquare, BsArrowLeftSquare } from "react-icons/bs";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import useGsapOpacity from "../../hooks/useGsapOpacity";

gsap.registerPlugin(ScrollTrigger);

const Reviews = () => {
  const opacityRef = useGsapOpacity();

  const review1 = useRef(null);
  const review2 = useRef(null);
  const review3 = useRef(null);

  useEffect(() => {
    const reviewItem1 = review1.current;
    const reviewItem2 = review2.current;
    const reviewItem3 = review3.current;

    gsap.from(reviewItem1, {
      y: 100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: reviewItem1,
        toggleActions: "play none none reverse",
      },
    });
    gsap.from(reviewItem2, {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 0.2,
      scrollTrigger: {
        trigger: reviewItem2,
        toggleActions: "play none none reverse",
      },
    });
    gsap.from(reviewItem3, {
      y: 100,
      opacity: 0,
      duration: 1,
      delay: 0.4,
      scrollTrigger: {
        trigger: reviewItem3,
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <div className="reviews">
      <div ref={opacityRef} className="heading">
        <h1>What our clients say</h1>
        <p>
          Rmet facilisi arcu odio urna aenean erat. Pellentesque in vitae
          lobortis orci tincidunt facilisis. Pulvinar lacus ultricies turpis
          urna sapien.
        </p>
      </div>

      <div className="reviews-wrap">
        <div ref={review1} className="review-box">
          <img className="review" src={card} alt="card" />
          <img className="bg" src={bg} alt="background" />
        </div>
        <div ref={review2} className="review-box">
          <img className="review" src={card2} alt="card" />
          <img className="bg" src={bg2} alt="background" />
        </div>
        <div ref={review3} className="review-box">
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
