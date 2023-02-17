import { SearchIcon } from "@chakra-ui/icons";
import { Button, Collapse, IconButton, InputGroup, InputRightElement, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
const MobileSearchBar = () =>{
    const [search, setSearch] = useState(false);
    const toggleSearch = () => setSearch(!search);
    const [searchTerm, setSearchTerm] = useState("");
     const [searchOpen, setSearchOpen] = useState(false);
     const formBackground = useColorModeValue("gray.100", "gray.700");
     const handleSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(e.target.value);
       };
       const { getButtonProps, onToggle, getDisclosureProps, isOpen } = useDisclosure();
    return(
        <>
        <Button  onClick= {onToggle} variant = "ghost" aria-label="Search" backgroundColor="transparent">Search</Button>
                <Collapse in={isOpen} animateOpacity>
                  <InputGroup>

                    <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={handleSearch}
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
                      <IconButton variant = "ghost" aria-label="Search" icon={<SearchIcon />} backgroundColor = "transparent" />

                      </InputRightElement>

                      
                  </InputGroup>
            </Collapse>
        </>
    )
}
export default MobileSearchBar