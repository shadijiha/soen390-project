/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import { checkLogin } from "./api/api";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Box,
  Heading,
  Text,
  Textarea,
} from "@chakra-ui/react";
import Layout from "@/components/Layout";
import axios from "axios";
import { editProfile } from "./api/api";
import Experience from "@/components/Forms/Experience";
import EducationHistory from "@/components/Forms/EducationHistory";
import LayoutForm from "@/components/Forms/LayoutForm";
import Information from "@/components/Forms/Information";
import InformationBox from "@/components/EditProfile/InformationBox";
import ExperienceBox from "@/components/EditProfile/ExperienceBox";
import EducationHistoryBox from "@/components/EditProfile/EductationHistoryBox";
import { useDispatch, useSelector } from "react-redux";

const EditProfile = () => {
  const currentUser = useSelector((state) => state as any);
  useEffect(() => {
    console.log(currentUser.auth)
  },[])

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
  return (
    <>
      <Layout>
        <NavBar />

        <Box display="flex" justifyContent="center" alignItems="center" p={4}>
          <Box>
            <Heading paddingBottom={10}>Hey, {profile.name}!</Heading>
          </Box>
        </Box>

        {/* profile picture */}
        <div
          className="profile-picture"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "150px",
            width: "150px",
            margin: "auto",
            position: "relative",
            marginBottom: "10px",
          }}
        >
          <img
            alt="image"
            src="https://marketplace.canva.com/EAFKZzWYqqE/1/0/1600w/canva-purple-navy-neon-gradient-modern-minimalist-man-tiktok-profile-picture-kqzwo_88iLY.jpg"
            className="profile-image"
            style={{
              aspectRatio: "1/1",
              objectFit: "cover",
              borderRadius: "100%",
              boxShadow: "0 5px 17px 0px rgba(0, 0, 0, 0.6)",
            }}
          />
          <div
            style={{
              position: "absolute",
              zIndex: -1,
              width: "maxWidth",
              top: "-30%",
            }}
          ></div>
          <button style={{ position: "absolute", bottom: "0", right: "0" }}>
            {/* upload new profile picture button */}
            <input
              type="file"
              id="file-input"
              style={{ display: "none" }}
         
            />
            <label htmlFor="file-input">
              <img
                src="https://img.icons8.com/material-sharp/512/send-letter.png"
                alt="Upload Icon"
                style={{
                  height: "35px",
                  width: "35px",
                  borderRadius: "100%",
                  backgroundColor: "white",
                }}
              />
            </label>
          </button>
        </div>

        {/* cover photo */}
        <div
          className="profile-cover"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "250px",
            width: "400px",
            margin: "auto",
            position: "relative",
            marginBottom: "10px",
          }}
        >
          <img
            alt="image"
            src="https://timelinecovers.pro/facebook-cover/download/artistic-retro-wave-palm-trees-facebook-cover.jpg"
            className="profile-cover"
            style={{
              objectFit: "cover",
              borderRadius: "15px",
              boxShadow: "0 5px 17px 0px rgba(0, 0, 0, 0.6)",
            }}
          />
          <div
            style={{
              position: "absolute",
              zIndex: -1,
              width: "maxWidth",
              top: "-30%",
            }}
          ></div>
          <button
            style={{ position: "absolute", bottom: "38px", right: "-15px" }}
          >
            {/* upload new profile picture button */}
            <input
              type="file"
              id="file-input"
              style={{ display: "none" }}
        
            />
            <label htmlFor="file-input">
              <img
                src="https://img.icons8.com/material-sharp/512/send-letter.png"
                alt="Upload Icon"
                style={{
                  height: "35px",
                  width: "35px",
                  borderRadius: "100%",
                  backgroundColor: "white",
                }}
              />
            </label>
          </button>
        </div>

        {/* my profile */}
        <InformationBox/>

        {/* work experience */}
        <ExperienceBox/>

        {/* Education History */}
        <EducationHistoryBox/>

      </Layout>
    </>
  );
};

export default EditProfile;
