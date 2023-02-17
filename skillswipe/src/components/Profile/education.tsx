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

const Education = () => {
  // call API to get education history
  const profile = useSelector((state) => state as any);
  let educations = profile.auth.educations;

  return (
    <>
      <style jsx>{ProfileStyle}</style>
      <div className="edu-container">
        <div className="edu-features">
          <h1
            className="edu-text"
            style={{
              fontWeight: 600,
              fontSize: "2.5rem",
            }}
          >
            <span>Education History</span>
          </h1>
          <span className="edu-text03">
            <span></span>
          </span>

          <div className="edu-container1">
            <div className="edu-feature-card1">
              <img
                src="https://1000logos.net/wp-content/uploads/2017/02/Harvard-Logo.png"
                className="edu-icon"
                width="50px"
                height="50px"
                alt="Harvard"
              />
              <h2 className="edu-text09">Harvard</h2>
              <span className="edu-text10">
                TA for CS50, Harvards introductory course to computer science.
              </span>
              <span className="edu-text11">2020-Present</span>
            </div>
            <div className="edu-feature-card">
              <img
                src="https://www.concordia.ca/content/concordia/en/social/guidelines-conduct.img.png/1650398601839.png"
                className="edu-icon"
                width="50px"
                height="50px"
                alt="Concordia University"
              />
              <h2 className="edu-text06">Concordia University</h2>
              <span className="edu-text07">
                Earned my bachelors degree in Computer Science, with a minor in
                Mathematics.
              </span>
              <span className="edu-text08">2015-2020</span>
            </div>
            <div className="edu-feature-card2">
              <img
                src="https://penji.co/wp-content/uploads/2019/02/yale-university-School-Logo-Design-1-975x1024.png"
                className="edu-icon"
                width="50px"
                height="50px"
                alt="Yale"
              />
              <h2 className="edu-text12">Dawson</h2>
              <span className="edu-text13">
                Legally forced to complete my high school diploma in my youth
              </span>
              <span className="edu-text14">2015</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Education;
