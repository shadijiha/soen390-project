import { SearchIcon } from "@chakra-ui/icons";
import { Button, Collapse, IconButton, InputGroup, InputRightElement, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { SetStateAction, useState } from "react";
const MobileSearchBar = () =>{
   
    const [searchTerm, setSearchTerm] = useState("");
    const formBackground = useColorModeValue("gray.100", "gray.700");
    const handleSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(e.target.value);
       };
       const { getButtonProps, onToggle, getDisclosureProps, isOpen } = useDisclosure();
       const router = useRouter();

       const handleSubmit = (e: any) => {
         e.preventDefault();
         router.push(`/searchResultpage?q=${searchTerm}`);
       };
     
       const handleChange = (event: { target: { value: SetStateAction<string>; }; }) => {
         setSearchTerm(event.target.value);
     };
     
    return(
        <>
        <Button  onClick= {onToggle} variant = "ghost" aria-label="Search" backgroundColor="transparent">Search</Button>
                <Collapse in={isOpen} animateOpacity>
                  <InputGroup>
                    <form onSubmit={handleSubmit}>
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleChange}
                      style={{
                        
                        width: "250px",
                        height: "40px",
                        paddingLeft: "10px",
                        borderRadius: "100px",
                        border: "none",
                        outline: "1px  black",
                        backgroundColor: formBackground,
                    }}
                    />

                    <InputRightElement width={9}>
                    <SearchIcon
              position="absolute"
              top="50%"
              transform="translateY(-50%)"
              left="10px"
              color="gray.500"
              zIndex={1}
              cursor="pointer"

              // change color when hover over
              _hover={{
                color: "blue.300",
              }}

              onClick={handleSubmit}
            />
                      

                      </InputRightElement>
                    </form>

                      
                  </InputGroup>
            </Collapse>
        </>
    )
}
export default MobileSearchBar

function setSearchTerm(event: { target: { value: SetStateAction<string>; }; }) {
    throw new Error('Function not implemented.');
}