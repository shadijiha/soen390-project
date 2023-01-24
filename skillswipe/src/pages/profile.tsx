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
  name: "Full Name",
  title: "Software Engineer",
  location: "Montreal ,QC, CA",
  experience: "5 years of experience in full stack development",
  image: "https://via.placeholder.com/150x150",
  cover: "https://i.pinimg.com/736x/39/86/fe/3986fed5bc314b3ea37701b328c2485d--covers-for-facebook-pop-of-color.jpg",
  });

  const handleEdit = () => {
  setProfile({
  ...profile,
  name: "Full Name",
  title: "Software Engineer",
  location: "Montreal ,QC, CA",
  experience: "5 years of experience in full stack development",
  image: "https://via.placeholder.com/150x150",
  cover: "https://via.placeholder.com/1000x300",
  });
  };

  const postBackground = useColorModeValue("gray.100", "gray.700");
  return (
  
  <Flex direction="column" align="right" p={12} pt = {'0px'}>
  <NavBar />
  <Box w="100%" h="300px" bg="gray.100" rounded="lg" mb={6} />
  <Flex align="center" mt={4}>
  <Image src={"https://image.shutterstock.com/image-photo/young-handsome-man-beard-wearing-260nw-1768126784.jpg"} w="150px" h="150px" rounded="full" mr={4} />
  <Stack>

  <Text fontSize="2xl" fontWeight="bold">
  {profile.name}
  </Text>
 

  <Text fontSize="lg" fontWeight="medium">
  {profile.title}
  </Text>
  <Text fontSize="sm">{profile.location}</Text>
  </Stack>
  <Text ml={'auto'}>Concordia University</Text>
  </Flex>
  <Divider my={6} w="100%" />
  <Stack>
    <Box border={'1px'} padding = {'15px'} backgroundColor = {postBackground} borderRadius = {'10px'}>
  <Text fontSize="lg" fontWeight="medium" mb={2}>
  Personal Experience
  </Text>
  <Text fontSize="sm">{profile.experience}</Text>
  </Box>
  </Stack>
  <Box border={'1px'} mt = '20px' padding={'15px'} backgroundColor = {postBackground} borderRadius = {'10px'} >
  <Text fontSize="lg" fontWeight="medium" mb={2}>
    Employment History 
  </Text>
  </Box>

  <Flex justify="space-between" mt={6}>
  <Button variantColor="teal" variant="outline" onClick={handleEdit}>
  Edit Profile
  </Button>
  </Flex>
  </Flex>
  );
  };
  
  export default Profile;

