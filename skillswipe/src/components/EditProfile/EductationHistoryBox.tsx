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
import EducationHistory from "../Forms/EducationHistory";
import { AddIcon, SmallAddIcon } from "@chakra-ui/icons";

const EducationHistoryBox = () => {
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

      <EducationHistory />
      <EducationHistory />
    </Stack>
  );
};
export default EducationHistoryBox;
