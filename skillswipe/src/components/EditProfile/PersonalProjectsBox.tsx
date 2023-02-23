import axios from 'axios';
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
}  from  "@chakra-ui/react" ;
import PersonalProjects from "../Forms/PersonalProjects";
import { AddIcon, SmallAddIcon } from "@chakra-ui/icons";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { emailValidator } from "@/Util/Validator";
import { useState } from 'react';

type PersonalProjects = {
   name?: string,
   description?: string,
   url?: string,
   start_year?: string,
   end_year?: string,
   id: number
}

const PersonalProjectsBox = () => {
   const profile = useSelector((state) => state as any);
   const [personalProjectsList, setPersonalProjectsList] = useState(profile.auth.personal_projects as PersonalProjects[]);
   const deletePersonalProjects = (id: number) => {
      setPersonalProjectsList(personalProjectsList.filter((personalProjects: any) => personalProjects.id !== id))
   }
   const addPersonalProjects = () => {
      let pp: PersonalProjects = { id: 10 };
      setPersonalProjectsList(oldArray => [...(oldArray || []), pp]);
   }
   const isNew = (personalProjects: PersonalProjects)=> {
      return !(personalProjects.name && personalProjects.start_year && personalProjects.end_year && personalProjects.description)
   }
   return (
      <Stack
         as="form"
         p={5}
         mb={5}
         style={{
            flexDirection: "column",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            alignSelf: "center",
            WebkitAlignContent: "center",
            WebkitAlignItems: "center",
            WebkitBoxAlign: "center",
            WebkitFlexWrap: "wrap",
            WebkitJustifyContent: "center",
         }}
      >
         <Text
            style={{
               alignSelf: "flex-start",
               fontSize: "1.5rem",
               fontWeight: "bold",
            }}
         >
            Personal Projects
            <Button
               style={{
                  boxShadow: "0 5px 17px 0px rgba(0, 100, 500, 0.3)",
                  border: "3px solid rgba(255, 255, 255, 0.3)",
                  marginLeft: "15px",
                  marginBottom: "5px",
               }}
               type="button"
               colorScheme={"teal"}
               borderRadius="100px"
               onClick={addPersonalProjects}
            >
               <AddIcon />
            </Button>
         </Text>

         <div style= {{display: "flex", flexDirection: "column-reverse"}}>
            {personalProjectsList && personalProjectsList.map((personalProjects: any, index: number) => (
               <div key={index}>
                  <PersonalProjects index={index+1}personalProjects={personalProjects} deletePersonalProjects={deletePersonalProjects} isNew={isNew(personalProjects)}/>
               </div>
            ))}
         </div>
      </Stack>
   );
};

export default PersonalProjectsBox;