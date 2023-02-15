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
const EducationHistory = () => {
    return (
        <Box
            minWidth={"60vw"}
            borderWidth="1px"
            borderRadius={25}
            p={8}
            width="auto"
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
                    Education History
                </p>
                <Spacer/>
                <Button>
                    <DeleteIcon />
                </Button>
                </Stack>
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
                <FormLabel htmlFor="school-when">When?</FormLabel>
                <Input
                    minWidth={"100%"}
                    type="text"
                    id="name"
                    placeholder="2012-2015"
                    // value={name}
                    // onChange={changeName}
                    borderRadius="10"
                    size="lg"
                    mb={5}
                    width="auto"
                />
            </FormControl>
            <FormControl>
                <FormLabel htmlFor="degree">Degree</FormLabel>
                <Input
                    minWidth={"100%"}
                    type="text"
                    placeholder="B.S. Computer Science"
                    id="degree"
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
export default EducationHistory