import "../App.css";
import Guides from "../sections/guides/Guides";
import Hero from "../sections/hero/Hero";
import Navbar from "../sections/navbar/Navbar";
import Services from "../sections/services/Services";
import twitterHome from "../assets/Frame 49.png";
import Reviews from "../sections/reviews/Reviews";
import Community from "../sections/community/Community";
import Blog from "../sections/blog/Blog";
import Footer from "../sections/footer/Footer";

function HomePage() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Services />
      <Guides />
      <div className="twitterImg-wrap">
        <div>
          <img src={twitterHome} alt="Twitter Homepage" />
        </div>
      </div>
      <Reviews />
      <Community />
      <Blog />
      <Footer />
      <div className="btns-section">
        <div>
          <div>
            <button className="btn1">View pricing</button>
          </div>
          <button className="btn2">Get a demo</button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
