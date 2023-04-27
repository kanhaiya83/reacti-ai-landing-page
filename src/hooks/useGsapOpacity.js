import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useGsapOpacity = () => {
  const opacityRef = useRef(null);
  useEffect(() => {
    const box = opacityRef.current;

    gsap.fromTo(
      box,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 2,
        scrollTrigger: {
          trigger: box,
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);
  return opacityRef;
};

export default useGsapOpacity;
