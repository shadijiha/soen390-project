import React from "react";
import { Text } from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import Layout from "@/components/Layout";


const findJob = () => {
  return (
    <>
      <Layout>
      <NavBar></NavBar>
      <Text data-testid="find-jobs">Find Jobs</Text>
      </Layout>
    </>
  );
};

export default findJob;
