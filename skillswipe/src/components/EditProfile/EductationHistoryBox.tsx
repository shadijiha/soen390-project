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

type Education = {
  institution?: string,
  start_year?: string,
  end_year?: string,
  degree?: string,
  id: number
}


const EducationHistoryBox = () => {
  const profile = useSelector((state) => state as any);
  const [educationList, setEducationList] = useState(profile.auth.educations as Education[]);
  const deleteEducation = (id: number) => {
    setEducationList(educationList.filter((education: any) => education.id !== id))
  };
  const addEducation = () => {
    let educ: Education = { id: 10 };
    setEducationList(oldArray => [...oldArray, educ]);
  }
  const isNew = (education: Education)=> {
    return !(education.institution && education.start_year && education.end_year && education.degree)
  }
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
          type="button"
          colorScheme={"teal"}
          borderRadius="100px"
          onClick={addEducation}
        >
          <AddIcon />
        </Button>
      </Text>

      <div style={{ display: "flex", flexDirection: "column-reverse" }}>
        {educationList && educationList.map((education: any, index: number) => (
          <div key={education.id} >
            <EducationHistory education={education} index={index+1} deleteEducation={deleteEducation} isNew={isNew(education)}/>
          </div>
        ))}
      </div>

    </Stack>
  );
};
export default EducationHistoryBox;