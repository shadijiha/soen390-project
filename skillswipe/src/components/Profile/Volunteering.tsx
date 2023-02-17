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
import EducationHistory from "../Forms/EducationHistory";
import { AddIcon, SmallAddIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { editEducationHistory } from "@/pages/api/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { emailValidator } from "@/Util/Validator";
import ProfileStyle from "@/styles/profilestyle";

const Volunteering = () => {
  // call API to get education history
  const profile = useSelector((state) => state as any);
  let educations = profile.auth.educations;

  return (
    <>
      <style jsx>{ProfileStyle}</style>
      <div>
        <h1
          className="edu-text"
          style={{
            fontWeight: 600,
          }}
        >
          <span>Volunteering History</span>
        </h1>
      </div>
      <Stack
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* volunteer */}
        {/* first volunteer card */}
        <div>
          <div className="edu-feature-card1">
            <img
              src="https://img.icons8.com/doodle/512/volunteering.png"
              className="edu-icon"
              width="50px"
              height="50px"
              alt="Harvard"
            />
            <h2 className="edu-text09">Title1</h2>
            <span className="edu-text10">
              Description1 for volunteer history here.
            </span>
            <span className="edu-text11">2020</span>
          </div>
        </div>

        {/* second volunteer card */}
        <div>
          <div className="edu-feature-card1">
            <img
              src="https://img.icons8.com/doodle/512/volunteering.png"
              className="edu-icon"
              width="50px"
              height="50px"
              alt="Harvard"
            />
            <h2 className="edu-text09">Title2</h2>
            <span className="edu-text10">
              Description2 for volunteer history here.
            </span>
            {/* DATE API HERE */}
            <span className="edu-text11">2020</span>
          </div>
        </div>

        {/* third volunteer card */}
        <div>
          <div className="edu-feature-card1">
            <img
              src="https://img.icons8.com/doodle/512/volunteering.png"
              className="edu-icon"
              width="50px"
              height="50px"
              alt="Harvard"
            />
            <h2 className="edu-text09">Title3</h2>
            <span className="edu-text10">
              Description3 for volunteer history here.
            </span>
            <span className="edu-text11">2020</span>
          </div>
        </div>
      </Stack>
    </>
  );
};
export default Volunteering;
