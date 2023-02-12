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
  Textarea,
} from "@chakra-ui/react";
import Layout from "@/components/Layout";
import axios from "axios";
import { editProfile } from "./api/api";

const EditProfile = () => {
  const [selectedProfilePic, setProfilePic] = useState(null);
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [location, setLocation] = useState("");
  const [title, setTitle] = useState("");
  axios.get("").then((res) => {
    console.log(res.data);
  });
  const [User, setUser] = useState({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    gender: "",
  });

  const changeName = (event: any) => {
    setUser({
      ...User,
      firstName: event.target.value,
    });
  };

  const handleSubmit = (event: any) => {
    console.log(`Name: ${name}`);
    console.log(`School: ${school}`);
    console.log(`Location: ${location}`);
    console.log(`Title: ${title}`);

    editProfile(User)
      .then((Response) => {
        console.log(Response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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

  const handleProfilePicture = (event: any) => {
    setProfilePic(event.target.files[0]);
  };

  const [inputs, setInputs] = useState([{ value: "" }]);

  const handleAddInput = () => {
    setInputs([...inputs, { value: "" }]);
  };

  const handleInputChange = (event: any, index: any) => {
    const updatedInputs = [...inputs];
    updatedInputs[index].value = event.target.value;
    setInputs(updatedInputs);
  };

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
              onChange={handleProfilePicture}
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
              onChange={handleProfilePicture}
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
        <Stack
          as="form"
          onSubmit={handleSubmit}
          justifyContent="center"
          alignItems="center"
          p={5}
          textAlign="center"
        >
          <Box
            minWidth={"60vw"}
            borderWidth="1px"
            borderRadius={25}
            p={8}
            width="auto"
          >
            <p
              style={{
                textAlign: "left",
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              My Profile
            </p>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                id="name"
                placeholder={profile.name}
                // value={name}
                onChange={changeName}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="school">School</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                placeholder={profile.school}
                id="school"
                value={school}
                onChange={(event) => setSchool(event.target.value)}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="location">Title</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                placeholder={profile.title}
                id="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                placeholder={profile.location}
                id="location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
          </Box>
        </Stack>

        {/* work experience */}
        <Stack
          as="form"
          onSubmit={handleSubmit}
          p={5}
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            WebkitAlignContent: "center",
            WebkitAlignItems: "center",
            WebkitBoxAlign: "center",
            WebkitFlexWrap: "wrap",
            WebkitJustifyContent: "center",
          }}
        >
          <Box
            minWidth={"30vw"}
            borderWidth="1px"
            borderRadius={25}
            p={8}
            width="auto"
            mr={3}
            mt={2}
          >
            <p
              style={{
                textAlign: "left",
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Experience 1
            </p>
            <FormControl>
              <FormLabel htmlFor="experience1">Company</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                id="name"
                placeholder="Company name"
                // // value={name}
                // onChange={changeName}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="what">Title</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                id="name"
                placeholder="ex: Software Engineer Intern"
                // // value={name}
                // onChange={changeName}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="date">When?</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                id="name"
                placeholder="Company name"
                // // value={name}
                onChange={changeName}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="what">What did you do?</FormLabel>
              <Textarea
                minWidth={"100%"}
                id="name"
                placeholder="Example: I worked on the front end of the website."
                onChange={changeName}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
                word-wrap="break-word"
                wrap="soft"
              />
            </FormControl>
          </Box>
          <Box
            minWidth={"30vw"}
            borderWidth="1px"
            borderRadius={25}
            p={8}
            width="auto"
            ml={3}
          >
            <p
              style={{
                textAlign: "left",
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Experience 2
            </p>
            <FormControl>
              <FormLabel htmlFor="experience1">Company</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                id="name"
                placeholder="Company name"
                // value={name}
                onChange={changeName}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="what">Title</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                id="name"
                placeholder="ex: Software Engineer Intern"
                // value={name}
                onChange={changeName}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="date">When?</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                id="name"
                placeholder="Company name"
                // value={name}
                onChange={changeName}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="what">What did you do?</FormLabel>
              <Textarea
                minWidth={"100%"}
                id="name"
                placeholder="Example: I worked on the front end of the website."
                onChange={changeName}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
                word-wrap="break-word"
                wrap="soft"
              />
            </FormControl>
          </Box>
        </Stack>

        {/* Education History */}
        <Stack
          as="form"
          onSubmit={handleSubmit}
          justifyContent="center"
          alignItems="center"
          p={5}
          textAlign="center"
        >
          <Box
            minWidth={"60vw"}
            borderWidth="1px"
            borderRadius={25}
            p={8}
            width="auto"
          >
            <p
              style={{
                textAlign: "left",
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Education History
            </p>
            <FormControl>
              <FormLabel htmlFor="school">School</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                placeholder={profile.school}
                id="school"
                // value={school}
                // onChange={(event) => setSchool(event.target.value)}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="school-when">When?</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                id="name"
                placeholder="2012-2015"
                // value={name}
                // onChange={changeName}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="degree">Degree</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                placeholder="B.S. Computer Science"
                id="degree"
                // onChange={(event) => setTitle(event.target.value)}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                placeholder={profile.location}
                id="location"
                // value={location}
                // onChange={(event) => setLocation(event.target.value)}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
          </Box>
          <Button
            style={{
              boxShadow: "0 5px 17px 0px rgba(0, 100, 500, 0.3)",
              border: "3px solid rgba(255, 255, 255, 0.3)",
              margin: "2.5em",
            }}
            type="submit"
            size="lg"
            colorScheme={"blue"}
            borderRadius="100px"
            onClick={handleSubmit}
          >
            Update
          </Button>
        </Stack>
      </Layout>
    </>
  );
};

export default EditProfile;
