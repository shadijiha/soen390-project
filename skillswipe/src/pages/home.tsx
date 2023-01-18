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

const Home = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const placeholderBackground = useColorModeValue("gray.200", "gray.600");
  const toggleTheme = useColorModeValue("🌙", "💡");

  return (
    <>
      <NavBar></NavBar>
    </>
  );
};
export default Home;
