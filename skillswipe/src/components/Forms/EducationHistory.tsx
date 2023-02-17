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
import { toast } from "react-toastify";
import { editEducationHistory } from "@/pages/api/api";
const EducationHistory = (props: any) => {
  const [educationHistory, setEducationHistory] = useState({
    institution: "",
    degree: "",
    start_year: "",
    end_year: "",
    id: null
  });
  if (educationHistory.institution == "") setEducationHistory(props.education);
  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setEducationHistory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (event: any) => {
    const token = localStorage.getItem("jwt");
    // call API to update education history
    if (educationHistory.start_year > educationHistory.end_year) {
      toast("Please add Valid start and end year");
    } else {
      // editEducationHistory(token, educationHistory).then((response) => {
      //     console.log(response);
      //     toast("Updated Successfully");
      //   })
      //   .catch((error) => {
      //     toast(error.message);
      //   });
    }

    event.preventDefault();
    console.log(educationHistory); // this will print out the form values
    // You can now use the form values to update the user's education history
  };

  const deleteItem = () => {
    props.deleteEducation(props.education.id);
  };
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
          Education {props.index} {props.isNew}
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
      <FormControl id="institution">
        <FormLabel htmlFor="institution">Institution</FormLabel>
        <Input
          minWidth={"100%"}
          type="text"
          defaultValue={props.education.institution}
          name="institution"
          id="institution"
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
          defaultValue={props.education.start_year}
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
          defaultValue={props.education.end_year}
          name="end_year"
          borderRadius="10"
          size="lg"
          mb={5}
          width="auto"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="degree">
        <FormLabel htmlFor="degree">Degree</FormLabel>
        <Input
          minWidth={"100%"}
          type="text"
          defaultValue={props.education.degree}
          name="degree"
          id="degree"
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
export default EducationHistory;
