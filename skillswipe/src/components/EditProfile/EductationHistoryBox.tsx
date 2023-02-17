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
import EducationHistory from "../Forms/EducationHistory";
import { AddIcon, SmallAddIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { editEducationHistory } from "@/pages/api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { emailValidator } from "@/Util/Validator";




const EducationHistoryBox = () => {
  // call API to get education history
  const profile = useSelector((state) => state as any);
  let educations = profile.auth.educations;
  const deleteEducation = (id: number) => {
    educations = educations.filter((education: any) => education.id !== id);
    console.log(educations)
  };
  return (
    <Stack
      as="form"
      p={5}
      mb={5}
      style={{
        flexDirection: "column",
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
      <Text
        style={{
          alignSelf: "flex-start",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        Education History
        <Button
          style={{
            boxShadow: "0 5px 17px 0px rgba(0, 100, 500, 0.3)",
            border: "3px solid rgba(255, 255, 255, 0.3)",
            marginLeft: "15px",
            marginBottom: "5px",
          }}
          type="submit"
          colorScheme={"teal"}
          borderRadius="100px"
        >
          <AddIcon />
        </Button>
      </Text>

      {educations.map((education: any, index: number) => (
        <div key={education.id}>
          <EducationHistory education={education} index={index} deleteEducation={deleteEducation}/>
        </div>
      ))}
    </Stack>
  );
};
export default EducationHistoryBox;
