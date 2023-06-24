import "../App.css";
import Guides from "../sections/guides/Guides";
import Hero from "../sections/hero/Hero";
import Navbar from "../sections/navbar/Navbar";
import Services from "../sections/services/Services";
import twitterHome from "../assets/Frame 49.png";
import Reviews from "../sections/reviews/Reviews";
import Community from "../sections/community/Community";
import Footer from "../sections/footer/Footer";
import { useState } from "react";
import useGsap from "../hooks/useGsap";

function App() {
  const [show, setShow] = useState(false);

  const slideUpRef = useGsap();

  return (
    <div>
      <Navbar show={show} setShow={setShow} />
      <Hero />
      <Services />
      {/* <Guides /> */}
      <div ref={slideUpRef} className="twitterImg-wrap">
        <div>
          <img src={twitterHome} alt="Twitter Homepage" />
        </div>
      </div>
      <Reviews />
      <Community />
      <Footer />
    </div>
  );
}

export default App;
