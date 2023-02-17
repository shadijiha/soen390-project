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
import { editVolunteering } from "@/pages/api/api";
const PersonalProjects = (props: any) => {
   const [personalProject, setPersonalProject] = useState({
      name: "",
      description: "",
      url: "",
      start_year: "",
      end_year: "",
      id: null
   });
   if (personalProject.name == "") setPersonalProject(props.personalProject);
   const handleChange = (event: any) => {
      const { name, value } = event.target;
      setPersonalProject((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   }
   const handleSubmit = (event: any) => {
      const token = localStorage.getItem("jwt");
      // call API to update personalProject
      if (personalProject.start_year > personalProject.end_year) {
         toast("Please add Valid start and end year");
      } else {
         // editPersonalProject(token, personalProject).then((response) => {
         //     console.log(response);
         //     toast("Updated Successfully");
         //   })
         //   .catch((error) => {
         //     toast(error.message);
         //   });
      }
      event.preventDefault();
      console.log(personalProject); // this will print out the form values
      // You can now use the form values to update the user's personalProject
   }
   const deleteItem = () => {
      props.deletePersonalProject(props.personalProject.id);
   }
   return (
      <Box
         minWidth={"60vw"}
         borderWidth="1px"
         borderRadius={25}
         p={8}
         mb={8}
         boxShadow="lg"
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
               Personal Project {props.index} {props.isNew}
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
          <FormControl id="name">
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
               minWidth={"100%"}
               type="text"
               defaultValue={props.personalProject?.name || ''}
               name="name"
               id="name"
               borderRadius="10"
               size="lg"
               mb={5}
               width="auto"
               onChange={handleChange}
            />
         </FormControl>
         <FormControl id="description">
            <FormLabel htmlFor="description">Description</FormLabel>
            <Input
               minWidth={"100%"}
               type="text"
               name="description"
               id="description"
               defaultValue={props.personalProject?.description || ''}
               borderRadius="10"
               size="lg"
               mb={5}
               width="auto"
               onChange={handleChange}
            />
         </FormControl>
         <FormControl id="url">
            <FormLabel htmlFor="url">URL</FormLabel>
            <Input
               minWidth={"100%"}
               type="text"
               name="url"
               id="url"
               defaultValue={props.personalProject?.url || ''}
               borderRadius="10"
               size="lg"
               mb={5}
               width="auto"
               onChange={handleChange}
            />
         </FormControl>
         <FormControl id="start_year">
            <FormLabel htmlFor="start_year">Start Year</FormLabel>
            <Input
               minWidth={"100%"}
               type="text"
               name="start_year"
               id="start_year"
               defaultValue={props.personalProject?.start_year || ''}
               borderRadius="10"
               size="lg"
               mb={5}
               width="auto"
               onChange={handleChange}
            />
         </FormControl>
         <FormControl id="end_year">
            <FormLabel htmlFor="end_year">End Year</FormLabel>
            <Input
               minWidth={"100%"}
               type="text"
               name="end_year"
               id="end_year"
               defaultValue={props.personalProject?.end_year || ''}
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
export default PersonalProjects;

