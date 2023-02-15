/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import { checkLogin, editPersonalInformation } from "./api/api";
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
import user from  "../assets/images/user.png";

import InformationBox from "@/components/EditProfile/InformationBox";
import ExperienceBox from "@/components/EditProfile/ExperienceBox";
import EducationHistoryBox from "@/components/EditProfile/EductationHistoryBox";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const EditProfile = () => {
  const currentUser = useSelector((state) => state as any);
  const [Pic, setPic] = useState({
    profilePic: "",
    coverPic: ""
  });
  useEffect(() => {
    setPic({ coverPic: currentUser.auth.coverPic, profilePic: currentUser.auth.profilePic })
  }, [currentUser])

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


  const coverImageHandler = (e: any) => {
    const token = localStorage.getItem("jwt");
    const fd = new FormData()
    if(e.target.files[0]) {
      fd.append("coverPic", e.target.files[0], e.target.files[0].name);
      editPersonalInformation(token, fd).then((response) => {
        console.log(response)
        setPic({ ...Pic, coverPic: response.data.coverPic })
        toast("Successfully Update Cover Picture")
      }).catch((error) => {
        toast(error.message);
  
      })
    }
  }

  const ProfileImageHandler = (e: any) => {
    console.log(e.target)
    const token = localStorage.getItem("jwt");
    const fd = new FormData()
    if(e.target.files[0]){
      fd.append("profilePic", e.target.files[0], e.target.files[0].name);
      editPersonalInformation(token, fd).then((response) => {
        
        setPic({ ...Pic, profilePic: response.data.profilePic })
        toast("Successfully Updated Profile picture")
      }).catch((error) => {
        toast(error.message)
      })

    }
  }
  const clickCover =() =>{
    document.getElementById("input")?.click();
  }
  const clickProfile =() =>{
    document.getElementById("file-input")?.click();
  }
 
  return (
    <>
      <Layout>
        <NavBar />
        <Box display="flex" justifyContent="center" alignItems="center" p={4}>
          <Box>
            <Heading paddingBottom={10}>Hey, {currentUser.auth.firstName}!</Heading>
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
          <a onClick={clickProfile}>

          <img
            alt="image"
            src={Pic.profilePic ? `data:image/jpeg;base64,${Pic.profilePic}`: profile.image }

            className="profile-image"
            style={{
              aspectRatio: "1/1",
              objectFit: "cover",
              borderRadius: "100%",
              boxShadow: "0 5px 17px 0px rgba(0, 0, 0, 0.6)",
            }}
            />
            </a>
          
            <input
              type="file"
              id="file-input"
              style={{ display: "none" }}
              onChange = {ProfileImageHandler}
              />
           
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
        <a onClick={clickCover} >
          <img
            alt="image"
            src={Pic.coverPic ? `data:image/jpeg;base64,${Pic.coverPic}`: profile.cover }
            className="profile-cover"
            style={{
              objectFit: "cover",
              borderRadius: "15px",
              boxShadow: "0 5px 17px 0px rgba(0, 0, 0, 0.6)",
            }}
            />
           
          </a>
            <input
              type="file"
              id="input"
              style={{ display: "none" }}
              onChange = {coverImageHandler}
            />
        </div>
        <Box display="flex" justifyContent="center" alignItems="center" p={4}>
          <Box>
            <Text fontSize='xl' as='b' paddingBottom={10}>Click to Edit Picture !</Text>
          </Box>
        </Box>
              
        {/* my profile */}
        <InformationBox />

        {/* work experience */}
        <ExperienceBox />

        {/* Education History */}
        <EducationHistoryBox />

      </Layout>
    </>
  );
};

export default EditProfile;
