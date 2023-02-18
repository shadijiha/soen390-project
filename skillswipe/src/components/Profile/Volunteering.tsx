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

const Volunteering = ({volunteer} : any) => {
  return (
    (volunteer && volunteer.length > 0) &&
    <>
      <style jsx>{ProfileStyle}</style>
      <div>
        <h1
          className="edu-text"
          style={{
            fontWeight: 600,
            fontSize: "2.5rem",
            paddingTop: "1rem",
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


        {volunteer.map((element : any) => {
          return(
            <div>
            <div className="edu-feature-card1">
              <img
                src="https://img.icons8.com/doodle/512/volunteering.png"
                className="edu-icon"
                width="50px"
                height="50px"
                alt="Harvard"
              />
              <h2 className="edu-text09">{element.company}</h2>
              <span className="edu-text10">
                {element.title}
              </span>
              <span className="edu-text11">{`${element.start_year}-${element.end_year ? element.end_year : "Present"}`}</span>
            </div>
          </div>
          )



        })}


      
      </Stack>
    </>
  );
};
export default Volunteering;
