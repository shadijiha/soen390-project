import { useState, useEffect, Fragment, } from 'react';
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import { useColorModeValue } from '@chakra-ui/color-mode'
import { Box, Button, chakra, Container, Flex, Grid, Heading, HStack, List, ListItem, Stack, VStack, Text } from '@chakra-ui/react'
import { default as Link, default as NextLink } from 'next/link'
import { getPendingRequest,  acceptRequest, removeConnection} from '@/pages/api/api'
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { format } from 'path';
import { formToJSON } from 'axios';



function Notifications() {
  const router = useRouter()
  const [notifications, setNotifications] = useState([]);
  const [profile, setProfile] = useState({
    image:
      'https://marketplace.canva.com/EAFKZzWYqqE/1/0/1600w/canva-purple-navy-neon-gradient-modern-minimalist-man-tiktok-profile-picture-kqzwo_88iLY.jpg',
    cover:
      'https://img.rawpixel.com/private/static/images/website/2022-05/v904-nunny-016_2.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=d04dc64ebef3b6c3ad40a5687bbe31dc',
  })


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
    <Container maxW="2xl" p={{ base: 10, md: 0 }}>
<Flex justify="left" mb={3}>
  <chakra.h3 fontSize="2xl" fontWeight="bold" textAlign="center">
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
  border="1px solid"
  borderColor="gray.400"
  rounded="md"
  overflow="hidden"
  spacing={0}
>
  {notifications.map((notification: Array) => (
    <Fragment key={notification.user.id } >
      <Grid
        templateRows={{ base: 'auto auto', md: 'auto' }}
        w="100%"
        templateColumns={{ base: 'unset', md: '4fr 2fr 2fr' }}
        p={{ base: 3, sm: 4 }}
        gap={3}
        alignItems="center"
        _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
        border="1px solid"
      >
        <Box gridColumnEnd={{ base: 'span 5', md: 'unset' }} >
            <Text fontWeight="bold" fontSize="xl" mb={5}>Add me to your Network</Text>
          {/* // display the Date object within the text tag but remove the GMT-0500 (Easterb Standard time) */}

          <Text fontSize="sm" color="gray.500" mb={5}>
  {Date(notification.user.since).toString().split('GMT')[0]}
</Text>

          




          <Flex alignItems="center">
          <img  src={
                            notification.user.profilePic
                              ? `data:image/jpeg;base64,${notification.user.profilePic}`
                              : profile.image
                          } alt="user" width = "60px" height = "60px" style={{ borderRadius: "50%", marginRight:"20px" }}/>
          <chakra.h3
            as={Link}
            href={`/profile/${notification.user.id}`}
            fontWeight="bold"
            fontSize="2xl"
            whiteSpace="nowrap"
            
          >
            {notification.user.firstName} {notification.user.lastName}
          </chakra.h3>
          
          
        <Button         ml="20px"
                        color="gray.600"
                        onClick={() => acceptConnection(notification.user.id)}
                        _hover={{ bg: useColorModeValue('gray.400', 'gray.600') }}
      p={7} 
      mr="20px"
                      >
                        Accept
                      </Button>
      
                      <Button         
                        colorScheme="red"
                        onClick={() => rejectConnection(notification.user.id)}
                       p={7}
                      >
                        Reject
                      </Button>
          </Flex>
        </Box>
      </Grid>
    </Fragment> 
    ))}
</VStack>)}
</Container>
</Layout>
    </>

  )

}


export default Notifications;

{/* <div className="notifications" 
flex-direction= "column"
align-items= "center"
padding-top = "20px">
  <h1 className="title">Notifications</h1>
  <div className="notification-container">
    {/* Notification items */}
    {/* {notifications.map((notification: Array) => (
      <NotificationItem key={notification.id} notification={notification} />
    ))}
  </div> */}
