import React from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  useColorMode,
  Center,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const googleBackground = useColorModeValue("white", "gray.700");
  const placeholderBackground = useColorModeValue("gray.200", "gray.600");
  const toggleTheme = useColorModeValue("🌙", "💡");

  return (
    <>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Flex
          direction="column"
          background={formBackground}
          p={12}
          rounded={25}
        >
          <Heading mb={6}>Register 🧖🏼</Heading>
          <Input
            placeholder="Email"
            variant="filled"
            mb={3}
            type="email"
            background={placeholderBackground}
          />
          <Input
            placeholder="Password"
            variant="filled"
            mb={3}
            type="password"
            background={placeholderBackground}
          />
          <Input
            placeholder="Confirm Password"
            variant="filled"
            mb={6}
            type="password"
            background={placeholderBackground}
          />
          <Button colorScheme="green" mb={4}>
            Register
          </Button>
          {/* Google */}
          <Button
            mb={4}
            w={"full"}
            variant={"outline"}
            backgroundColor={googleBackground}
            leftIcon={<FcGoogle />}
          >
            <Center>
              <Text>Sign Up with Google</Text>
            </Center>
          </Button>

          <Button
            mb={4}
            onClick={toggleColorMode}
            _hover={{ bg: "transparent" }}
            bg="transparent"
          >
            {toggleTheme}
          </Button>
          <Button mb={-5}>
            <Link href="/">
              <Text fontSize={13}>Already a user?</Text>
            </Link>
          </Button>
        </Flex>
      </Flex>
    </>
  );
};

export default Register;
