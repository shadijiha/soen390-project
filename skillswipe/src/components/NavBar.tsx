import React from "react";
import Link from "next/link";

import { useState } from "react";
import Router, { useRouter } from "next/router";
import {
  useColorMode,
  Switch,
  Flex,
  Button,
  IconButton,
  useColorModeValue,
  Box,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  const [display, changeDisplay] = useState("none");
  const toggleTheme = useColorModeValue("🌙", "💡");
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const router = useRouter();

  const logout = () => {
    if (localStorage.getItem("jwt")) {
      localStorage.removeItem("jwt");

      // More work To be done
    }
  };
  return (
    <Box as="nav" p={15} w="100%" pt={"0px"}>
      <Flex>
        <Flex
          backdropFilter="auto"
          backdropBlur="xl"
          position="fixed"
          left="0px"
          align="center"
          w="100%"
          backgroundColor="rgba(255, 255, 255, 0.15)"
          boxShadow="0px 0px 20px rgba(0, 0, 0, 0.25)"
        >
          {/* Desktop */}

          <Text style={{ fontWeight: "bold", fontSize: 25 }} ml={"15px"}>
            🚀 SkillSwipe
          </Text>
          <Flex display={["none", "none", "flex", "flex"]} ml={"auto"}>
            <NextLink href="/home" passHref>
              <Button as="a" variant="solid" aria-label="Home" my={5} w="100%">
                Home
              </Button>
            </NextLink>

            <NextLink href="/findJob" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Find Jobs"
                my={5}
                w="100%"
              >
                Find Jobs
              </Button>
            </NextLink>

            <NextLink href="/" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Sign In/Logout"
                my={5}
                w="100%"
                onClick={logout}
              >
                Sign In/Logout
              </Button>
            </NextLink>

            <NextLink href="/profile" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="My Account"
                my={5}
                w="100%"
              >
                My Account
              </Button>
            </NextLink>
          </Flex>

          {/* Mobile */}
          <IconButton
            aria-label="Open Menu"
            size="lg"
            mr={2}
            icon={<HamburgerIcon />}
            onClick={() => changeDisplay("flex")}
            display={["flex", "flex", "none", "none"]}
            ml={"auto"}
          />
          <Button marginLeft={3} onClick={toggleColorMode}>
            {toggleTheme}
          </Button>
        </Flex>

        {/* Mobile Content */}
        <Flex
          w="100vw"
          display={display}
          bgColor={formBackground}
          zIndex={20}
          h="100vh"
          pos="fixed"
          top="0"
          left="0"
          overflowY="auto"
          flexDir="column"
        >
          <Flex justify="flex-end">
            <IconButton
              mt={2}
              mr={2}
              aria-label="Open Menu"
              size="lg"
              icon={<CloseIcon />}
              onClick={() => changeDisplay("none")}
            />
          </Flex>

          <Flex flexDir="column" align="center">
            <NextLink href="/home" passHref>
              <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
                Home
              </Button>
            </NextLink>

            <NextLink href="/inbox" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Messages"
                my={5}
                w="100%"
              >
                Messages
              </Button>
            </NextLink>

            <NextLink href="/profile" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="My Account"
                my={5}
                w="100%"
              >
                My Account
              </Button>
            </NextLink>

            <NextLink href="/" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Sign In"
                my={5}
                w="100%"
              >
                Sign In/Logout
              </Button>
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}
