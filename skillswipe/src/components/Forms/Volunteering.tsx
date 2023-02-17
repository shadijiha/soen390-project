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
const Volunteering = (props: any) => {
   const [volunteering, setVolunteering] = useState({
      company: "",
      title: "",
      start_year: "",
      end_year: "",
      id: null
   });
   if (volunteering.company == "") setVolunteering(props.volunteering);
   const handleChange = (event: any) => {
      const { name, value } = event.target;
      setVolunteering((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   }
   const handleSubmit = (event: any) => {
      const token = localStorage.getItem("jwt");
      // call API to update volunteering
      if (volunteering.start_year > volunteering.end_year) {
         toast("Please add Valid start and end year");
      } else {
         // editVolunteering(token, volunteering).then((response) => {
         //     console.log(response);
         //     toast("Updated Successfully");
         //   })
         //   .catch((error) => {
         //     toast(error.message);
         //   });
      }
      event.preventDefault();
      console.log(volunteering); // this will print out the form values
      // You can now use the form values to update the user's volunteering
   }
   const deleteItem = () => {
      props.deleteVolunteering(props.volunteering.id);
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
               Volunteering {props.index}  {props.isNew}
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
               defaultValue={props.volunteering.company} 
               name="company"
               id="company"
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
          defaultValue={props.volunteering.start_year}
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
          defaultValue={props.volunteering.end_year}
          name="end_year"
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
          defaultValue={props.volunteering.title}
          name="title"
          id="title"
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
export default Volunteering;





