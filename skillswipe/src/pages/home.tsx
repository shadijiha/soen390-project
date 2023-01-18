import {
  Flex,
  Heading,
  Input,
  Button,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import Head from "next/head";
import type { NextPage } from "next";
import NavBar from "@/components/NavBar";
import { Box, Text, List, ListItem } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Home = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const placeholderBackground = useColorModeValue("gray.200", "gray.600");
  const toggleTheme = useColorModeValue("🌙", "💡");

  const [posts, setPosts] = useState([
    { id: 1, title: "First Post", body: "This is a description" },
    { id: 2, title: "Second Post", body: "This is a description" },
    { id: 3, title: "Third Post", body: "This is a description" },
  ]);

  return (
    <>
      <NavBar></NavBar>
      <Box display="flex" justifyContent="center" alignItems="center" p={4}>
        <Box>
          <Heading paddingBottom={5}>Recent Posts</Heading>
          <List>
            {posts.map((post) => (
              <ListItem key={post.id}>
                <Box
                  borderWidth="1px"
                  borderColor={formBackground}
                  backgroundColor={placeholderBackground}
                  padding="1rem"
                  marginBottom="1rem"
                  rounded="lg"
                  overflow="hidden"
                  width="100%"
                  minW="80vw"
                >
                  <Text>{post.title}</Text>
                  <Text>{post.body}</Text>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </>
  );
};

export default Home;
