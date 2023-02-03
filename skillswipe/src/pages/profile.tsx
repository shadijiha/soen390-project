import Head from "next/head";
import NavBar from "@/components/NavBar";
import FeatureCard4 from "../components/feature-card4";
import React, { CSSProperties, useEffect, useState } from "react";
import { checkLogin } from "./api/api";
import Layout from "@/components/Layout";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";

const Profile = () => {
  const { toggleColorMode } = useColorMode();
  const buttonColors = useColorModeValue("black", "white");

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      checkLogin(localStorage.getItem("jwt"))
        .then((Response) => {
          setProfile({
            ...profile,
            name: Response.data.firstName + " " + Response.data.lastName,
          });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);
  const [profile, setProfile] = useState({
    name: "John Smith",
    title: "Software Engineer",
    location: "Montreal, QC, CA",
    school: "Concordia University",
    experience: "Five years of experience in full stack development",
    experience2: "Three years of experience in mobile development",
    experience3: "Two years of experience in data analysis",
    image:
      "https://marketplace.canva.com/EAFKZzWYqqE/1/0/1600w/canva-purple-navy-neon-gradient-modern-minimalist-man-tiktok-profile-picture-kqzwo_88iLY.jpg",
    cover:
      "https://img.rawpixel.com/private/static/images/website/2022-05/v904-nunny-016_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=d04dc64ebef3b6c3ad40a5687bbe31dc",
  });

  const BackgroundImageDiv = () => {
    const divStyle: CSSProperties = {
      backgroundImage: `url('https://example.com/image.jpg')`,
      height: "200px",
      width: "200px",
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
    return <div style={divStyle} />;
  };
  return (
    <>
      <Layout>
        <NavBar />

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

          <div className="profile-top-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="image"
              src="https://marketplace.canva.com/EAFKZzWYqqE/1/0/1600w/canva-purple-navy-neon-gradient-modern-minimalist-man-tiktok-profile-picture-kqzwo_88iLY.jpg"
              className="profile-image"
              style={{
                aspectRatio: "1/1",
                objectFit: "cover",
              }}
            />
            <div className="profile-container01">
              <div className="profile-container02">
                <span className="profile-text">{profile.title} @ company</span>
              </div>
              <h1
                className="profile-text01"
                style={{
                  fontSize: "1.5em",
                  fontWeight: 700,
                  textShadow: "0px 0px 30px #00000085",
                }}
              >
                {profile.name}
              </h1>
              <span
                className="profile-text02"
                style={{
                  fontSize: "1em",
                  textShadow: "0px 0px 30px #00000085",
                }}
              >
                {profile.school}
              </span>
              <span
                className="profile-text03"
                style={{
                  fontSize: "1em",
                  textShadow: "0px 0px 30px #00000085",
                }}
              >
                <span>{profile.location}</span>
                <br></br>
              </span>
              <div className="profile-container03">
                <div className="profile-container04">
                  <span
                    className="profile-text06"
                    style={{
                      textShadow: "0px 0px 30px #0000009C",
                      marginLeft: "0px",
                    }}
                  >
                    I&apos;m great at _____
                  </span>
                </div>
                <div className="profile-container05">
                  <button
                    className="profile-button button"
                    style={{
                      color: buttonColors,
                      borderColor: buttonColors,
                      borderWidth: "2px",
                      textShadow: "0px 0px 30px #0000009C",
                    }}
                  >
                    <span>
                      <span>Message</span>
                      <br></br>
                    </span>
                  </button>
                  <button
                    className="profile-button1 button"
                    style={{
                      color: buttonColors,
                      borderColor: buttonColors,
                      borderWidth: "2px",
                      textShadow: "0px 0px 30px #0000009C",
                    }}
                  >
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="profile-steps">
            <h1 className="profile-text10">Career Journey</h1>
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
                  <h1 className="profile-text23"></h1>
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
          <div className="profile-personal-projects">
            <h1 className="profile-text39">Personal Projects</h1>
            <div className="profile-separator"></div>
            <div className="profile-container19">
              <div className="profile-container20">
                <FeatureCard4 rootClassName="rootClassName1"></FeatureCard4>
                <FeatureCard4 rootClassName="rootClassName4"></FeatureCard4>
                <FeatureCard4 rootClassName="rootClassName3"></FeatureCard4>
                <FeatureCard4 rootClassName="rootClassName2"></FeatureCard4>
              </div>
              <img
                alt="image"
                src="https://images.unsplash.com/photo-1661961110372-8a7682543120?ixid=Mnw5MTMyMXwxfDF8YWxsfDExfHx8fHx8Mnx8MTY3NTIyMDk5NA&amp;ixlib=rb-4.0.3&amp;w=500"
                loading="lazy"
                className="profile-image1"
              />
            </div>
          </div>
        </div>
        <style jsx>
          {`
            .profile-container {
              width: 100%;
              display: flex;
              overflow: auto;
              min-height: 100vh;
              align-items: center;
              flex-direction: column;
            }
            .profile-top-card {
              width: 100%;
              display: flex;
              max-width: 100%;
              box-shadow: 4px 4px 10px 0px rgba(18, 18, 18, 0.1);
              align-items: stretch;
              flex-direction: row;
              justify-content: space-between;
            }
            .profile-image {
              width: auto;
              height: 20em;
              align-self: center;
              object-fit: cover;
              flex-shrink: 0;
              border-radius: 0px;
            }
            .profile-container01 {
              flex: 1;
              width: auto;
              display: flex;
              align-items: flex-start;
              padding-top: var(--dl-space-space-twounits);
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
              flex-direction: column;
              padding-bottom: var(--dl-space-space-twounits);
              background-size: cover;
              justify-content: space-between;
              background-image: url("https://img.rawpixel.com/private/static/images/website/2022-05/v904-nunny-016_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=d04dc64ebef3b6c3ad40a5687bbe31dc");
            }
            .profile-container02 {
              width: 100%;
              display: flex;
              align-items: flex-start;
              margin-bottom: var(--dl-space-space-halfunit);
              flex-direction: row;
              justify-content: space-between;
            }
            .profile-text {
              font-weight: 600;
              text-transform: uppercase;
            }
            .profile-text01 {
              margin-bottom: var(--dl-space-space-twounits);
            }
            .profile-text02 {
              font-size: 1.25rem;
              margin-bottom: 0px;
            }
            .profile-text03 {
              font-size: 1.25rem;
              margin-bottom: 0px;
            }
            .profile-container03 {
              flex: 0 0 auto;
              width: auto;
              height: 92px;
              display: flex;
              align-items: flex-start;
              justify-content: flex-start;
            }
            .profile-container04 {
              width: 195px;
              display: flex;
              align-self: stretch;
              align-items: center;
              flex-direction: row;
              justify-content: space-between;
            }
            .profile-text06 {
              font-style: normal;
              font-weight: 600;
              margin-left: var(--dl-space-space-halfunit);
            }
            .profile-container05 {
              width: 219px;
              display: flex;
              align-self: stretch;
              align-items: center;
              flex-direction: row;
              justify-content: space-between;
            }
            .profile-button {
              border-radius: 60px;
              background-color: transparent;
            }
            .profile-button1 {
              border-radius: 60px;
              background-color: transparent;
            }
            .profile-steps {
              width: 100%;
              display: flex;
              padding: var(--dl-space-space-threeunits);
              max-width: var(--dl-size-size-maxwidth);
              align-self: center;
              align-items: center;
              align-content: center;
              flex-direction: column;
            }
            .profile-text10 {
              font-size: 3rem;
            }
            .profile-text11 {
              color: var(--dl-color-gray-700);
              font-size: 1.15rem;
              max-width: 600px;
              margin-top: var(--dl-space-space-unit);
              text-align: center;
              margin-bottom: var(--dl-space-space-unit);
            }
            .profile-container06 {
              flex: 0 0 auto;
              width: auto;
              display: flex;
              align-items: flex-start;
              align-content: initial;
              flex-direction: row;
            }
            .profile-step {
              display: flex;
              align-items: center;
              flex-direction: column;
            }
            .profile-container07 {
              flex: 0 0 auto;
              width: 100%;
              display: flex;
              align-items: center;
              padding-top: var(--dl-space-space-unit);
              padding-left: 2px;
              padding-right: 2px;
              flex-direction: row;
              justify-content: center;
            }
            .profile-line {
              flex: 1;
              height: 0px;
              display: flex;
              align-items: flex-start;
              border-color: transparent;
              border-style: dashed;
              border-width: 2px;
              flex-direction: row;
              border-left-width: 0px;
              border-right-width: 0px;
              border-bottom-width: 0px;
            }
            .profile-container08 {
              flex: 0 0 auto;
              width: var(--dl-size-size-small);
              height: var(--dl-size-size-small);
              display: flex;
              align-items: center;
              border-radius: var(--dl-radius-radius-round);
              flex-direction: row;
              justify-content: center;
              background-color: #f5f5f5ff;
            }
            .profile-icon {
              fill: var(--dl-color-gray-500);
              width: 24px;
              height: 24px;
            }
            .profile-line1 {
              flex: 1;
              height: 0px;
              display: flex;
              align-items: flex-start;
              border-color: var(--dl-color-gray-900);
              border-style: dashed;
              border-width: 2px;
              flex-direction: row;
              border-left-width: 0px;
              border-right-width: 0px;
              border-bottom-width: 0px;
            }
            .profile-container09 {
              display: flex;
              align-items: center;
              padding-top: var(--dl-space-space-unit);
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
              flex-direction: column;
              padding-bottom: var(--dl-space-space-unit);
            }
            .profile-text14 {
              font-size: 1.5rem;
              text-align: center;
              font-weight: 500;
              margin-bottom: var(--dl-space-space-unit);
            }
            .profile-heading {
              font-size: 1.5rem;
              text-align: center;
              font-weight: 500;
              margin-bottom: var(--dl-space-space-unit);
            }
            .profile-text17 {
              color: var(--dl-color-gray-500);
              font-size: 0.75rem;
              text-align: center;
            }
            .profile-step1 {
              display: flex;
              align-items: center;
              flex-direction: column;
            }
            .profile-container10 {
              flex: 0 0 auto;
              width: 100%;
              display: flex;
              align-items: center;
              padding-top: var(--dl-space-space-unit);
              padding-left: 2px;
              padding-right: 2px;
              flex-direction: row;
              justify-content: center;
            }
            .profile-line2 {
              flex: 1;
              height: 0px;
              display: flex;
              align-items: flex-start;
              border-color: var(--dl-color-gray-900);
              border-style: dashed;
              border-width: 2px;
              flex-direction: row;
              border-left-width: 0px;
              border-right-width: 0px;
              border-bottom-width: 0px;
            }
            .profile-container11 {
              flex: 0 0 auto;
              width: var(--dl-size-size-small);
              height: var(--dl-size-size-small);
              display: flex;
              align-items: center;
              border-radius: var(--dl-radius-radius-round);
              flex-direction: row;
              justify-content: center;
              background-color: #f5f5f5ff;
            }
            .profile-icon2 {
              fill: var(--dl-color-gray-500);
              width: 24px;
              height: 24px;
            }
            .profile-line3 {
              flex: 1;
              height: 0px;
              display: flex;
              align-items: flex-start;
              border-color: var(--dl-color-gray-900);
              border-style: dashed;
              border-width: 2px;
              flex-direction: row;
              border-left-width: 0px;
              border-right-width: 0px;
              border-bottom-width: 0px;
            }
            .profile-container12 {
              display: flex;
              align-items: center;
              padding-top: var(--dl-space-space-unit);
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
              flex-direction: column;
              padding-bottom: var(--dl-space-space-unit);
            }
            .profile-text20 {
              font-size: 1.5rem;
              text-align: center;
              font-weight: 500;
              margin-bottom: var(--dl-space-space-unit);
            }
            .profile-heading1 {
              font-size: 1.5rem;
              text-align: center;
              font-weight: 500;
              margin-bottom: var(--dl-space-space-unit);
            }
            .profile-text23 {
              font-size: 1.5rem;
              text-align: center;
              font-weight: 500;
              margin-bottom: var(--dl-space-space-unit);
            }
            .profile-text24 {
              color: var(--dl-color-gray-500);
              font-size: 0.75rem;
              text-align: center;
            }
            .profile-step2 {
              display: flex;
              align-items: center;
              flex-direction: column;
            }
            .profile-container13 {
              flex: 0 0 auto;
              width: 100%;
              display: flex;
              align-items: center;
              padding-top: var(--dl-space-space-unit);
              padding-left: 2px;
              padding-right: 2px;
              flex-direction: row;
              justify-content: center;
            }
            .profile-line4 {
              flex: 1;
              height: 0px;
              display: flex;
              align-items: flex-start;
              border-color: var(--dl-color-gray-900);
              border-style: dashed;
              border-width: 2px;
              flex-direction: row;
              border-left-width: 0px;
              border-right-width: 0px;
              border-bottom-width: 0px;
            }
            .profile-container14 {
              flex: 0 0 auto;
              width: var(--dl-size-size-small);
              height: var(--dl-size-size-small);
              display: flex;
              align-items: center;
              border-radius: var(--dl-radius-radius-round);
              flex-direction: row;
              justify-content: center;
              background-color: #f5f5f5ff;
            }
            .profile-icon4 {
              fill: var(--dl-color-gray-500);
              width: 24px;
              height: 24px;
            }
            .profile-line5 {
              flex: 1;
              height: 0px;
              display: flex;
              align-items: flex-start;
              border-color: var(--dl-color-gray-900);
              border-style: dashed;
              border-width: 2px;
              flex-direction: row;
              border-left-width: 0px;
              border-right-width: 0px;
              border-bottom-width: 0px;
            }
            .profile-container15 {
              display: flex;
              align-items: center;
              padding-top: var(--dl-space-space-unit);
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
              flex-direction: column;
              padding-bottom: var(--dl-space-space-unit);
            }
            .profile-text27 {
              font-size: 1.5rem;
              text-align: center;
              font-weight: 500;
              margin-bottom: var(--dl-space-space-unit);
            }
            .profile-heading2 {
              font-size: 1.5rem;
              text-align: center;
              font-weight: 500;
              margin-bottom: var(--dl-space-space-unit);
            }
            .profile-text30 {
              color: var(--dl-color-gray-500);
              font-size: 0.75rem;
              text-align: center;
            }
            .profile-step3 {
              display: flex;
              align-items: center;
              flex-direction: column;
            }
            .profile-container16 {
              flex: 0 0 auto;
              width: 100%;
              display: flex;
              align-items: center;
              padding-top: var(--dl-space-space-unit);
              padding-left: 2px;
              padding-right: 2px;
              flex-direction: row;
              justify-content: center;
            }
            .profile-line6 {
              flex: 1;
              height: 0px;
              display: flex;
              align-items: flex-start;
              border-color: var(--dl-color-gray-900);
              border-style: dashed;
              border-width: 2px;
              flex-direction: row;
              border-left-width: 0px;
              border-right-width: 0px;
              border-bottom-width: 0px;
            }
            .profile-container17 {
              flex: 0 0 auto;
              width: var(--dl-size-size-small);
              height: var(--dl-size-size-small);
              display: flex;
              align-items: center;
              border-radius: var(--dl-radius-radius-round);
              flex-direction: row;
              justify-content: center;
              background-color: #f5f5f5ff;
            }
            .profile-icon7 {
              fill: var(--dl-color-gray-500);
              width: 24px;
              height: 24px;
            }
            .profile-line7 {
              flex: 1;
              height: 0px;
              display: flex;
              align-items: flex-start;
              border-color: transparent;
              border-style: dashed;
              border-width: 2px;
              flex-direction: row;
              border-left-width: 0px;
              border-right-width: 0px;
              border-bottom-width: 0px;
            }
            .profile-container18 {
              display: flex;
              align-items: center;
              padding-top: var(--dl-space-space-unit);
              padding-left: var(--dl-space-space-twounits);
              padding-right: var(--dl-space-space-twounits);
              flex-direction: column;
              padding-bottom: var(--dl-space-space-unit);
            }
            .profile-text33 {
              font-size: 1.5rem;
              text-align: center;
              font-weight: 500;
              margin-bottom: var(--dl-space-space-unit);
            }
            .profile-heading3 {
              font-size: 1.5rem;
              text-align: center;
              font-weight: 500;
              margin-bottom: var(--dl-space-space-unit);
            }
            .profile-text36 {
              color: var(--dl-color-gray-500);
              font-size: 0.75rem;
              text-align: center;
            }
            .profile-personal-projects {
              width: 100%;
              display: flex;
              padding: var(--dl-space-space-threeunits);
              max-width: var(--dl-size-size-maxwidth);
              flex-direction: column;
            }
            .profile-text39 {
              font-size: 3rem;
              margin-bottom: var(--dl-space-space-twounits);
            }
            .profile-separator {
              width: 100px;
              height: 2px;
              background-color: var(--dl-color-gray-500);
            }
            .profile-container19 {
              flex: 0 0 auto;
              width: 100%;
              display: flex;
              margin-top: var(--dl-space-space-twounits);
              align-items: center;
              flex-direction: row;
              justify-content: space-between;
            }
            .profile-container20 {
              display: grid;
              grid-template-columns: 1fr 1fr;
            }
            .profile-image1 {
              width: 450px;
              height: 450px;
              object-fit: cover;
              flex-shrink: 0;
              margin-left: var(--dl-space-space-fourunits);
              border-radius: var(--dl-radius-radius-round);
              object-position: left;
            }
            @media (max-width: 1600px) {
              .profile-top-card {
                height: 331px;
              }
              .profile-image {
                width: auto;
                height: inherit;
              }
              .profile-text02 {
                margin-bottom: var(--dl-space-space-halfunit);
              }
              .profile-container04 {
                width: 174px;
                height: 60px;
                margin-right: 0px;
              }
              .profile-container05 {
                width: 216px;
                height: 60px;
                margin-right: 90px;
              }
              .profile-button {
                border-radius: 60px;
                background-color: transparent;
              }
              .profile-button1 {
                border-radius: 60px;
                background-color: transparent;
              }
              .profile-text10 {
                font-size: 3rem;
              }
              .profile-text11 {
                color: var(--dl-color-gray-700);
                font-size: 1.15rem;
              }
              .profile-container09 {
                width: 274px;
                height: 130px;
              }
              .profile-text14 {
                font-size: 1.5rem;
                margin-bottom: var(--dl-space-space-halfunit);
              }
              .profile-heading {
                font-size: 1rem;
              }
              .profile-text17 {
                color: var(--dl-color-gray-500);
              }
              .profile-text20 {
                font-size: 1.5rem;
                font-weight: 500;
                margin-bottom: var(--dl-space-space-halfunit);
              }
              .profile-heading1 {
                font-size: 1rem;
                font-weight: 500;
              }
              .profile-text23 {
                font-size: 1.5rem;
              }
              .profile-text24 {
                color: var(--dl-color-gray-500);
              }
              .profile-text27 {
                font-size: 1.5rem;
                font-weight: 500;
                margin-bottom: var(--dl-space-space-halfunit);
              }
              .profile-heading2 {
                font-size: 1rem;
                font-weight: 500;
              }
              .profile-text30 {
                color: var(--dl-color-gray-500);
                font-size: 0.75rem;
              }
              .profile-text33 {
                font-size: 1.5rem;
                font-weight: 500;
                margin-bottom: var(--dl-space-space-halfunit);
              }
              .profile-heading3 {
                font-size: 1rem;
                font-weight: 500;
              }
              .profile-text36 {
                color: var(--dl-color-gray-500);
              }
              .profile-text39 {
                font-size: 3rem;
              }
            }
            @media (max-width: 991px) {
              .profile-top-card {
                height: 300px;
                flex-direction: row;
                justify-content: space-between;
              }
              .profile-image {
                width: 299px;
                height: inherit;
              }
              .profile-container01 {
                flex: 1;
                height: 100%;
                align-self: stretch;
                background-position: center;
              }
              .profile-text {
                color: var(--dl-color-gray-500);
              }
              .profile-text01 {
                margin-bottom: var(--dl-space-space-halfunit);
              }
              .profile-text02 {
                color: var(--dl-color-gray-500);
              }
              .profile-text03 {
                color: var(--dl-color-gray-500);
              }
              .profile-container04 {
                width: 191px;
                margin-right: var(--dl-space-space-halfunit);
                justify-content: space-between;
              }
              .profile-text06 {
                font-style: normal;
                font-weight: 600;
                margin-right: var(--dl-space-space-fourunits);
              }
              .profile-container05 {
                width: 225px;
                margin-right: 0px;
                justify-content: space-between;
              }
              .profile-button {
                border-radius: 60px;
                background-color: transparent;
              }
              .profile-button1 {
                border-radius: 60px;
                background-color: transparent;
              }
              .profile-text10 {
                text-align: center;
              }
              .profile-text11 {
                text-align: center;
              }
              .profile-personal-projects {
                align-items: center;
              }
              .profile-container19 {
                flex-direction: column;
              }
              .profile-image1 {
                width: 300px;
                height: 300px;
                margin-top: var(--dl-space-space-twounits);
                margin-left: 0px;
              }
            }
            @media (max-width: 767px) {
              .profile-top-card {
                flex-direction: column;
                margin-bottom: 28em;
              }
              .profile-image {
                width: 100%;
                height: 429px;
              }
              .profile-container04 {
                padding-right: 0px;
              }
              .profile-button {
                border-radius: 60px;
                background-color: transparent;
              }
              .profile-button1 {
                border-radius: 60px;
                background-color: transparent;
              }
              .profile-steps {
                padding-left: var(--dl-space-space-twounits);
                padding-right: var(--dl-space-space-twounits);
              }
              .profile-container06 {
                align-items: flex-start;
                padding-left: var(--dl-space-space-fiveunits);
                flex-direction: column;
              }
              .profile-step {
                width: 100%;
                height: auto;
                flex-direction: row;
                justify-content: center;
              }
              .profile-container07 {
                width: var(--dl-size-size-small);
                height: auto;
                align-self: stretch;
                padding-top: 0px;
                padding-left: 0px;
                padding-right: 0px;
                flex-direction: column;
                padding-bottom: 2px;
                justify-content: space-between;
              }
              .profile-line1 {
                border-color: var(--dl-color-gray-900);
                border-style: dashed;
                border-top-width: 0px;
                border-left-width: 2px;
              }
              .profile-container09 {
                width: 100%;
                align-items: flex-start;
                padding-top: var(--dl-space-space-twounits);
                flex-direction: column;
                padding-bottom: var(--dl-space-space-twounits);
                justify-content: space-between;
              }
              .profile-text14 {
                margin-top: var(--dl-space-space-twounits);
                margin-left: 0px;
                margin-right: 0px;
                margin-bottom: var(--dl-space-space-unit);
              }
              .profile-heading {
                margin-top: var(--dl-space-space-twounits);
                margin-left: 0px;
                margin-right: 0px;
                margin-bottom: var(--dl-space-space-unit);
              }
              .profile-text17 {
                text-align: left;
              }
              .profile-step1 {
                width: 100%;
                height: auto;
                flex-direction: row;
                justify-content: center;
              }
              .profile-container10 {
                width: var(--dl-size-size-small);
                height: auto;
                align-self: stretch;
                padding-top: 0px;
                padding-left: 0px;
                padding-right: 0px;
                flex-direction: column;
                padding-bottom: 2px;
                justify-content: space-between;
              }
              .profile-line2 {
                border-top-width: 0px;
                border-left-width: 2px;
              }
              .profile-line3 {
                border-color: var(--dl-color-gray-900);
                border-style: dashed;
                border-top-width: 0px;
                border-left-width: 2px;
              }
              .profile-container12 {
                width: 100%;
                align-items: flex-start;
                padding-top: var(--dl-space-space-twounits);
                flex-direction: column;
                padding-bottom: var(--dl-space-space-twounits);
                justify-content: space-between;
              }
              .profile-text20 {
                margin-top: var(--dl-space-space-twounits);
                margin-left: 0px;
                margin-right: 0px;
                margin-bottom: var(--dl-space-space-unit);
              }
              .profile-heading1 {
                margin-top: var(--dl-space-space-twounits);
                margin-left: 0px;
                margin-right: 0px;
                margin-bottom: var(--dl-space-space-unit);
              }
              .profile-text23 {
                margin-top: var(--dl-space-space-twounits);
                margin-left: 0px;
                margin-right: 0px;
                margin-bottom: var(--dl-space-space-unit);
              }
              .profile-text24 {
                text-align: left;
              }
              .profile-step2 {
                width: 100%;
                height: auto;
                flex-direction: row;
                justify-content: center;
              }
              .profile-container13 {
                width: var(--dl-size-size-small);
                height: auto;
                align-self: stretch;
                padding-top: 0px;
                padding-left: 0px;
                padding-right: 0px;
                flex-direction: column;
                padding-bottom: 2px;
                justify-content: space-between;
              }
              .profile-line4 {
                border-top-width: 0px;
                border-left-width: 2px;
              }
              .profile-line5 {
                border-color: var(--dl-color-gray-900);
                border-style: dashed;
                border-top-width: 0px;
                border-left-width: 2px;
              }
              .profile-container15 {
                width: 100%;
                align-items: flex-start;
                padding-top: var(--dl-space-space-twounits);
                flex-direction: column;
                padding-bottom: var(--dl-space-space-twounits);
                justify-content: space-between;
              }
              .profile-text27 {
                margin-top: var(--dl-space-space-twounits);
                margin-left: 0px;
                margin-right: 0px;
                margin-bottom: var(--dl-space-space-unit);
              }
              .profile-heading2 {
                margin-top: var(--dl-space-space-twounits);
                margin-left: 0px;
                margin-right: 0px;
                margin-bottom: var(--dl-space-space-unit);
              }
              .profile-text30 {
                text-align: left;
              }
              .profile-step3 {
                width: 100%;
                height: auto;
                flex-direction: row;
                justify-content: center;
              }
              .profile-container16 {
                width: var(--dl-size-size-small);
                height: auto;
                align-self: stretch;
                padding-top: 0px;
                padding-left: 0px;
                padding-right: 0px;
                flex-direction: column;
                padding-bottom: 2px;
                justify-content: space-between;
              }
              .profile-line6 {
                border-top-width: 0px;
                border-left-width: 2px;
              }
              .profile-line7 {
                border-color: transparent;
                border-style: dashed;
                border-top-width: 0px;
                border-left-width: 2px;
              }
              .profile-container18 {
                width: 100%;
                align-items: flex-start;
                padding-top: var(--dl-space-space-twounits);
                flex-direction: column;
                padding-bottom: var(--dl-space-space-twounits);
                justify-content: space-between;
              }
              .profile-text33 {
                margin-top: var(--dl-space-space-twounits);
                margin-left: 0px;
                margin-right: 0px;
                margin-bottom: var(--dl-space-space-unit);
              }
              .profile-heading3 {
                margin-top: var(--dl-space-space-twounits);
                margin-left: 0px;
                margin-right: 0px;
                margin-bottom: var(--dl-space-space-unit);
              }
              .profile-text36 {
                text-align: left;
              }
              .profile-personal-projects {
                padding-left: var(--dl-space-space-twounits);
                padding-right: var(--dl-space-space-twounits);
              }
              .profile-text39 {
                text-align: center;
              }
              .profile-container19 {
                flex-direction: column;
              }
            }
            @media (max-width: 479px) {
              .profile-top-card {
                width: 100%;
                height: 700px;
                position: relative;
              }
              .profile-image {
                flex: 1;
                width: auto;
                height: 400px;
                align-self: stretch;
                border-radius: 0px;
              }
              .profile-container01 {
                width: 100%;
              }
              .profile-text02 {
                margin-bottom: var(--dl-space-space-halfunit);
              }
              .profile-container03 {
                width: 422px;
              }
              .profile-container04 {
                width: 200px;
                height: 92px;
                margin-right: 0px;
                padding-left: 0px;
                padding-right: 0px;
              }
              .profile-container05 {
                width: 50%;
                height: 92px;
                margin-right: 0px;
                padding-left: 0px;
                padding-right: 0px;
              }
              .profile-button {
                border-radius: 60px;
                background-color: transparent;
              }
              .profile-button1 {
                border-radius: 60px;
                background-color: transparent;
              }
              .profile-steps {
                padding-top: var(--dl-space-space-twounits);
                padding-left: var(--dl-space-space-unit);
                padding-right: var(--dl-space-space-unit);
                padding-bottom: var(--dl-space-space-twounits);
              }
              .profile-container06 {
                padding-left: 0px;
              }
              .profile-container09 {
                padding-top: var(--dl-space-space-twounits);
                padding-left: var(--dl-space-space-unit);
                padding-right: 0px;
                padding-bottom: var(--dl-space-space-twounits);
              }
              .profile-text14 {
                margin-left: 0px;
                margin-right: var(--dl-space-space-twounits);
              }
              .profile-heading {
                margin-left: 0px;
                margin-right: var(--dl-space-space-twounits);
              }
              .profile-container12 {
                padding-top: var(--dl-space-space-twounits);
                padding-left: var(--dl-space-space-unit);
                padding-right: 0px;
                padding-bottom: var(--dl-space-space-twounits);
              }
              .profile-text20 {
                margin-left: 0px;
                margin-right: var(--dl-space-space-twounits);
              }
              .profile-heading1 {
                margin-left: 0px;
                margin-right: var(--dl-space-space-twounits);
              }
              .profile-text23 {
                margin-left: 0px;
                margin-right: var(--dl-space-space-twounits);
              }
              .profile-container15 {
                padding-top: var(--dl-space-space-twounits);
                padding-left: var(--dl-space-space-unit);
                padding-right: 0px;
                padding-bottom: var(--dl-space-space-twounits);
              }
              .profile-text27 {
                margin-left: 0px;
                margin-right: var(--dl-space-space-twounits);
              }
              .profile-heading2 {
                margin-left: 0px;
                margin-right: var(--dl-space-space-twounits);
              }
              .profile-container18 {
                padding-top: var(--dl-space-space-twounits);
                padding-left: var(--dl-space-space-unit);
                padding-right: 0px;
                padding-bottom: var(--dl-space-space-twounits);
              }
              .profile-text33 {
                margin-left: 0px;
                margin-right: var(--dl-space-space-twounits);
              }
              .profile-heading3 {
                margin-left: 0px;
                margin-right: var(--dl-space-space-twounits);
              }
              .profile-personal-projects {
                padding-top: var(--dl-space-space-twounits);
                padding-left: var(--dl-space-space-unit);
                padding-right: var(--dl-space-space-unit);
                padding-bottom: var(--dl-space-space-twounits);
              }
              .profile-container20 {
                grid-template-columns: 1fr;
              }
              .profile-image1 {
                width: 250px;
                height: 250px;
              }
            }
          `}
        </style>
      </Layout>
    </>
  );
};

export default Profile;
