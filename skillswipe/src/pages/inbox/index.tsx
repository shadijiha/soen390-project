/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable @next/next/no-img-element */
import Layout from '@/components/Layout'
import NavBar from '@/components/NavBar'
import { Avatar, Badge, Box, Button, Flex, Heading, HStack, Spacer, Text } from '@chakra-ui/react'
import { Router, useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'

const Inbox = () => {
  const router = useRouter()
  const [messages, setMessages] = useState([
    {
      id: 1,
      title: 'John',
      text: 'This is a sample message 1',
      avatar: 'https://via.placeholder.com/100x100',
    },
    {
      id: 2,
      title: 'Alex',
      text: 'This is a sample message 2',
      avatar: 'https://via.placeholder.com/100x100',
    },
    {
      id: 3,
      title: 'Parker',
      text: 'This is a sample message 3',
      avatar: 'https://via.placeholder.com/100x100',
    },
  ])
  const [loading, setLoading] = useState(true)
  const handleMessageClick = (message: {
    id: any
    title?: string
    text?: string
  }) => {
    router.push(`/inbox/2`)

  };


  // useEffect(() => {
  // Will get all the coversations when apis are ready
  // },[])

  return (
    <>
      <Layout>
        <NavBar></NavBar>
        <Box p={50}>
        <Heading as="h1" size="lg" mb={4}>
            Messages
          </Heading>
          {messages.length > 0 ? messages.map((element) => (
            <Flex
              key={element.id}
              borderWidth="1px"
              borderRadius="lg"
              p={4}
              mb={4}
              display="flex"
              alignItems="center"
              cursor={'pointer'}
           
              onClick={() => handleMessageClick(element)}
              >
              <Flex>
                <Avatar size="lg" mr={4} src={element.avatar} />
                <Box>
                  <Heading  as="h2" size="md" mb={2}>
                    {element.title}{' '}
                    <Badge ml="1" colorScheme="green">
                      New
                    </Badge>
                  
                  </Heading>
                  <Text mb={2}>{element.text}</Text>

                </Box>
              </Flex>
              <Spacer />

            </Flex>
          )
          )
          :
          <h1>No new message</h1>
        }
       
        </Box>
      </Layout>
    </>
      )
}

export default Inbox
