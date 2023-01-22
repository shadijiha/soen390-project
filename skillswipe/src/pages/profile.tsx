import React, { useState } from "react";
import {
  Box,
  Flex,
  Text,
  Image,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Stack,
  Divider,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";

const Profile = () => {
  const [name, setName] = useState("John Doe");
  const [title, setTitle] = useState("Software Engineer at XYZ Company");
  const [location, setLocation] = useState("New York City, NY");
  const [education, setEducation] = useState("Concordia University");
  const [experience, setExperience] = useState(
    "Intern at Google, Inc. 2020-2021, Software Engineer at XYZ Company 2019-2020, Software Engineer at ABC Company 2018-2019"
  );
  const [skills, setSkills] = useState("ReactJS, Flutter, NodeJS, MongoDB");

  const [about, setAbout] = useState(
    "I am a passionate software engineer with 5 years of experience in building web and mobile applications. I am always looking for new challenges and opportunities to grow and learn."
  );
  const [profileImage, setProfileImage] = useState(
    "https://thispersondoesnotexist.com/image"
  );

  const handleNameChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setName(e.target.value);
  const handleTitleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setTitle(e.target.value);
  const handleLocationChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setLocation(e.target.value);
  const handleAboutChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setAbout(e.target.value);
  const handleProfileImageChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setProfileImage(e.target.value);
  const handleExperienceChange = (event: any) => {
    setExperience(event.target.value);
  };
  const handleEducationChange = (event: any) => {
    setEducation(event.target.value);
  };

  const handleSkillsChange = (event: any) => {
    setSkills(event.target.value);
  };
  return (
    <>
      <NavBar />
      <Flex
        w="100%"
        h="100vh"
        align="center"
        justify="center"
        flexDir="column"
        p={10}
      >
        <Box>
          <Flex>
            <Stack spacing={3}>
              <Image
                rounded="full"
                src={profileImage}
                mr={6}
                objectFit="cover"
                alt="Hello"
                maxW={150}
                maxH={150}
              />
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  value={name}
                  onChange={handleNameChange}
                  placeholder="John Doe"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  value={title}
                  onChange={handleTitleChange}
                  placeholder="Software Engineer at XYZ Company"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input
                  value={location}
                  onChange={handleLocationChange}
                  placeholder="New York City, NY"
                />
              </FormControl>
              <FormControl>
                <FormLabel>About</FormLabel>
                <Input
                  value={about}
                  onChange={handleAboutChange}
                  placeholder="I am a passionate software engineer with 5 years of experience in building web and mobile applications. I am always looking for new challenges and opportunities to grow and learn."
                />
              </FormControl>
              <FormControl>
                <FormLabel>Profile Image</FormLabel>
                <Input
                  value={profileImage}
                  onChange={handleProfileImageChange}
                  placeholder="https://via.placeholder.com/150"
                />
                <FormHelperText>
                  Input a URL for your profile image
                </FormHelperText>
              </FormControl>

              <Divider orientation="horizontal" my={8} />
              <FormControl>
                <FormLabel>Education</FormLabel>
                <Input value={education} onChange={handleEducationChange} />
              </FormControl>
              <Divider orientation="horizontal" my={8} />
              <FormControl>
                <FormLabel>Experience</FormLabel>
                <Input value={experience} onChange={handleExperienceChange} />
              </FormControl>

              <Divider orientation="horizontal" my={8} />
              <FormControl>
                <FormLabel>Skills</FormLabel>
                <Input value={skills} onChange={handleSkillsChange} />
              </FormControl>
              <Button variant="teal" mt={4}>
                Save Changes
              </Button>
            </Stack>
          </Flex>
        </Box>
      </Flex>
    </>
  );
};
export default Profile;
