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
  } from "@chakra-ui/react";
const Information =() => {
    return(
        <Box
            minWidth={"60vw"}
            borderWidth="1px"
            borderRadius={25}
            p={8}
            width="auto"
          >
            <p
              style={{
                textAlign: "left",
                fontSize: "20px",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              My Profile
            </p>
            <FormControl>
              <FormLabel htmlFor="name">Name</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                id="name"
                // placeholder={profile.name}
                // value={name}
                // onChange={changeName}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="school">School</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                // placeholder={profile.school}
                id="school"
                // value={school}
                // onChange={(event) => setSchool(event.target.value)}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="location">Title</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                // placeholder={profile.title}
                id="title"
                // value={title}
                // onChange={(event) => setTitle(event.target.value)}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="location">Location</FormLabel>
              <Input
                minWidth={"100%"}
                type="text"
                // placeholder={profile.location}
                id="location"
                // value={location}
                // onChange={(event) => setLocation(event.target.value)}
                borderRadius="10"
                size="lg"
                mb={5}
                width="auto"
              />
            </FormControl>
          </Box>
    )
}
export default Information;