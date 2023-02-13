import React from "react"      
import {
    FormControl,
    FormLabel,
    Input,
    Button,
    Stack,
    Box,
    Heading,
    Textarea,
    Spacer,
  } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { FcRight, FcRightUp } from "react-icons/fc";

const Experience = () => {
    return(
        <Box
            minWidth={"60vw"}
            borderWidth="1px"
            borderRadius={25}
            p={8}
            width="auto"
            mt={30}
          >
            <Stack direction={"row"}>

            <p
              style={{
                  textAlign: "left",
                  fontSize: "20px",
                  fontWeight: "bold",
                  marginBottom: "20px",
                }}
                >
              Experience 1
            </p> 
            <Spacer/>
            <Button>
                <DeleteIcon/>
            </Button>

            </Stack>
            <FormControl>
              <FormLabel htmlFor="experience1">Company</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                id="name"
                placeholder="Company name"
                // // value={name}
                // onChange={changeName}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="what">Title</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                id="name"
                placeholder="ex: Software Engineer Intern"
                // // value={name}
                // onChange={changeName}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="date">When?</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                id="name"
                placeholder="Company name"
                // // value={name}
                // onChange={changeName}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="what">What did you do?</FormLabel>
              <Textarea
                minWidth={"100%"}
                id="name"
                placeholder="Example: I worked on the front end of the website."
                // onChange={changeName}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
                word-wrap="break-word"
                wrap="soft"
              /> 
            </FormControl>
          </Box>



    )
}
export default Experience       
        