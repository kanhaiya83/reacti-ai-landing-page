import React from "react";
import { servicesItems } from "../../assets/sources/services";
import ServiceBox from "../../components/ServiceBox";
import useGsapOpacity from "../../hooks/useGsapOpacity";
import "./services.css";

const Services = () => {
  const opacityRef = useGsapOpacity();
  return (
    <div className="services">
      <div className="wrap">
        <div ref={opacityRef} className="heading">
          <h1>Tweet Growth Made Easy with Powerful Features</h1>
          <p>
            Maximise Productivity and Community Engagement with Reacti.ai:
            Effortlessly cultivate a loyal following by being clever and funny
            with AI-powered response suggestions.
          </p>
        </div>

        <div className="services-wrap">
          {servicesItems.map((service, index) => (
            <ServiceBox key={index} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
