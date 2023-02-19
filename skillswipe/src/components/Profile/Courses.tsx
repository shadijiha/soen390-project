/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Text,
  chakra,
  Container,
  Divider,
  HStack,
  Icon,
  Link,
  Stack,
  Tooltip,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import ProfileStyle from "../../styles/profilestyle";
import { AddIcon } from "@chakra-ui/icons";
import { FaPencilAlt, FaPencilRuler, FaSchool } from "react-icons/fa";
const courseTitles = ["Shopify Course", "React Course", "Node Course"];
const courseDescriptions = [
  "Shopify Course Description",
  "React Course Description",
  "Node Course Description",
];
const courseYears = ["2015", "2016", "2017"];

const Courses = ({courses} : any) => {
  
  
  return (
    courses && 
    <div data-testid="courses"> 
    <>
      <style jsx>{ProfileStyle}</style>
      <div>
        <h1
          style={{
            fontWeight: 600,
            fontSize: "1.5rem",
            paddingTop: "2rem",
            paddingBottom: "1rem",
          }}
        >
          <span>Accomplished Courses</span>
        </h1>
      </div>
      {/* map through each course and make a container for each course */}
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        {/* map through each course and make a container for each course */}
        {courses.map((courses : any) => (
          <Container p={{ base: 5, md: 6 }}>
            <Stack
              w="17rem"
              spacing={2}
              p={4}
              border="1px solid"
              borderColor={useColorModeValue("gray.400", "gray.600")}
              rounded="md"
              margin="0"
              _hover={{
                boxShadow: useColorModeValue(
                  "0 4px 6px rgba(160, 174, 192, 0.6)",
                  "0 4px 6px rgba(9, 17, 28, 0.4)"
                ),
              }}
            >
              <HStack justifyContent="space-between" alignItems="baseline">
                <Box pos="relative">
                  <Avatar
                    src="https://img.icons8.com/external-becris-flat-becris/512/external-math-literary-genres-becris-flat-becris.png"
                    name="Course"
                    size="xl"
                    borderRadius="md"
                  />
                </Box>
                <Icon as={FaPencilRuler} w={6} h={6} />
              </HStack>
              <chakra.h1 fontSize="xl" fontWeight="bold">
                {`${courses.courseName} ${courses.courseNumber}`}
              </chakra.h1>
            
            </Stack>
          </Container>
        ))}
      </Grid>
    </>
    </div>
  );
};
export default Courses;
