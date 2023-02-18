/* eslint-disable react/jsx-key */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
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

import { AddIcon, SmallAddIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { editEducationHistory } from "@/pages/api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { emailValidator } from "@/Util/Validator";
import ProfileStyle from "@/styles/profilestyle";

const Awards = () => {
  // call API to get education history
  const profile = useSelector((state) => state as any);
  let educations = profile.auth.educations;
  const skills = profile.auth.skills;
  const awards = [
    "1st Place - Microsoft Intern Challenge 2021",
    "2nd Place - Google Code Jam 2021",
    "3rd Place - Concordia Hackathon 2023",
    "1st Place - Shopify Challenge 2021",
    "2nd Place - Google Code Jam 2021",
  ];

  return (
    <>
      <style jsx>{ProfileStyle}</style>
      <div>
        <div>
          <h1
            style={{
              fontWeight: 600,
              fontSize: "1.5rem",
              paddingTop: "2rem",
              paddingBottom: "2rem",
              textAlign: "center",
            }}
          >
            <text>🏅 Awards</text>
          </h1>
        </div>
        <Stack
          spacing={0}
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            alignContent: "center",
            paddingRight: "3rem",
            paddingLeft: "3rem",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          {/* map through the skillsArray and create a button for each */}
          {awards.map((awards) => (
            <Button
              className="skill"
              style={{
                backgroundColor: "transparent",
                borderWidth: "2px",
                textShadow: "0px 0px 0px #000000CA",
                fontWeight: 600,
                marginRight: "1em",
                borderRadius: "100px",
                marginBottom: "1em",
              }}
            >
              {awards}
            </Button>
          ))}
        </Stack>
      </div>
    </>
  );
};
export default Awards;
