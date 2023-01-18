import { Icon, Flex, Heading, Input, Button, useColorMode, useColorModeValue, Center, Text} from '@chakra-ui/react'
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';


const IndexPage = () => {
  const { toggleColorMode } = useColorMode()
  const formBackground = useColorModeValue("gray.100", "gray.700")
  const placeholderBackground = useColorModeValue("gray.200", "gray.600")
  const toggleTheme = useColorModeValue("🌙", "💡")
    const googleBackground = useColorModeValue("white", "gray.700");


return (
<Flex height="100vh" alignItems="center" justifyContent="center">
  <Flex direction="column" background={formBackground} p={12} rounded={25} >
    <Heading mb={6}>SkillSwipe 🚀</Heading>
    <Input placeholder="Email" variant="filled" mb={3} type="email" background={placeholderBackground} />
    <Input placeholder="*******" variant="filled" mb={6} type="password" background={placeholderBackground}/>
    <Button colorScheme="blue" mb={3}>
      <Link href="/home">Sign In</Link>
      </Button>
       {/* Google */}
      <Button
        mb={6}
        w={'full'}
        variant={'outline'}
        backgroundColor={googleBackground}
        leftIcon={<FcGoogle />}>
          <Center >
            <Text>Sign in with Google</Text>
          </Center>
        </Button>
      <Button colorScheme="green" mb={6}>
        <Link href="/register">Register</Link>
      </Button>
            <Button
            onClick={toggleColorMode}
            _hover={{ bg: "transparent" }}
            bg="transparent"
          >
            {toggleTheme}
          </Button>

  </Flex>
</Flex>
)

  

}
export default IndexPage