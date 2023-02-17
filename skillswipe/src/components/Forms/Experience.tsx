import React, { useState } from "react";
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
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { FcRight, FcRightUp } from "react-icons/fc";
import { toast } from "react-toastify";
import { editExperience } from "@/pages/api/api";

const Experience = (props: any) => {
  const [experience, setExperience] = useState({
    company: "",
    title: "",
    start_year: "",
    end_year: "",
    id: null,
  });
  if (experience.company == "") setExperience(props.experience);
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setExperience((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (event: any) => {
    const token = localStorage.getItem("jwt");
    // call API to update education history
    if (experience.start_year > experience.end_year) {
      toast("Please add Valid start and end year");
    } else {
      // editExperience(token, experience).then((response) => {
      //     console.log(response);
      //     toast("Updated Successfully");
      //   })
      //   .catch((error) => {
      //     toast(error.message);
      //   });
    }

    event.preventDefault();
    console.log(experience); // this will print out the form values
    // You can now use the form values to update the user's education history
  };

  const deleteItem = () => {
    props.deleteExperience(props.experience.id);
  };  
  return (
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
          Experience {props.index} {props.isNew}
        </p>
        <Spacer />
        {!props.isNew && 
          <Button
            style={{
              boxShadow: "0 5px 17px 0px rgba(0, 100, 500, 0.3)",
              border: "3px solid rgba(255, 255, 255, 0.3)",
            }}
            type="button"
            colorScheme={"blue"}
            borderRadius="100px"
            onClick={handleSubmit}
          >
            Update
          </Button>
        }
        {props.isNew &&
          <Button
            style={{
              boxShadow: "0 5px 17px 0px rgba(0, 100, 500, 0.3)",
              border: "3px solid rgba(255, 255, 255, 0.3)",
            }}
            type="button"
            colorScheme={"blue"}
            borderRadius="100px"
            onClick={handleSubmit}
          >
            Add 
          </Button>
        }
        <Button
          style={{
            boxShadow: "0 5px 17px 0px rgba(0, 100, 500, 0.3)",
            border: "3px solid rgba(255, 255, 255, 0.3)",
          }}
          type="button"
          colorScheme={"red"}
          borderRadius="100px"
          onClick={deleteItem}
        >
          <DeleteIcon />
        </Button>
      </Stack>
      <FormControl id="company">
        <FormLabel htmlFor="company">Company</FormLabel>
        <Input
          minWidth={"100%"}
          type="text"
          defaultValue={props.experience.company}
          id="company"
          name="company"
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="title">
        <FormLabel htmlFor="title">Title</FormLabel>
        <Input
          minWidth={"100%"}
          type="text"
          defaultValue={props.experience.title}
          id="title"
          name="title"
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="start_year">
        <FormLabel htmlFor="start_year-when">Start date</FormLabel>
        <Input
          minWidth={"100%"}
          type="text"
          id="start_year"
          defaultValue={props.experience.start_year}
          name="start_year"
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="end_year">
        <FormLabel htmlFor="end_year">End date</FormLabel>
        <Input
          minWidth={"100%"}
          type="text"
          id="end_year"
          defaultValue={props.experience.end_year}
          name="end_year"
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
    </Box>
  );
};
export default Experience;
