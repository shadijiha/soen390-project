import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, List, ListIcon, ListItem, Select, useColorModeValue, useDisclosure, Stack, border } from "@chakra-ui/react";
import React, { useState } from "react";

const Search = () => {
  const [search, setSearch] = useState(false);
  const toggleSearch = () => setSearch(!search);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const { getButtonProps, onToggle, getDisclosureProps, isOpen } = useDisclosure();
  const handleSearch = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(e.target.value);
  };
  return (
    <>
      <Flex ml={"auto"} display={["none", "none", "flex", "flex"]}>
        <Stack>

          <Box

            display={["none", "none", "flex", "flex"]}
            ml={"auto"}
            mr={"auto"}
            w="100%"
            position="relative"
          // search 
          >


            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              list="browser"
              style={{
                width: "420px",
                height: "40px",
                paddingLeft: "30px",
                borderRadius: "5px",
                border: "none",
                outline: "1px solid black",
                backgroundColor: formBackground,
              }}
            />
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

              onClick={toggleSearch}
            />


          </Box>
          {/* <div>
            <List >
              <ListItem style={{border : "2px solid white"}}>
                <ListIcon  color='green.500' />
                Lorem ipsum dolor sit amet, consectetur adipisicing elit
              </ListItem>
            </List>
            <List>
              <ListItem>
                Hello
              </ListItem>
            </List>
          </div> */}

        </Stack>
      </Flex>
    </>
  )

}
export default Search