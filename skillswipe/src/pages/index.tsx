/* eslint-disable react-hooks/rules-of-hooks */
import { Icon, Flex, Heading, Input, Button, useColorMode, useColorModeValue, Center, Text} from '@chakra-ui/react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginApi } from './api/api';



const login = () => {
  const { toggleColorMode } = useColorMode()
  const formBackground = useColorModeValue("gray.100", "gray.700")
  const placeholderBackground = useColorModeValue("gray.200", "gray.600")
  const toggleTheme = useColorModeValue("🌙", "💡")
    const googleBackground = useColorModeValue("white", "gray.700");
  const [User,setUser] = useState({"email" : "","password" : ""});
  const router = useRouter();
  const changeEmail = (event:any) => {
    setUser({
      ...User,
      "email" : event.target.value
    })
  }
  const changePassword = (event:any) => {
    setUser({
      ...User,
      "password" : event.target.value
    })
  }
  const submitForm = () => {
    if(! (User.email && User.password)){
      toast("Please fill all the fields")
    }
    else{
      loginApi(User).then((Response: any) => {
          toast("Successfully Logged In")
          router.push('/home');
          localStorage.setItem('jwt',Response.access_token)

      }).catch((error : any) => {
        
        if(error.response.status == 401){
          toast('Please fill correct details')
        }
        else{
          toast(error.message)
        }

      })
    }
  }



return (
<Flex height="100vh" alignItems="center" justifyContent="center">
  <Flex direction="column" background={formBackground} p={12} rounded={25} >
    <Heading mb={6}>SkillSwipe 🚀</Heading>
    <Input placeholder="Email" onChange={changeEmail} variant="filled" mb={3} type="email" background={placeholderBackground} />
    <Input placeholder="*******" onChange={changePassword} variant="filled" mb={6} type="password" background={placeholderBackground}/>
    <Button colorScheme="blue" mb={3} onClick={submitForm}>
      Sign in
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
export default login