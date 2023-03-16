import { useState, useEffect, Fragment, } from 'react';
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box, Button, chakra, Container, Flex, Grid, Heading, HStack, List, ListItem, Stack, VStack, Text, Image } from '@chakra-ui/react'
import { default as Link, default as NextLink } from 'next/link'
import { getPendingRequest,  acceptRequest, removeConnection} from '@/pages/api/api'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { format } from 'path';
import { formToJSON } from 'axios';



function Notifications() {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [profile, setProfile] = useState({
    image:
      'https://marketplace.canva.com/EAFKZzWYqqE/1/0/1600w/canva-purple-navy-neon-gradient-modern-minimalist-man-tiktok-profile-picture-kqzwo_88iLY.jpg',
    cover:
      'https://img.rawpixel.com/private/static/images/website/2022-05/v904-nunny-016_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=d04dc64ebef3b6c3ad40a5687bbe31dc',
  })
  interface Notification { user: { id: number; firstName: string; lastName: string; profilePic: string; }; since: string; }

  function DateSet(dateString: string) {
    const date = new Date(dateString);
    return date.toString().split("GMT")[0]
  }
  
  useEffect(() => {
    // fetch notifications from server using axios
    const token = localStorage.getItem('jwt')
    getPendingRequest(token)
      .then(response => {
        const UserNotification = response.data;
        setNotifications(UserNotification);
        console.log(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const acceptConnection = (id) => {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('jwt')
      acceptRequest(token, id)
        .then((res) => {
          setNotifications(
            notifications.filter((connection: any) => connection.user.id !== id)
          )
          toast.success('Request Accepted')
        })
        .catch((err) => {
          toast.error(err)
        })
    }
  }

  const rejectConnection = (id) => {
    if (typeof localStorage !== 'undefined') {
      const token = localStorage.getItem('jwt')
      removeConnection(token, id)
        .then((res) => {
          setNotifications(
            notifications.filter((connection: any) => connection.user.id !== id)
          )
          toast.success('Connection removed')
        })
        .catch((err) => {
          toast.error(err)
        })
    }
  }


  return (
    <>
    <Layout>
    <NavBar></NavBar>
    <Container maxW="3xl" p={{ base: 5, md: 0 }}>
<Flex justify="center" mb={3}>
  <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center" mb={3}>
    Pending Connection Requests
  </chakra.h3>
</Flex>
{notifications.length === 0 ? (
  <Box  
  border="1px solid"
  borderColor="gray.100"
  borderRadius="lg"
  overflow="hidden">
    <chakra.p
      textAlign="center"
      p={5}
      color="gray.600"
      >
      No pending requests
      </chakra.p>
  </Box>
):(
<VStack
 
  borderColor="gray.400"
  rounded="md"
  overflow="hidden"
  spacing={0}
>
  {notifications.map((notification: Notification) => (
  <Fragment key={notification.user.id}>
  <Box
    display="grid"
    gridTemplateRows={{ base: 'auto auto', md: 'auto' }}
    gridTemplateColumns={{ base: '1fr', md: '4fr 2fr 2fr' }}
    gridGap={{ base: 2, md: 3 }}
    alignItems="center"
    _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
    border="1px solid"
    p={{ base: 3, sm: 4 }}
    mb={{ base: 2, md: 4 }}
  >
    <Box gridColumnEnd={{ base: 'span 5', md: 'unset' }}  as={Link}
            href={`/profile/${notification.user.id}`}>
      <Text fontWeight="bold" fontSize={{ base: 'md', md: 'lg' }} mb={2}>
        Add me to your Network
      </Text>

      <Text fontSize={{ base: 'sm', md: 'sm' }} color="gray.500" mb={2}>
        {DateSet(notification.since)}
      </Text>

      <Flex alignItems="center" flexDirection={{ base: 'column', md: 'row' }}>
        <Image
          src={
            notification.user.profilePic
              ? `data:image/jpeg;base64,${notification.user.profilePic}`
              : profile.image
          }
          alt="user"
          width="70px"
          height="60px"
          style={{ borderRadius: '50%' }}
          mr = {{ base: '0', md: '15px' }}
          mb={{ base: '20px', md: '0' }}
        />
        <Box flex="1"  mr={{ base: '9px', md: 0 }} >
          <chakra.h3
            marginLeft={{md:'15'}}
            fontWeight="bold"
            fontSize={{ base: 'lg', md: '2xl' }}
            whiteSpace="nowrap"
            isTruncated
          >
            {notification.user.firstName} {notification.user.lastName}
          </chakra.h3>
        
        </Box>

        <Flex direction={{ base: 'column', md: 'row' }}
                    ml ={{md: '5'}}
                    alignItems={{ base: '3px', md: 'center' }}
                    justifyContent="space-between"
                    w={{ base: '30%', md: '70%' }}>
          <Button
            colorScheme="linkedin"
            onClick={() => acceptConnection(notification.user.id)}
            _hover={{ bg: useColorModeValue('gray.400', 'gray.600') }}
            mr={{ base: 2, md: 3 }}
            mb={{ base: 2, md: 0 }}
            w={{ base: '100%', md: 'auto' }}
            
          >
            Accept
          </Button>

          <Button
            colorScheme="red"
            onClick={() => rejectConnection(notification.user.id)}
            w={{ base: '100%', md: 'auto' }}
            
          >
            Reject
          </Button>
        </Flex>
      </Flex>
    </Box>
  </Box>
</Fragment>

    ))}
</VStack>)}
</Container>
</Layout>
    </>

  )

}


export default Notifications;

