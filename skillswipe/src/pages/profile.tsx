/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import NavBar from "@/components/NavBar";
import FeatureCard4 from "../components/feature-card4";
import React, { CSSProperties, useEffect, useState } from "react";
import { checkLogin } from "./api/api";
import Layout from "@/components/Layout";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";

import router from "next/router";
import ProfileStyle from "../styles/profilestyle";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Profile = () => {
  const { toggleColorMode } = useColorMode();
  const buttonColors = useColorModeValue("black", "white");
  const User = useSelector((state) => state as any);
  const router = useRouter();
  useEffect(() => {
    console.log(User);
  }, [User]);

  const [profile, setProfile] = useState({
    name: "",
    title: "",
    location: "",
    school: "",
    experience: "Five years of experience in full stack development",
    experience2: "Three years of experience in mobile development",
    experience3: "Two years of experience in data analysis",
    image:
      "https://marketplace.canva.com/EAFKZzWYqqE/1/0/1600w/canva-purple-navy-neon-gradient-modern-minimalist-man-tiktok-profile-picture-kqzwo_88iLY.jpg",
    cover:
      "https://img.rawpixel.com/private/static/images/website/2022-05/v904-nunny-016_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=d04dc64ebef3b6c3ad40a5687bbe31dc",
  });

  return (
    <>
      <style jsx>{ProfileStyle}</style>
      <Layout>
        <NavBar />

        <div data-testid="profile-page">
          <div
            id="profile"
            className="profile-container"
            style={{
              marginTop: "-3em",
            }}
          >
            <Head>
              <title>SkillSwipe</title>
              <meta property="og:title" content="SkillSwipe" />
            </Head>

            {/* profile picture */}
            <div className="profile-top-card">
              <img
                alt="image"
                src={
                  User.auth.profilePic
                    ? `data:image/jpeg;base64,${User.auth.profilePic}`
                    : profile.image
                }
                className="profile-image"
                style={{
                  aspectRatio: "1/1",
                  objectFit: "cover",
                }}
              />

              <div
                className="profile-container01"
                style={{
                  backgroundImage: `url(${
                    User.auth.coverPic
                      ? `data:image/jpeg;base64,${User.auth.coverPic}`
                      : profile.image
                  })`,
                }}
              >
                <h1
                  className="profile-text01"
                  style={{
                    fontSize: "1.5em",
                    fontWeight: 700,
                    textShadow: "0px 0px 30px #00000085",
                  }}
                >
                  {User.auth.firstName + " " + User.auth.lastName}
                </h1>
                <span
                  className="profile-text02"
                  style={{
                    fontSize: "1em",
                    textShadow: "0px 0px 30px #00000085",
                  }}
                >
                  📨 {User.auth.email}
                </span>
                <span
                  className="profile-text03"
                  style={{
                    fontSize: "1em",
                    textShadow: "0px 0px 30px #00000085",
                  }}
                >
                  <span>📲 {User.auth.mobileNo}</span>
                  <br></br>
                  <br></br>
                </span>
                <div className="profile-container03">
                  <span
                    className="profile-text06"
                    style={{
                      textShadow: "0px 0px 30px #000000B4",
                      marginLeft: "0px",
                    }}
                  >
                    {User.auth.biography}
                  </span>
                </div>

                <div
                  className="profile-container05"
                  style={{
                    marginTop: "-1em",
                  }}
                >
                  <button
                    className="profile-button button"
                    style={{
                      color: buttonColors,
                      borderColor: buttonColors,
                      borderWidth: "2px",
                      textShadow: "0px 0px 40px #000000CA",
                      fontWeight: 600,
                      marginRight: "1em",
                    }}
                  >
                    <span>
                      <span>Message</span>
                    </span>
                  </button>
                  <button
                    className="profile-button1 button"
                    style={{
                      color: buttonColors,
                      borderColor: buttonColors,
                      borderWidth: "2px",
                      textShadow: "0px 0px 40px #000000CA",
                      fontWeight: 600,
                      marginRight: "1em",
                    }}
                  >
                    Connect
                  </button>
                  {/* to do: show this edit button only if user logged in == the profile that is shown */}
                  <button
                    className="profile-button1 button"
                    style={{
                      color: buttonColors,
                      borderColor: buttonColors,
                      borderWidth: "2px",
                      textShadow: "0px 0px 40px #000000CA",
                      fontWeight: 600,
                    }}
                    onClick={() => {
                      router.push("/editProfile");
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>

            <div className="profile-steps">
              <h1
                className="profile-text10"
                style={{
                  fontWeight: 600,
                }}
              >
                Career Journey
              </h1>
              <span className="profile-text11">
                <span>i do bits and bytes for a living</span>
                <br></br>
              </span>
              <div className="profile-container06">
                <div className="profile-step">
                  <div className="profile-container07">
                    <div className="profile-line"></div>
                    <div className="profile-container08">
                      <svg viewBox="0 0 1024 1024" className="profile-icon">
                        <path d="M634 558q92-64 92-174 0-88-63-151t-151-63-151 63-63 151q0 46 27 96t65 78l36 26v98h172v-98zM512 86q124 0 211 87t87 211q0 156-128 244v98q0 18-12 30t-30 12h-256q-18 0-30-12t-12-30v-98q-128-88-128-244 0-124 87-211t211-87zM384 896v-42h256v42q0 18-12 30t-30 12h-172q-18 0-30-12t-12-30z"></path>
                      </svg>
                    </div>
                    <div className="profile-line1"></div>
                  </div>
                  <div className="profile-container09">
                    <h1 className="profile-text14">
                      <span>Genetec</span>
                      <br></br>
                    </h1>
                    <h3 className="profile-heading">2012 - 2014</h3>
                    <span className="profile-text17">
                      <span>Software Engineer Intern</span>
                      <br></br>
                    </span>
                  </div>
                </div>
                <div className="profile-step1">
                  <div className="profile-container10">
                    <div className="profile-line2"></div>
                    <div className="profile-container11">
                      <svg viewBox="0 0 1024 1024" className="profile-icon2">
                        <path d="M746 512q26 0 45-18t19-46-19-46-45-18-45 18-19 46 19 46 45 18zM618 342q26 0 45-19t19-45-19-45-45-19-45 19-19 45 19 45 45 19zM406 342q26 0 45-19t19-45-19-45-45-19-45 19-19 45 19 45 45 19zM278 512q26 0 45-18t19-46-19-46-45-18-45 18-19 46 19 46 45 18zM512 128q158 0 271 100t113 242q0 88-63 150t-151 62h-74q-28 0-46 19t-18 45q0 22 16 42t16 44q0 28-18 46t-46 18q-160 0-272-112t-112-272 112-272 272-112z"></path>
                      </svg>
                    </div>
                    <div className="profile-line3"></div>
                  </div>
                  <div className="profile-container12">
                    <h1 className="profile-text20">
                      <span>Twitter</span>
                      <br></br>
                    </h1>
                    <h3 className="profile-heading1">2014 - 2015</h3>
                    <span className="profile-text24">
                      <span>Launched Edit Button</span>
                      <br></br>
                    </span>
                  </div>
                </div>
                <div className="profile-step2">
                  <div className="profile-container13">
                    <div className="profile-line4"></div>
                    <div className="profile-container14">
                      <svg viewBox="0 0 1024 1024" className="profile-icon4">
                        <path d="M576 736l96 96 320-320-320-320-96 96 224 224z"></path>
                        <path d="M448 288l-96-96-320 320 320 320 96-96-224-224z"></path>
                      </svg>
                    </div>
                    <div className="profile-line5"></div>
                  </div>
                  <div className="profile-container15">
                    <h1 className="profile-text27">
                      <span>Facebook</span>
                      <br></br>
                    </h1>
                    <h3 className="profile-heading2">2015 - 2018</h3>
                    <span className="profile-text30">
                      <span>Co-Created React Native</span>
                      <br></br>
                    </span>
                  </div>
                </div>
                <div className="profile-step3">
                  <div className="profile-container16">
                    <div className="profile-line6"></div>
                    <div className="profile-container17">
                      <svg viewBox="0 0 1024 1024" className="profile-icon7">
                        <path d="M480 64c-265.096 0-480 214.904-480 480 0 265.098 214.904 480 480 480 265.098 0 480-214.902 480-480 0-265.096-214.902-480-480-480zM751.59 704c8.58-40.454 13.996-83.392 15.758-128h127.446c-3.336 44.196-13.624 87.114-30.68 128h-112.524zM208.41 384c-8.58 40.454-13.996 83.392-15.758 128h-127.444c3.336-44.194 13.622-87.114 30.678-128h112.524zM686.036 384c9.614 40.962 15.398 83.854 17.28 128h-191.316v-128h174.036zM512 320v-187.338c14.59 4.246 29.044 11.37 43.228 21.37 26.582 18.74 52.012 47.608 73.54 83.486 14.882 24.802 27.752 52.416 38.496 82.484h-155.264zM331.232 237.516c21.528-35.878 46.956-64.748 73.54-83.486 14.182-10 28.638-17.124 43.228-21.37v187.34h-155.264c10.746-30.066 23.616-57.68 38.496-82.484zM448 384v128h-191.314c1.88-44.146 7.666-87.038 17.278-128h174.036zM95.888 704c-17.056-40.886-27.342-83.804-30.678-128h127.444c1.762 44.608 7.178 87.546 15.758 128h-112.524zM256.686 576h191.314v128h-174.036c-9.612-40.96-15.398-83.854-17.278-128zM448 768v187.34c-14.588-4.246-29.044-11.372-43.228-21.37-26.584-18.74-52.014-47.61-73.54-83.486-14.882-24.804-27.75-52.418-38.498-82.484h155.266zM628.768 850.484c-21.528 35.876-46.958 64.746-73.54 83.486-14.184 9.998-28.638 17.124-43.228 21.37v-187.34h155.266c-10.746 30.066-23.616 57.68-38.498 82.484zM512 704v-128h191.314c-1.88 44.146-7.666 87.040-17.28 128h-174.034zM767.348 512c-1.762-44.608-7.178-87.546-15.758-128h112.524c17.056 40.886 27.344 83.806 30.68 128h-127.446zM830.658 320h-95.9c-18.638-58.762-44.376-110.294-75.316-151.428 42.536 20.34 81.058 47.616 114.714 81.272 21.48 21.478 40.362 44.938 56.502 70.156zM185.844 249.844c33.658-33.658 72.18-60.932 114.714-81.272-30.942 41.134-56.676 92.666-75.316 151.428h-95.898c16.138-25.218 35.022-48.678 56.5-70.156zM129.344 768h95.898c18.64 58.762 44.376 110.294 75.318 151.43-42.536-20.34-81.058-47.616-114.714-81.274-21.48-21.478-40.364-44.938-56.502-70.156zM774.156 838.156c-33.656 33.658-72.18 60.934-114.714 81.274 30.942-41.134 56.678-92.668 75.316-151.43h95.9c-16.14 25.218-35.022 48.678-56.502 70.156z"></path>
                      </svg>
                    </div>
                    <div className="profile-line7"></div>
                  </div>
                  <div className="profile-container18">
                    <h1 className="profile-text33">
                      <span>Instagram</span>
                      <br></br>
                    </h1>
                    <h3 className="profile-heading3">2018 - Present</h3>
                    <span className="profile-text36">
                      <span>Working</span>
                      <br></br>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* EDUCATION SECTION */}
            <div className="edu-container">
              <div className="edu-features">
                <h1
                  className="edu-text"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  <span>Education History</span>
                </h1>
                <span className="edu-text03">
                  <span>
                    Im a self-taught developer, but I have a degree in Computer
                    Science.
                  </span>
                </span>

                <div className="edu-container1">
                  <div className="edu-feature-card1">
                    <img
                      src="https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png"
                      className="edu-icon"
                      width="50px"
                      height="50px"
                      alt="Harvard"
                    />
                    <h2 className="edu-text09">Harvard</h2>
                    <span className="edu-text10">
                      TA for CS50, Harvards introductory course to computer
                      science.
                    </span>
                    <span className="edu-text11">2020-Present</span>
                  </div>
                  <div className="edu-feature-card">
                    <img
                      src="https://www.concordia.ca/content/concordia/en/social/guidelines-conduct.img.png/1650398601839.png"
                      className="edu-icon"
                      width="50px"
                      height="50px"
                      alt="Concordia University"
                    />
                    <h2 className="edu-text06">Concordia University</h2>
                    <span className="edu-text07">
                      Earned my bachelors degree in Computer Science, with a
                      minor in Mathematics.
                    </span>
                    <span className="edu-text08">2015-2020</span>
                  </div>
                  <div className="edu-feature-card2">
                    <img
                      src="https://penji.co/wp-content/uploads/2019/02/yale-university-School-Logo-Design-1-975x1024.png"
                      className="edu-icon"
                      width="50px"
                      height="50px"
                      alt="Yale"
                    />
                    <h2 className="edu-text12">Dawson</h2>
                    <span className="edu-text13">
                      Legally forced to complete my high school diploma in my
                      youth
                    </span>
                    <span className="edu-text14">2015</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PERSONAL PROJECTS */}
            <div className="personalProj-container">
              <div className="personalProj-features">
                <h1
                  className="personalProj-text"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  Personal Projects
                </h1>
                <div className="personalProj-container1">
                  <div className="personalProj-feature-card">
                    <h2 className="personalProj-text1">Lorem ipsum</h2>
                    <img
                      alt="image"
                      src="https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHllbGxvdyUyMHRlY2h8ZW58MHx8fHwxNjI2MjU1NDk0&amp;ixlib=rb-1.2.1&amp;w=1000"
                      className="personalProj-image"
                    />
                  </div>
                  <div className="personalProj-feature-card1">
                    <h2 className="personalProj-text2">Lorem ipsum</h2>
                    <img
                      alt="image"
                      src="https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHllbGxvdyUyMHRlY2h8ZW58MHx8fHwxNjI2MjU1NDk0&amp;ixlib=rb-1.2.1&amp;w=1000"
                      className="personalProj-image1"
                    />
                  </div>
                  <div className="personalProj-feature-card2">
                    <h2 className="personalProj-text3">Lorem ipsum</h2>
                    <img
                      alt="image"
                      src="https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHllbGxvdyUyMHRlY2h8ZW58MHx8fHwxNjI2MjU1NDk0&amp;ixlib=rb-1.2.1&amp;w=1000"
                      className="personalProj-image2"
                    />
                  </div>
                  <div className="personalProj-feature-card3">
                    <h2 className="personalProj-text4">Lorem ipsum</h2>
                    <img
                      alt="image"
                      src="https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHllbGxvdyUyMHRlY2h8ZW58MHx8fHwxNjI2MjU1NDk0&amp;ixlib=rb-1.2.1&amp;w=1000"
                      className="personalProj-image3"
                    />
                  </div>
                  <div className="personalProj-feature-card4">
                    <h2 className="personalProj-text5">Lorem ipsum</h2>
                    <img
                      alt="image"
                      src="https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHllbGxvdyUyMHRlY2h8ZW58MHx8fHwxNjI2MjU1NDk0&amp;ixlib=rb-1.2.1&amp;w=1000"
                      className="personalProj-image4"
                    />
                  </div>
                  <div className="personalProj-feature-card5">
                    <h2 className="personalProj-text6">Lorem ipsum</h2>
                    <img
                      alt="image"
                      src="https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHllbGxvdyUyMHRlY2h8ZW58MHx8fHwxNjI2MjU1NDk0&amp;ixlib=rb-1.2.1&amp;w=1000"
                      className="personalProj-image5"
                    />
                  </div>
                  <div className="personalProj-feature-card6">
                    <h2 className="personalProj-text7">Lorem ipsum</h2>
                    <img
                      alt="image"
                      src="https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHllbGxvdyUyMHRlY2h8ZW58MHx8fHwxNjI2MjU1NDk0&amp;ixlib=rb-1.2.1&amp;w=1000"
                      className="personalProj-image6"
                    />
                  </div>
                  <div className="personalProj-feature-card7">
                    <h2 className="personalProj-text8">Lorem ipsum</h2>
                    <img
                      alt="image"
                      src="https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?ixid=Mnw5MTMyMXwwfDF8c2VhcmNofDF8fHllbGxvdyUyMHRlY2h8ZW58MHx8fHwxNjI2MjU1NDk0&amp;ixlib=rb-1.2.1&amp;w=1000"
                      className="personalProj-image7"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* temporary div below for spacing under page, will need to remove in final sprint */}
            <div
              style={{
                display: "flex",
                paddingBottom: "10em",
              }}
            ></div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
