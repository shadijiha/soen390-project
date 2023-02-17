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
import EducationHistory from "../Forms/EducationHistory";
import { AddIcon, SmallAddIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { editEducationHistory } from "@/pages/api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { emailValidator } from "@/Util/Validator";

const education = () => {
  // call API to get education history
  const profile = useSelector((state) => state as any);
  let educations = profile.auth.educations;

  return (
    <>
      <Text>test</Text>
    </>
  );
};
export default education;
