import React from "react";
import useGsap from "../hooks/useGsap";

const ServiceBox = ({ service }) => {
  const slideUpRef = useGsap();
  return (
    <div ref={slideUpRef} className="service-box">
      <img src={service.img} alt="service icon" />
      <h1>{service.title}</h1>
      <p>{service.body}</p>
    </div>
  );
};

export default ServiceBox;
