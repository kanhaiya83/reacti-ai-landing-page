import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useGsap2 = () => {
  const slideUpRef2 = useRef(null);
  useEffect(() => {
    const box = slideUpRef2.current;

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
  return slideUpRef2;
};

export default useGsap2;
