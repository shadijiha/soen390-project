import React from "react";
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
import Experience from "../Forms/Experience";
import { AddIcon, SmallAddIcon } from "@chakra-ui/icons";

const WorkProfile = () => {
  // Api calls

  return (
    <Stack
      as="form"
      p={5}
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
        Work Experience
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

      <Experience />
      <Experience />

      {/* <Button
        style={{
          boxShadow: "0 5px 17px 0px rgba(0, 100, 500, 0.3)",
          border: "3px solid rgba(255, 255, 255, 0.3)",
        }}
        type="submit"
        size="lg"
        colorScheme={"blue"}
        borderRadius="100px"
        mt={50}
        // onClick={handleSubmit}
      >
        Update Work Experience
      </Button> */}
    </Stack>
  );
};
export default WorkProfile;
