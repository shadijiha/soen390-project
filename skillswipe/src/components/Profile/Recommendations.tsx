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
      <style jsx>
        {`
          .home-container {
            width: 100%;
            display: flex;
            overflow: auto;
            min-height: 100vh;
            align-items: center;
            flex-direction: column;
          }
          .home-testimonial {
            width: 100%;
            display: flex;
            justify-content: center;
            background-color: 232323;
          }
          .home-container1 {
            width: 100%;
            display: flex;
            padding: var(--dl-space-space-threeunits);
            max-width: var(--dl-size-size-maxwidth);
            align-items: center;
            flex-direction: column;
            justify-content: center;
          }
          .home-text {
            color: var(--dl-color-gray-white);
          }
          .home-text03 {
            font-size: 0.75rem;
            max-width: 600px;
            margin-top: var(--dl-space-space-unit);
            text-align: center;
            margin-bottom: var(--dl-space-space-twounits);
          }
          .home-container2 {
            width: 100%;
            display: grid;
            grid-gap: var(--dl-space-space-twounits);
            grid-template-columns: 1fr 1fr 1fr;
          }
          .home-testimonial-card {
            display: flex;
            padding: var(--dl-space-space-twounits);
            max-width: var(--dl-size-size-maxwidth);
            background: #fff;
            box-shadow: 0px 0px 10px 10px rgba(18, 18, 18, 0.1);
            align-items: center;
            flex-direction: column;

            justify-content: space-between;
          }
          .home-icon {
            width: 2rem;
            margin-bottom: var(--dl-space-space-twounits);
          }
          .home-testimonial1 {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: space-between;
          }
          .home-text05 {
            color: var(--dl-color-gray-500);
            text-align: center;
            margin-bottom: var(--dl-space-space-threeunits);
          }
          .home-text06 {
            font-size: 1.5rem;
            font-weight: 300;
            margin-bottom: var(--dl-space-space-halfunit);
          }
          .home-text07 {
            color: var(--dl-color-gray-500);
            font-weight: 600;
            margin-bottom: var(--dl-space-space-unit);
            text-transform: uppercase;
          }
          .home-image {
            width: var(--dl-size-size-medium);
            height: var(--dl-size-size-medium);
            object-fit: cover;
            border-radius: var(--dl-radius-radius-round);
          }

          .home-icon2 {
            width: 2rem;
            margin-bottom: var(--dl-space-space-twounits);
          }
          .home-testimonial2 {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: space-between;
          }
          .home-text08 {
            color: var(--dl-color-gray-500);
            text-align: center;
            margin-bottom: var(--dl-space-space-threeunits);
          }
          .home-text09 {
            font-size: 1.5rem;
            font-weight: 300;
            margin-bottom: var(--dl-space-space-halfunit);
          }
          .home-text10 {
            color: var(--dl-color-gray-500);
            font-weight: 600;
            margin-bottom: var(--dl-space-space-unit);
            text-transform: uppercase;
          }
          .home-image1 {
            width: var(--dl-size-size-medium);
            height: var(--dl-size-size-medium);
            object-fit: cover;
            border-radius: var(--dl-radius-radius-round);
          }

          .home-icon4 {
            width: 2rem;
            margin-bottom: var(--dl-space-space-twounits);
          }
          .home-testimonial3 {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: space-between;
          }
          .home-text11 {
            color: var(--dl-color-gray-500);
            text-align: center;
            margin-bottom: var(--dl-space-space-threeunits);
          }
          .home-text12 {
            font-size: 1.5rem;
            font-weight: 300;
            margin-bottom: var(--dl-space-space-halfunit);
          }
          .home-text13 {
            color: var(--dl-color-gray-500);
            font-weight: 600;
            margin-bottom: var(--dl-space-space-unit);
            text-transform: uppercase;
          }
          .home-image2 {
            width: var(--dl-size-size-medium);
            height: var(--dl-size-size-medium);
            object-fit: cover;
            border-radius: var(--dl-radius-radius-round);
          }
          @media (max-width: 991px) {
            .home-text {
              text-align: center;
            }
            .home-text03 {
              text-align: center;
            }
            .home-container2 {
              grid-template-columns: 1fr;
            }
            .home-text07 {
              align-self: center;
            }
            .home-text10 {
              align-self: center;
            }
            .home-text13 {
              align-self: center;
            }
          }
          @media (max-width: 767px) {
            .home-container1 {
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
            }
            .home-testimonial-card {
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
            }
            .home-testimonial-card {
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
            }
            .home-testimonial-card {
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
            }
          }
          @media (max-width: 479px) {
            .home-container1 {
              padding-top: var(--dl-space-space-twounits);
              padding-left: var(--dl-space-space-unit);
              padding-right: var(--dl-space-space-unit);
              padding-bottom: var(--dl-space-space-twounits);
            }
            .home-testimonial-card {
              padding-top: var(--dl-space-space-twounits);
              padding-left: var(--dl-space-space-unit);
              padding-right: var(--dl-space-space-unit);
              padding-bottom: var(--dl-space-space-twounits);
            }
            .home-icon {
              margin-bottom: var(--dl-space-space-unit);
            }
            .home-text05 {
              margin-bottom: var(--dl-space-space-twounits);
            }
            .home-text06 {
              margin-bottom: var(--dl-space-space-halfunit);
            }
            .home-text07 {
              margin-bottom: var(--dl-space-space-unit);
            }
            .home-testimonial-card {
              padding-top: var(--dl-space-space-twounits);
              padding-left: var(--dl-space-space-unit);
              padding-right: var(--dl-space-space-unit);
              padding-bottom: var(--dl-space-space-twounits);
            }
            .home-icon2 {
              margin-bottom: var(--dl-space-space-unit);
            }
            .home-text08 {
              margin-bottom: var(--dl-space-space-twounits);
            }
            .home-text09 {
              margin-bottom: var(--dl-space-space-halfunit);
            }
            .home-text10 {
              margin-bottom: var(--dl-space-space-unit);
            }
            .home-testimonial-card {
              padding-top: var(--dl-space-space-twounits);
              padding-left: var(--dl-space-space-unit);
              padding-right: var(--dl-space-space-unit);
              padding-bottom: var(--dl-space-space-twounits);
            }
            .home-icon4 {
              margin-bottom: var(--dl-space-space-unit);
            }
            .home-text11 {
              margin-bottom: var(--dl-space-space-twounits);
            }
            .home-text12 {
              margin-bottom: var(--dl-space-space-halfunit);
            }
            .home-text13 {
              margin-bottom: var(--dl-space-space-unit);
            }
          }
        `}
      </style>
    </>
  );
};

export default Recommendations;
