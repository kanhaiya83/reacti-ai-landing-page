import React from "react";

const ServiceBox = ({ service }) => {
  return (
    <div className="service-box">
      <img src={service.img} alt="service icon" />
      <h1>{service.title}</h1>
      <p>{service.body}</p>
    </div>
  );
};

export default ServiceBox;
