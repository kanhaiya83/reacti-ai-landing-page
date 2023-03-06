import React from "react";
import Footer from "../sections/footer/Footer";
import Navbar from "../sections/navbar/Navbar";

const PrivacyPolicyPage = () => {
  return (
    <div>
      <Navbar />
      <div className="px-[10%]">
        <div className=" max-w-[1200px] mx-auto flex flex-col items-stretch text-slate-100 py-16">
          <h1 className="text-3xl text-center my-4">
            Privacy Policy for Reacti.AI Chrome Extension
          </h1>
          <p className="mb-4">
            Reacti.AI (“us”, “we”, or “our”) operates the Reacti.AI Chrome
            Extension (the “Service”). This page informs you of our policies
            regarding the collection, use, and disclosure of personal data when
            you use our Service and the choices you have associated with that
            data
          </p>
          <p className="mb-4">
            We use your data to provide and improve the Service. By using the
            Service, you agree to the collection and use of information in
            accordance with this policy. Unless otherwise defined in this
            Privacy Policy, terms used in this Privacy Policy have the same
            meanings as in our Terms and Conditions, accessible from
            https://www.reacti.ai/.
          </p>
          <h1 className="text-2xl my-4">Information Collection and Use</h1>

          <p className="mb-4">
            We collect several different types of information for various
            purposes to provide and improve our Service to you.
          </p>
          <h1 className="text-2xl mt-4 mb-2">Types of Data Collected</h1>
          <div className="ml-[3%]">
            <h2 className="text-xl mb-4">Personal Data</h2>

            <p className="mb-2 ml-[3%]">
              While using our Service, we may ask you to provide us with certain
              personally identifiable information that can be used to contact or
              identify you (“Personal Data”). Personally identifiable
              information may include, but is not limited to:
            </p>
            <ul className="ml-[10%] list-disc">
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Address, State, Province, ZIP/Postal code, City</li>
              <li>Cookies and Usage Data</li>
            </ul>
            <h2 className="text-xl  mt-8 mb-4">Usage Data</h2>

            <p className="mb-2 ml-[3%]">
              We may also collect information on how the Service is accessed and
              used (“Usage Data”). This Usage Data may include information such
              as your computer’s Internet Protocol address (e.g. IP address),
              browser type, browser version, the pages of our Service that you
              visit, the time and date of your visit, the time spent on those
              pages, unique device identifiers and other diagnostic data.
            </p>
            <h2 className="text-xl mt-8 mb-4">Tracking & Cookies Data</h2>
            <p className="mb-2 ml-[3%]">
              We use cookies and similar tracking technologies to track the
              activity on our Service and hold certain information.
            </p>
            <p className="mb-2 ml-[3%]">
              Cookies are files with small amounts of data which may include an
              anonymous unique identifier. Cookies are sent to your browser from
              a website and stored on your device. Tracking technologies also
              used are beacons, tags, and scripts to collect and track
              information and to improve and analyze our Service.
            </p>

            <p className="mb-2 ml-[3%]">
              You can instruct your browser to refuse all cookies or to indicate
              when a cookie is being sent. However, if you do not accept
              cookies, you may not be able to use some portions of our Service.
            </p>

            <p className="mb-2 ml-[3%]">Examples of Cookies we use:</p>
            <ul className="list-disc ml-[10%]">
              <li>
                Session Cookies. We use Session Cookies to operate our Service.
              </li>
              <li>
                Preference Cookies. We use Preference Cookies to remember your
                preferences and various settings.
              </li>
              <li>
                Security Cookies. We use Security Cookies for security purposes.
              </li>
            </ul>
          </div>
          <h1 className="text-2xl mt-4 mb-2">Use of Data</h1>
          <p className="mb-2">
            Reacti.AI uses the collected data for various purposes:
          </p>
          <ul className="list-disc ml-[5%]">
            <li>To provide and maintain the Service</li>
            <li>To notify you about changes to our Service</li>
            <li>
              To allow you to participate in interactive features of our Service
              when you choose to do so
            </li>
            <li>To provide customer care and support</li>
            <li>
              To provide analysis or valuable information so that we can improve
              the Service
            </li>
            <li>To monitor the usage of the Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
         <h1 className="text-2xl mt-4 mb-2">Transfer of Data</h1>
<p className="mb-3">Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.
</p>
<p className="mb-3">
If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there.</p>
<p className="mb-3">
Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</p>
<p className="mb-3">
Reacti.AI will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.</p>
<h1 className="text-2xl mt-4 mb-2">Disclosure of Data</h1>
<h1 className="text-2xl mt-4 mb-2">Legal Requirements</h1>
<p className="ml-[5%]">Reacti.AI may disclose your Personal Data in the good faith belief that such action is
</p>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default PrivacyPolicyPage;
