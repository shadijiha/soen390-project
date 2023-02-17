/* eslint-disable @next/next/no-img-element */
import ProfileStyle from "@/styles/profilestyle";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const Recommendations = (props: any) => {
  return (
    <>
      <style jsx>{ProfileStyle}</style>
      <div className="home-container">
        <div className="home-testimonial">
          <div className="home-container1">
            <h1
              style={{
                fontWeight: 600,
                fontSize: "2.5rem",
              }}
            >
              <span>What People are Saying</span>
              <br></br>
              <span></span>
            </h1>
            <span className="home-text03">
              <span>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
                volutpat turpis. Mauris luctus rutrum mi ut rhoncus. Integer in
                dignissim tortor.
              </span>
            </span>
            <div className="home-container2">
              {/* first testimonial */}
              <div
                className="home-testimonial-card"
                style={{
                  borderRadius: "20px",
                }}
              >
                <svg viewBox="0 0 950.8571428571428 1024" className="home-icon">
                  <path d="M438.857 182.857v402.286c0 161.143-131.429 292.571-292.571 292.571h-36.571c-20 0-36.571-16.571-36.571-36.571v-73.143c0-20 16.571-36.571 36.571-36.571h36.571c80.571 0 146.286-65.714 146.286-146.286v-18.286c0-30.286-24.571-54.857-54.857-54.857h-128c-60.571 0-109.714-49.143-109.714-109.714v-219.429c0-60.571 49.143-109.714 109.714-109.714h219.429c60.571 0 109.714 49.143 109.714 109.714zM950.857 182.857v402.286c0 161.143-131.429 292.571-292.571 292.571h-36.571c-20 0-36.571-16.571-36.571-36.571v-73.143c0-20 16.571-36.571 36.571-36.571h36.571c80.571 0 146.286-65.714 146.286-146.286v-18.286c0-30.286-24.571-54.857-54.857-54.857h-128c-60.571 0-109.714-49.143-109.714-109.714v-219.429c0-60.571 49.143-109.714 109.714-109.714h219.429c60.571 0 109.714 49.143 109.714 109.714z"></path>
                </svg>
                <div className="home-testimonial1">
                  <span className="home-text05">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    lorem lorem, malesuada in metus vitae, scelerisque accumsan
                    ipsum. Nam pellentesque nulla leo, sagittis vehicula sem
                    commodo nec.
                  </span>
                  <span className="home-text06">Jane Doe</span>
                  <span className="home-text07">SOFTWARE ENGINEER</span>
                  <img
                    alt="profile"
                    src="https://images.unsplash.com/photo-1557053910-d9eadeed1c58?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHdvbWFuJTIwcG9ydHJhaXR8ZW58MHx8fHwxNjI2NDUxOTgy&amp;ixlib=rb-1.2.1&amp;h=1200"
                    className="home-image"
                  />
                </div>
              </div>

              {/* second testimonial */}
              <div
                className="home-testimonial-card"
                style={{
                  borderRadius: "20px",
                }}
              >
                <svg
                  viewBox="0 0 950.8571428571428 1024"
                  className="home-icon2"
                >
                  <path d="M438.857 182.857v402.286c0 161.143-131.429 292.571-292.571 292.571h-36.571c-20 0-36.571-16.571-36.571-36.571v-73.143c0-20 16.571-36.571 36.571-36.571h36.571c80.571 0 146.286-65.714 146.286-146.286v-18.286c0-30.286-24.571-54.857-54.857-54.857h-128c-60.571 0-109.714-49.143-109.714-109.714v-219.429c0-60.571 49.143-109.714 109.714-109.714h219.429c60.571 0 109.714 49.143 109.714 109.714zM950.857 182.857v402.286c0 161.143-131.429 292.571-292.571 292.571h-36.571c-20 0-36.571-16.571-36.571-36.571v-73.143c0-20 16.571-36.571 36.571-36.571h36.571c80.571 0 146.286-65.714 146.286-146.286v-18.286c0-30.286-24.571-54.857-54.857-54.857h-128c-60.571 0-109.714-49.143-109.714-109.714v-219.429c0-60.571 49.143-109.714 109.714-109.714h219.429c60.571 0 109.714 49.143 109.714 109.714z"></path>
                </svg>
                <div className="home-testimonial2">
                  <span className="home-text08">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    lorem lorem, malesuada in metus vitae, scelerisque accumsan
                    ipsum. Nam pellentesque nulla leo, sagittis vehicula sem
                    commodo nec.
                  </span>
                  <span className="home-text09">Jane Doe</span>
                  <span className="home-text10">SOFTWARE ENGINEER</span>
                  <img
                    alt="profile"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDd8fHBvcnRyYWl0fGVufDB8fHx8MTYyNjM3ODk3Mg&amp;ixlib=rb-1.2.1&amp;h=1200"
                    className="home-image1"
                  />
                </div>
              </div>
              {/* third testimonial */}
              <div
                className="home-testimonial-card"
                style={{
                  borderRadius: "20px",
                }}
              >
                <svg
                  viewBox="0 0 950.8571428571428 1024"
                  className="home-icon4"
                >
                  <path d="M438.857 182.857v402.286c0 161.143-131.429 292.571-292.571 292.571h-36.571c-20 0-36.571-16.571-36.571-36.571v-73.143c0-20 16.571-36.571 36.571-36.571h36.571c80.571 0 146.286-65.714 146.286-146.286v-18.286c0-30.286-24.571-54.857-54.857-54.857h-128c-60.571 0-109.714-49.143-109.714-109.714v-219.429c0-60.571 49.143-109.714 109.714-109.714h219.429c60.571 0 109.714 49.143 109.714 109.714zM950.857 182.857v402.286c0 161.143-131.429 292.571-292.571 292.571h-36.571c-20 0-36.571-16.571-36.571-36.571v-73.143c0-20 16.571-36.571 36.571-36.571h36.571c80.571 0 146.286-65.714 146.286-146.286v-18.286c0-30.286-24.571-54.857-54.857-54.857h-128c-60.571 0-109.714-49.143-109.714-109.714v-219.429c0-60.571 49.143-109.714 109.714-109.714h219.429c60.571 0 109.714 49.143 109.714 109.714z"></path>
                </svg>
                <div className="home-testimonial3">
                  <span className="home-text11">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                    lorem lorem, malesuada in metus vitae, scelerisque accumsan
                    ipsum. Nam pellentesque nulla leo, sagittis vehicula sem
                    commodo nec.
                  </span>
                  <span className="home-text12">Jane Doe</span>
                  <span className="home-text13">SOFTWARE ENGINEER</span>
                  <img
                    alt="profile"
                    src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDd8fHdvbWFuJTIwcG9ydHJhaXR8ZW58MHx8fHwxNjI2NDUxOTgy&amp;ixlib=rb-1.2.1&amp;h=1200"
                    className="home-image2"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Recommendations;
