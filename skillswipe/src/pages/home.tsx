import { Flex, Heading, Input, Button, useColorMode, useColorModeValue} from '@chakra-ui/react'
import Link from 'next/link';

const Home = () => {
  const { toggleColorMode } = useColorMode()
  const formBackground = useColorModeValue("gray.100", "gray.700")
  const placeholderBackground = useColorModeValue("gray.200", "gray.600")
  const toggleTheme = useColorModeValue("🌙", "💡")

return (
<Flex height="100vh" alignItems="center" justifyContent="center">
  <Flex direction="column" background={formBackground} p={12} rounded={25} >
    <Heading mb={6}>Home</Heading>
    <Button colorScheme="blue" mb={4}>
      <Link href="/">Go back</Link>
      </Button>
    <Button onClick={toggleColorMode} variant="contained">{toggleTheme}</Button>
  </Flex>
</Flex>
)

  

}
export default Home