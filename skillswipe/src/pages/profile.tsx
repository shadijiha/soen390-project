import React, { useEffect, useState } from "react";
import imageFile from "../assets/images/image.jpeg";
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
  useColorModeValue,
  useColorMode,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Layout from "@/components/Layout";
import { checkLogin } from "./api/api";

var borderWidth = "3px";
var boxBorder = "30";

const Profile = () => {
  useEffect(() => {
    if(localStorage.getItem('jwt')){
      checkLogin(localStorage.getItem("jwt")).then((Response) => {
        setProfile({
          ...profile,
          name : Response.data.firstName +" "+Response.data.lastName
        })

      }).catch((error) => {

      })

    }
  },[])
  const [profile, setProfile] = useState({
    name: "John Smith",
    title: "Software Engineer",
    location: "Montreal ,QC, CA",
    school: "Concordia University",
    experience: "Five years of experience in full stack development",
    experience2: "Three years of experience in mobile development",
    experience3: "Two years of experience in data analysis",
    image:
      "https://image.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg",
    cover:
      "https://cdn-images.zety.com/pages/software_developer_cover_letter_example_zety_us_4.jpg",
  });
  const { toggleColorMode } = useColorMode();
  const formBorder = useColorModeValue("gray.300", "gray.600");
  const toggleTheme = useColorModeValue("🌙", "💡");

  const [employmentHistory, setEmploymentHistory] = useState([
    {
      company: "ABC Inc",
      position: "Software Engineer",
      duration: "January 2020 - Present",
      description:
        "Working on building and maintaining the company's e-commerce platform using React and Node.js.",
    },
    {
      company: "DEF Corp",
      position: "Full Stack Developer",
      duration: "June 2016 - December 2019",
      description:
        "Developed and implemented several features for the company's CRM system using Ruby on Rails and JavaScript.",
    },
  ]);

  const handleEdit = () => {
    setProfile({
      ...profile,
      name: "Full Name",
      title: "Software Engineer",
      location: "Montreal ,QC, CA",
      experience: "Five years of experience in full stack development",
      experience2: "Three years of experience in mobile development",
      experience3: "Two years of experience in data analysis",
      image:
        "https://image.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg",
      cover:
        "https://cdn-images.zety.com/pages/software_developer_cover_letter_example_zety_us_4.jpg",
    });
  };

  const postBackground = useColorModeValue("gray.100", "gray.700");
  return (
    <>
      <Layout>
        
      <NavBar />

      <Flex direction="column" align="right" p={12}>
        <Stack
          borderWidth={borderWidth}
          borderColor={formBorder}
          backgroundColor={postBackground} // we should make this blurred so that the cover shows through a bit
          padding="0rem"
          marginBottom="1rem"
          rounded={boxBorder}
          overflow="hidden"
          width="100%"
          minW="80vw"
          maxW="90vw"
          boxShadow="lg"
          zIndex={"-1"}
        >
          <Image
            src={profile.cover}
            alt=""
            w="100%"
            h="300px"
            bg="gray.100"
            rounded="lg"
            mb={6}
            objectFit="cover"
            />
          <Flex align="center" direction={["column", "column", "row", "row"]}>
            <Image
              src={profile.image}
              alt=""
              w="150px"
              h="150px"
              rounded="full"
              objectFit={"cover"}
              mr={6}
              mb={6}
              marginLeft={10}
              boxShadow="lg"
              />
            <Stack ml={6}>
              <Text fontSize="2xl" fontWeight="bold">
                {profile.name}
              </Text>
              <Text fontSize="lg" fontWeight="medium">
                {profile.title}
              </Text>
              <Text fontSize="sm">{profile.location}</Text>
              <Text>{profile.school}</Text>

            </Stack>
          </Flex>
        </Stack>
        <Divider my={6} w="100%" />
        <Stack>
          <Box
            borderWidth={borderWidth}
            borderColor={formBorder}
            backgroundColor={postBackground}
            padding="1rem"
            marginBottom="1rem"
            rounded={boxBorder}
            overflow="hidden"
            width="100%"
            minW="80vw"
            maxW="90vw"
            boxShadow="lg"
            >
            <Text fontSize="lg" fontWeight="medium" mb={2} marginLeft={"1rem"}>
              Personal Experience
            </Text>

            <Stack ml={5}>
              <ol>
                <li>
                  <Text fontSize="sm" marginBottom={"1rem"}>
                    {profile.experience}
                  </Text>
                </li>
                <li>
                  <Text fontSize="sm" marginBottom={"1rem"}>
                    {profile.experience2}
                  </Text>
                </li>
                <li>
                  <Text fontSize="sm" marginBottom={"1rem"}>
                    {profile.experience3}
                  </Text>
                </li>
              </ol>
            </Stack>
          </Box>
        </Stack>

        <Box
          borderWidth={borderWidth}
          borderColor={formBorder}
          backgroundColor={postBackground}
          padding="1rem"
          marginBottom="1rem"
          rounded={boxBorder}
          overflow="hidden"
          width="100%"
          minW="80vw"
          maxW="90vw"
          boxShadow="lg"
          >
          <Text fontSize="lg" fontWeight="medium" mb={2} ml={2}>
            Employment History:
          </Text>
          <Stack>
            {employmentHistory.map((history, index) => (
              <Box
                key={index}
                borderWidth="2px"
                borderColor={formBorder}
                backgroundColor={postBackground}
                padding="1rem"
                marginBottom="1rem"
                rounded="25"
                overflow="hidden"
                width="100%"
                minW="80vw"
                maxW="90vw"
              >
                <Text fontWeight="bold">{history.company}</Text>
                <Text>{history.position}</Text>
                <Text>{history.duration}</Text>
                <Text>{history.description}</Text>
              </Box>
            ))}
          </Stack>
        </Box>
      </Flex>
            </Layout>
    </>
  );
};

export default Profile;
