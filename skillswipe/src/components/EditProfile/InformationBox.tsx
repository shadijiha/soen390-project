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
import Information from "../Forms/Information";
const InformationBox = () =>{
    return(
        <Stack
          as="form"
          justifyContent="center"
          alignItems="center"
          p={5}
          textAlign="center"
        >
          <Information/>

          <Button
            style={{
              boxShadow: "0 5px 17px 0px rgba(0, 100, 500, 0.3)",
              border: "3px solid rgba(255, 255, 255, 0.3)"
            }}
            type="submit"
            size="lg"
            colorScheme={"blue"}
            borderRadius="100px"
       
            // onClick={handleSubmit}
            >
            Update Personal Information
        </Button>
        </Stack>
    )
}
export default InformationBox;