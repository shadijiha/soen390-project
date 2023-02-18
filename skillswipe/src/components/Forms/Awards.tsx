import React, {useState} from "react";
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
import { editAwards } from "@/pages/api/api";
const Awards = (props: any) => {
   const [award, setAward] = useState({
      title: "",
      description: "",
      year: "",
      id: null
   });
   if (award.title == "") setAward(props.award);
   const handleChange = (event: any) => {
      const { name, value } = event.target;
      setAward((prevState) => ({
         ...prevState,
         [name]: value,
      }));
   };
   const handleSubmit = (event: any) => {
      const token = localStorage.getItem("jwt");
      // call API to update award
      if (award.year > "1921") {
         toast("Please add Valid year");
      } else {
         // editAwards(token, award).then((response) => {
         //     console.log(response);
         //     toast("Updated Successfully");
         //   })
         //   .catch((error) => {
         //     toast(error.message);
         //   });
      }

      event.preventDefault();
      console.log(award); // this will print out the form values
      // You can now use the form values to update the user's award
   };

   const deleteItem = () => {
      props.deleteAward(props.award.id);
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
                 /* fonstSize: "20px",*/
                  fontWeight: "bold",
                  marginBottom: "20px",
               }}
            >
               Award {props.index} {props.isNew}
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
            <FormControl id="title">
               <FormLabel htmlFor="title">Title</FormLabel>
               <Input
                  minWidth={"100%"}
                  type="text"
                  defaultValue={props.award.title}
                  name="title"
                  id="title"
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
                  defaultValue={props.award.description}
                  name="description"
                  id="description"
                  borderRadius="10"
                  size="lg"
                  mb={5}
                  width="auto"
                  onChange={handleChange}
               />
            </FormControl>
            <FormControl id="year">
               <FormLabel htmlFor="year">Year</FormLabel>
               <Input
                  minWidth={"100%"}
                  type="text"
                  id="year"
                  defaultValue={props.award.year}
                  name="year"
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
   export default Awards;
               