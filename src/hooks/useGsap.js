import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useGsap = () => {
  const slideUpRef = useRef(null);
  useEffect(() => {
    const box = slideUpRef.current;

    gsap.fromTo(
      box,
      {
        y: 100,
        opacity: 0,
        // duration: 1,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: box,
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);
  return slideUpRef;
};

export default useGsap;
