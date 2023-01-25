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
  useColorModeValue,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "John Smith",
    title: "Software Engineer",
    location: "Montreal ,QC, CA",
    experience: "Five years of experience in full stack development",
    experience2: "Three years of experience in mobile development",
    experience3: "Two years of experience in data analysis",
    image: "https://image.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg",
    cover: "https://cdn-images.zety.com/pages/software_developer_cover_letter_example_zety_us_4.jpg",
  });

  const [employmentHistory, setEmploymentHistory] = useState([
    {
      company: "ABC Inc",
      position: "Software Engineer",
      duration: "January 2020 - Present",
      description: "Working on building and maintaining the company's e-commerce platform using React and Node.js."
    },
    {
      company: "DEF Corp",
      position: "Full Stack Developer",
      duration: "June 2016 - December 2019",
      description: "Developed and implemented several features for the company's CRM system using Ruby on Rails and JavaScript."
    }
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
      image: "https://image.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg",
      cover: "https://cdn-images.zety.com/pages/software_developer_cover_letter_example_zety_us_4.jpg",
    });
  };

  const postBackground = useColorModeValue("gray.100", "gray.700");
  return (
    <>
      <NavBar />
      <Flex direction="column" align="right" p={12} pt={'0px'}>
        <Stack border={'1px'} padding={'30px'} backgroundColor={postBackground} borderRadius={'10px'}>
          <Image src={profile.cover} alt="" w="100%" h="300px" bg="gray.100" rounded="lg" mb={6} />

          <Flex align='center' direction={['column','column','row','row']} mb={6}>
            <Image src={profile.image} alt="" w="150px" h="150px" rounded="full" />
            <Stack ml={['0px','0px','20px','20px']} >
              <Text fontSize="2xl" fontWeight="bold">
                {profile.name}
              </Text>
              <Text fontSize="lg" fontWeight="medium">
                {profile.title}
              </Text>
              <Text fontSize="sm">{profile.location}</Text>
            </Stack>
          </Flex>
            <Text align={['center','center','right','right']}>Concordia University</Text>
        </Stack>
        <Divider my={6} w="100%" />
        <Stack>
          <Box border={'1px'} padding={'15px'} backgroundColor={postBackground} borderRadius={'10px'}>
            <Text fontSize="lg" fontWeight="medium" mb={2} marginLeft={'1rem'}>
              Personal Experience
            </Text>

            <Stack ml={5} >
              <ol>
                <li>
                  <Text fontSize="sm" marginBottom={'1rem'}>{profile.experience}</Text>
                </li>
                <li>
                  <Text fontSize="sm" marginBottom={'1rem'}>{profile.experience2}</Text>
                </li>
                <li>
                  <Text fontSize="sm" marginBottom={'1rem'}>{profile.experience3}</Text>
                </li>
              </ol>
            </Stack>
          </Box>
        </Stack>

        <Box border={'1px'} mt='20px'  padding={'15px'} backgroundColor={postBackground} borderRadius={'10px'} >
          <Text fontSize="lg" fontWeight="medium" mb={2}>
            Employment History:
          </Text>
          <Stack>
            {employmentHistory.map((history, index) => (
              <Box key={index} p={2}>
                <Text fontWeight="bold">{history.company}</Text>
                <Text>{history.position}</Text>
                <Text>{history.duration}</Text>
                <Text>{history.description}</Text>
              </Box>
            ))}
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

export default Profile;

