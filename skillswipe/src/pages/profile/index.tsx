/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import NavBar from "@/components/NavBar";
import FeatureCard4 from "../../components/feature-card4";
import React, { CSSProperties, useEffect, useState } from "react";
import { checkLogin } from "../api/api";
import Layout from "@/components/Layout";

import {
  Box,
  Flex,
  HStack,
  useColorMode,
  useColorModeValue,
  Text,
  Image,
  Stack,
  Grid,
  Divider,
} from "@chakra-ui/react";

import router from "next/router";
import ProfileStyle from "../../styles/profilestyle";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import Volunteering from "@/components/Profile/Volunteering";
import Recommendations from "@/components/Profile/Recommendations";
import Skills from "@/components/Profile/Skills/Skills";
import Education from "../../components/Profile/Education";
import WorkExperience from "@/components/Profile/WorkExperience";
import { FaSuitcase, FaMapPin, FaEnvelope } from "react-icons/fa";
import Courses from "@/components/Profile/Courses";
import Awards from "@/components/Profile/Awards";
import PersonalProjectsProfile from "@/components/Profile/PersonalProjectsProfile";


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
                  //make the background image repeat itself
                  backgroundRepeat: "repeat",
                  // make the background image to be 50% opacity
                  backgroundColor: "rgba(0, 0, 0, 0.15)",
                  // make the background image to be 50% opacity
                  backgroundBlendMode: "multiply",
                  // make the container take the entire screens width

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

                    color: "white",
                  }}
                >
                  {User.auth.firstName + " " + User.auth.lastName} 👋🏼

                </h1>
                <span
                  className="profile-text02"
                  style={{
                    fontSize: "1em",
                    textShadow: "0px 0px 30px #00000085",

                    color: "white",
                  }}
                >
                  📨 {User.auth.email}

                </span>
                <span
                  className="profile-text03"
                  style={{
                    fontSize: "1em",
                    textShadow: "0px 0px 30px #00000085",

                    color: "white",
                  }}
                >
                  <span>📱 {User.auth.mobileNo}</span>
                  <br></br>
                  <br></br>
                </span>
                <div className="profile-container03">
                  <span
                    className="profile-text06"
                    style={{
                      textShadow: "0px 0px 30px #000000B4",
                      marginLeft: "0px",
                      color: "white",
                    }}
                  >
                    💬 {User.auth.biography}
                  </span>
                </div>

                <div className="profile-container05">
                  
                  {/* to do: show this edit button only if user logged in == the profile that is shown */}
                  <button
                    className="profile-button1 button"
                    style={{

                      color: "white",
                      borderColor: "white",

                      borderWidth: "2px",
                      textShadow: "0px 0px 40px #000000CA",
                      fontWeight: 600,
                    }}
                    onClick={() => {
                      router.push("/profile/editProfile");
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>


            <Stack
              direction={"row"}
              paddingTop="1rem"
              style={{
                flexWrap: "wrap",
              }}
            >
              {/* SKILLS SECTION */}
              <Skills skillsArray ={User.auth.skills} />
              {/* AWARDS SECTION */}
              <Awards awards={User.auth.awards} />
            </Stack >

            <br></br>
            <Divider />
            {/* CAREER JOURNEY WORK EXPERIENCE */}
            <WorkExperience experience={User.auth.workExperiences}/>
            <Divider />
            {/* EDUCATION SECTION */}
            <Education education={User.auth.educations} />
            <Divider />
            {/* VOLUNTEERING SECTION */}
            <Volunteering volunteer={User.auth.volunteeringExperience} />
            <Divider />
            {/* RECOMMENDATIONS SECTION */}
            <Recommendations rocommendations={User.auth.recommendationsReceived} />
            <Divider />
            {/* PERSONAL PROJECTS */}
            <PersonalProjectsProfile Project={User.auth.projects} />
            <Divider />

            {/* COURSES ACCOMPLISHED */}
            <Courses courses={User.auth.courses} />

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
