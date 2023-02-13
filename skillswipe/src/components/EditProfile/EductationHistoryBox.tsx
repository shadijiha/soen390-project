import React from "react"
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
import { SmallAddIcon } from "@chakra-ui/icons";


const EducationHistoryBox = () =>{

    return(
        <Stack
          as="form"
          justifyContent="center"
          alignItems="center"
          p={5}
          textAlign="center"
        >
        <Text fontSize={40}>Education History</Text>
         <EducationHistory/>
         <EducationHistory/>  
         <Button>
         <SmallAddIcon boxSize={10}/> 
          </Button>  
         <Button
            style={{
              boxShadow: "0 5px 17px 0px rgba(0, 100, 500, 0.3)",
              border: "3px solid rgba(255, 255, 255, 0.3)"
            }}
            type="submit"
            size="lg"
            colorScheme={"blue"}
            borderRadius="100px"
            mt={50}
            // onClick={handleSubmit}
            >
                     
            Update Educational History
        </Button>     
        </Stack>
    )
}
export default EducationHistoryBox;